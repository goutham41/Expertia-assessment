import React, { createContext, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [UserData, setUserData] = useState({isLogin:false});

  return (
    <AuthContext.Provider
      value={{
        UserData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
