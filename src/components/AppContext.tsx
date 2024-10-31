import React, { createContext, useContext, useState, ReactNode } from "react";

const AppContext = createContext<
  | {
      loadPage: boolean;
      setLoadPage: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [loadPage, setLoadPage] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ loadPage, setLoadPage }}>
      {children}
    </AppContext.Provider>
  );
};
