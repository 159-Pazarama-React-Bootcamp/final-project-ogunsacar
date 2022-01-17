import { signInWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setisPending] = useState(false);

  const {dispatch} = useAuthContext()

  const login = async (email, password) => {
    setError(null);
    setisPending(true)
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      dispatch({type : 'LOGIN', payload : user})
      setisPending(false)
    } catch (err) {
      setError(err.message);
      setisPending(false)
    }
  };

  return { error, login,isPending };
};
