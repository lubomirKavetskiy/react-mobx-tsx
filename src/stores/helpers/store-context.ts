import { createContext } from "react";

import RootStore from "../root-store";

export const StoreContext = createContext({} as RootStore)
export const StoreProvider = StoreContext.Provider

