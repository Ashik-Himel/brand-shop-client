import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";

export const UserContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadedUser, setLoadedUser] = useState(false);

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
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.node,
};
