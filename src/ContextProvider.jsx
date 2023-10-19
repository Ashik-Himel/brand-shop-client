import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";

export const UserContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadedUser, setLoadedUser] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('darkMode') === "1") {
      setDarkTheme(true);
    }
  }, [])

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadedUser(true);
    });
    return () => unSubscribe();
  }, []);

  const value = {
    user,
    setUser,
    loadedUser,
    darkTheme,
    setDarkTheme
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.node,
};
