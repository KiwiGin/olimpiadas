import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    console.log("Inputs:", inputs);
    const res = await axios.post("http://localhost:8000/api/autenticacion/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data)
  };

  const logout = async () => {
    await axios.post("http://localhost:8000/api/autenticacion/logout", {}, {
      withCredentials: true,
    });

    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};