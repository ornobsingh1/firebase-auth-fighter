import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateProfileFunc = (displayName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };
  const sendEmailVerificationFunc = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser);
  };
  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signOutUserFunc = () => {
    setLoading(true);
    return signOut(auth);
  };
  const signInWithGoogleFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const signInWithGithubFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };
  const resetPasswordFunc = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user,
    setUser,
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    sendEmailVerificationFunc,
    signInWithEmailAndPasswordFunc,
    signOutUserFunc,
    signInWithGoogleFunc,
    signInWithGithubFunc,
    resetPasswordFunc,
    loading,
    setLoading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
