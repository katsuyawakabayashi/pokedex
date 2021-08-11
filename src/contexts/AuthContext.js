import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { auth, firestore } from "../firebase";

export const AuthContext = React.createContext(null);
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //const cardRef = firestore.collection("cards");
  const cardRef = auth.currentUser
    ? firestore.collection(`users/${auth.currentUser.uid}/cards`)
    : firestore.collection(`catch`);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout = async () => {
    await window.location.reload();
    auth.signOut();
  };
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };
  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };
  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);

      currentUser && console.log(currentUser);

      if (user) {
        console.log("Looged in as ", user);
        history.push("/");
      } else {
        console.log("Not looged in");
        //window.location.href = "/";
      }
    });

    return unsubscribe;
  }, [currentUser, history]);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    history,
    error,
    setError,
    cardRef,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
