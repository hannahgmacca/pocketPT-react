import { useState, useEffect } from "react";
let globalState = {};
let listeners: any = [];
let actions = {};

// Passing in 'shouldListen' will stop unnecessary re-renders.
export const useStore = (shouldListen = true) => {
  // Only interested in being able to set the state.
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload): void => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    // Clean up function - will be called when the component is destroyed.
    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
