import { createContext, ReactNode } from "react"
import { useUser } from "../../libs/users";

export interface AppProviderProps {
  children: ReactNode;
}

export interface AppContext {
  auth?: ReturnType<typeof useUser>;
}

export const DataContext = createContext<AppContext>({});

export const AppProvider = (props: AppProviderProps): JSX.Element => {
  const auth = useUser();

  const provideValues = {
    auth
  };

  return (
    <DataContext.Provider value={provideValues}>
      { props.children }
    </DataContext.Provider>
  );
}
