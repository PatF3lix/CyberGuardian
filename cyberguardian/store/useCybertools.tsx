import React, { createContext, ReactNode, useContext, useReducer } from "react";

export interface Cybertools {
  category: string;
  name: string;
  description: string;
  url: string;
  logo?: string;
  image?: string;
}

interface CybertoolsState {
  cybertools: Cybertools[];
  loadedData: boolean;
  error: string | null;
}

const initialState: CybertoolsState = {
  cybertools: [],
  loadedData: false,
  error: null,
};

type fetchStartAction = { type: "FETCH_START" };
type SetDataAction = { type: "SET_DATA"; payload: Cybertools[] };
type fetchFinishAction = { type: "FETCH_FINISH" };

type CybertoolsAction = fetchStartAction | SetDataAction | fetchFinishAction;

function cybertoolsReducer(
  state: CybertoolsState,
  action: CybertoolsAction
): CybertoolsState {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        cybertools: action.payload,
        loadedData: true,
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
    loadedData: state.loadedData,
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
