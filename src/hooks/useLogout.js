import { signOut } from "@firebase/auth"
import { useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const [isPending, setisPending] = useState(false)

  const logout = () => {
    setisPending(true)

    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" })
        setisPending(false)
      })
      .catch((err) => {
        console.log(err)
        setisPending(false)
      })
  }

  return { logout, isPending }
}
