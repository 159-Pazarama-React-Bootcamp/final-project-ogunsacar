import { doc, onSnapshot } from "@firebase/firestore"
import React,{ useEffect, useRef, useState } from "react"
import { db } from "../firebase/config"

// getting single application

export default function useGetSingleDocument(col, id) {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(false)
 

  const getDocRef = doc(db, col, id)

  const ref = useRef(getDocRef).current
  

  useEffect(() => {
    const unsub = onSnapshot(ref, (doc) => {
      if(!doc.exists()){
        setError(true)
      }
      setDocument({ ...doc.data(), id: doc.id })
    },(error) => console.log(error))

    return () => unsub()
  }, [ref])
  return { document,error }
}
