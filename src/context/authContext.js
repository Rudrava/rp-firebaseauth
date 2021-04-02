import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  // this is the signup method which returns the user after login
  const signUp = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  const logIn = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);
  const logOut = () => auth.signOut();
  const resetPassword = (email) => auth.sendPasswordResetEmail(email);
  const updateEmail = (email) => currentUser.updateEmail(email);
  const updatePassword = (password) => currentUser.updatePassword(password);

  // triggers on auth state chage ie login or logout
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setCurrentUser(user));
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        logIn,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
