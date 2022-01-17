import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context){
        console.log('You are using Context Provider in a wrong place');
    }

    return context
}

export default useAuthContext