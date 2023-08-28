export type AnyFunction = (...args: any[]) => any;

export type StringMap<T> = { [key: string]: T };

export type Action<T extends string = string, P = void> = P extends void
    ? Readonly<{ type: T }>
    : Readonly<{ type: T; payload: P }>;

export type ActionsOfType<ActionUnion, ActionType extends string> = ActionUnion extends Action<ActionType> ? ActionUnion : never;

export type ActionsUnion<A extends StringMap<AnyFunction>> = ReturnType<A[keyof A]>;

export function createAction<T extends string>(type: T): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P,): Action<T, P>;

export function createAction<T extends string, P>(type: T, payload?: P): Action {
    const action = payload === undefined
        ? { type }
        : { type, payload };
    return action;
}

export type ActionNames<T> = { [key in keyof T]: string };

export type Handlers<Enum, State> = { [key in keyof Enum]: (state: State, action: any) => State };

export function createReducer<S, H, A extends Action>(initial: S, handlers: H): (state: S, action: A) => S {
    return (state: S = initial, action: A) => handlers[action.type]
        ? handlers[action.type](state, action)
        : state;
}
