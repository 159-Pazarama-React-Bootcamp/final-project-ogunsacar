import { doc, onSnapshot } from "@firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { db } from "../firebase/config"

// getting single application

export default function useGetSingleDocument(col, id) {
  const [document, setDocument] = useState(null)

  const getDocRef = doc(db, col, id)

  const ref = useRef(getDocRef).current

  useEffect(() => {
    onSnapshot(ref, (doc) => {
      setDocument({ ...doc.data(), id: doc.id })
    })
  }, [ref])
  return { document }
}
