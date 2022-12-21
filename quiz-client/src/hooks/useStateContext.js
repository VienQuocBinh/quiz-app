import React, { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

// To hold the previous values when reload pages -> save values in local storage
// check in local storage if 'context' is already had value -> return those values
// if not: assign default value
const getFreshContext = () => {
  if (localStorage.getItem("context") === null) {
    localStorage.setItem(
      "context",
      JSON.stringify({
        participantId: 0,
        timeTaken: 0,
        selectedOptions: [],
      })
    );
  }
  return JSON.parse(localStorage.getItem("context"));
};

// To avoid duplicate code when using context in child components
// do not need to pass the StateContext then useContext(StateContext) to get Context in child components
// -> custom hook to pass the context, setContext
export default function useStateContext() {
  // Because passing prop 'value' has 2 objects ({ context, setContext })
  // -> receive 2 objects in child components
  const { context, setContext } = useContext(StateContext);
  return {
    context,
    // to avoid duplicate destructuring in child components -> destruct in parent component
    setContext: (obj) => {
      setContext({ ...context, ...obj });
    },
    resetContext: () => {
      localStorage.removeItem("context");
      setContext(getFreshContext());
    },
  };
}

// Use this component to wrap the children wanted to use the same context
export function ContextProvider({ children }) {
  const [context, setContext] = useState(getFreshContext());

  // Update local storage whenever context changes
  useEffect(() => {
    localStorage.setItem("context", JSON.stringify(context));
  }, [context]);

  // Passing state in Context to all Children
  return (
    <StateContext.Provider value={{ context, setContext }}>
      {children}
    </StateContext.Provider>
  );
}
