import React, { useState, createContext, useContext } from "react";

const Context = createContext();

const StateContext = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StateContext;

export const useStateContext = () => useContext(Context);
