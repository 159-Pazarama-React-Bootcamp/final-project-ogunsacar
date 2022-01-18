import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "@firebase/firestore"
import { useReducer, useEffect, useState } from "react/cjs/react.development"
import { db } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

// reducer function-  we change the state depends on the action if the is no action
// return the state - state is response here

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: action.payload,
        document: null,
        success: false,
        error: null,
      }
    case "ADDED_DOC":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case "DELETED_DOC":
      return { isPending: false, document: null, success: true, error: null }
    case "UPDATED_DOC":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case "ERROR":
      return {
        document: null,
        isPending: false,
        success: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const useFirestore = (col) => {
  //reducer hook
  const [response, dispatch] = useReducer(firestoreReducer, initialState)

  const createdAt = Timestamp.fromDate(new Date())

  const initialVariables = {progress : 'Bekliyor', comments :[{comment: 'Başvurunu aldık!',commentDate: createdAt}]}


  // if user cancels the progress we should not get error
  // that is why we should make a state for it and return when component unmounted
  const [isCancelled, setIsCancelled] = useState(false)
  //const [addedApplicationId , setAddedApllicationId] = useState(null)

  // document reference
  const ref = collection(db, col)

  //only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // adding document to the firebase collection

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING", payload: true })

    try {
      const createdAt = Timestamp.fromDate(new Date())
      const addedDocument = await addDoc(ref, { ...doc, createdAt,...initialVariables })
      
      
      localStorage.setItem('appId',addedDocument.id) 
     
      dispatchIfNotCancelled({ type: "ADDED_DOC", payload: addedDocument })
      
    } catch (err) {
        dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
    }
  }

  

  // update document

  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" })
    try {
      const updateDocRef = doc(db, col, id)
      await updateDoc(updateDocRef, updates)

      dispatchIfNotCancelled({ type: "UPDATED_DOC", payload: updateDocument })
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message })
    }
  }


  // if user cancels the progress clean the function

  useEffect(() => {
    return () => {
      setIsCancelled(true)
    }
  }, [])

  return { addDocument, updateDocument, response }
}
