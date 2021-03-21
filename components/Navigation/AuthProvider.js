import React, { Component, createContext, useState } from "react";
import { Text, View } from "react-native";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
