import { createContext, useState } from "react";

export const Mycontext = createContext();

export const MyProvider = ({ children }) => {
    const [value, setValue] = useState("default value");
  
    return (
      <Mycontext.Provider value={{ value, setValue }}>
        {children}
      </Mycontext.Provider>
    );
  };


