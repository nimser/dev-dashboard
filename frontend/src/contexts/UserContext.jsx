/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
