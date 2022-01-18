import { doc, onSnapshot } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/config"

// getting single application

export default function useGetSingleDocument(col,id) {
  const [document, setDocument] = useState(null)

  const getDocRef = doc(db, col, id)

  useEffect(() => {
    onSnapshot(getDocRef,(doc) => {
        setDocument({...doc.data() , id: doc.id})
    })
  }, [getDocRef])
  return { document }
}
