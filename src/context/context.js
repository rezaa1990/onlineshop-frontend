// context.js
import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [admin, setAdmin] = useState(true);

  return (
    <AppContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
