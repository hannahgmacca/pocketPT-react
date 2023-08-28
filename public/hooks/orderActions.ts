// import { OrderViewModel } from "../models/orderViewModel";
// import {
//   ActionNames,
//   createAction,
//   ActionsUnion,
// } from "src/hooks-store/action-factory";
// import { TradingEntityViewModel } from "../models/tradingEntityViewModel";
// import { OrderType, OrderGrossConsiderationItemViewModel } from "src/domain";
// import { AuthorisedSignatoryViewModel } from "../models/authorisedSignatoryViewModel";
// import { ConditionalOrderItemViewModel } from "../models";
// import { TradingBookResponse } from "src/domain/TradingBook";

// export enum OrderActionList {
//   SET_ORDER = "SET_ORDER",
//   SET_CONDITIONALS = "SET_CONDITIONALS",
//   ADD_ORDER_ITEM = "ADD_ORDER_ITEM",
//   REMOVE_ORDER_ITEM = "REMOVE_ORDER_ITEM",
//   SET_TRADING_ENTITY = "SET_TRADING_ENTITY",
//   SET_ORDER_TYPE = "SET_ORDER_TYPE",
//   SET_RELATIONSHIP_MANAGER_ID = "SET_RELATIONSHIP_MANAGER_ID",
//   SET_INSTRUCTED_BY_PARTICIPANT = "SET_INSTRUCTED_BY_PARTICIPANT",
//   SET_SHOW_VALIDATION_ERRORS = "SET_SHOW_VALIDATION_ERRORS",
//   SET_ORDER_GROSS_CALCULATION = "SET_ORDER_GROSS_CALCULATION",
//   REMOVE_ORDER_GROSS_CALCULATION = "REMOVE_ORDER_GROSS_CALCULATION",
// }

// export type OrderActionNames = ActionNames<typeof OrderActionList>;

// export const OrderActions = {
//   setOrder: (payload: OrderViewModel) =>
//     createAction(OrderActionList.SET_ORDER, payload),

//   setConditionals: (payload: {
//     conditionalOrderItems: ConditionalOrderItemViewModel[];
//     orderItemIdToCancel?: number;
//   }) => createAction(OrderActionList.SET_CONDITIONALS, payload),

//   addOrderItem: () => createAction(OrderActionList.ADD_ORDER_ITEM),

//   removeOrderItem: (payload: number) =>
//     createAction(OrderActionList.REMOVE_ORDER_ITEM, payload),

//   setTradingEntity: (payload: {
//     tradingEntity: TradingEntityViewModel | null;
//     authorisedSignatories: AuthorisedSignatoryViewModel[];
//   }) => createAction(OrderActionList.SET_TRADING_ENTITY, payload),

//   setOrderType: (payload: {
//     orderType: OrderType;
//     tradingBooks: TradingBookResponse[];
//   }) => createAction(OrderActionList.SET_ORDER_TYPE, payload),

//   setRelationshipManagerId: (payload: number | null) =>
//     createAction(OrderActionList.SET_RELATIONSHIP_MANAGER_ID, payload),

//   setInstructedByParticipant: (payload: AuthorisedSignatoryViewModel) =>
//     createAction(OrderActionList.SET_INSTRUCTED_BY_PARTICIPANT, payload),

//   setShowValidationErrors: (payload: boolean) =>
//     createAction(OrderActionList.SET_SHOW_VALIDATION_ERRORS, payload),

//   setOrderGrossConsideration: (payload: {
//     orderItemIdToUpdate?: number;
//     OrderGrossConsideration?: OrderGrossConsiderationItemViewModel;
//   }) => createAction(OrderActionList.SET_ORDER_GROSS_CALCULATION, payload),

//   removeOrderGrossConsideration: (payload: number | undefined) =>
//     createAction(OrderActionList.REMOVE_ORDER_GROSS_CALCULATION, payload),
// };

// export type OrderActionsUnion = ActionsUnion<typeof OrderActions>;

// export type OrderAction<ActionName> = Extract<
//   OrderActionsUnion,
//   { type: ActionName }
// >;
