import React, { createContext, ReactNode, useContext, useReducer } from "react";

export interface Cybertools {
  Category: string;
  Name: string;
  Description: string;
  Url: string;
  Logo?: string;
  Image?: string;
}

interface CybertoolsState {
  cybertools: Cybertools[];
  loading: boolean;
  error: string | null;
}

const initialState: CybertoolsState = {
  cybertools: [],
  loading: false,
  error: null,
};

type SetDataAction = { type: "SET_DATA"; payload: Cybertools[] };

type CybertoolsAction = SetDataAction;

function cybertoolsReducer(
  state: CybertoolsState,
  action: CybertoolsAction
): CybertoolsState {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        cybertools: action.payload,
      };
    default:
      throw new Error(`Unsupported action type`);
  }
}

type CybertoolsContextValue = CybertoolsState & {
  setCybertoolsData: (cybertools: Cybertools[]) => void;
};

const CybertoolsContext = createContext<CybertoolsContextValue | undefined>(
  undefined
);

export function useCybertoolsContext() {
  const context = useContext(CybertoolsContext);
  if (!context) {
    throw new Error(
      "useCybertoolsContext must be used within a CybertoolsProvider"
    );
  }
  return context;
}

type CybertoolsProviderProps = {
  children: ReactNode;
};

export function CybertoolsProvider({ children }: CybertoolsProviderProps) {
  const [state, dispatch] = useReducer(cybertoolsReducer, initialState);

  const ctx: CybertoolsContextValue = {
    cybertools: state.cybertools,
    loading: state.loading,
    error: state.error,
    setCybertoolsData(cybertools: Cybertools[]) {
      dispatch({ type: "SET_DATA", payload: cybertools });
    },
  };

  return (
    <CybertoolsContext.Provider value={ctx}>
      {children}
    </CybertoolsContext.Provider>
  );
}
