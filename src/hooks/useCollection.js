import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"
import { useEffect,useState } from "react"
// import { useRef } from "react/cjs/react.development"
import { db } from '../firebase/config'

export default function useCollection(collectionName) {
    

    const [documents,setDocuments] = useState(null)

    // const order = useRef(_order).current

    useEffect(()=>{
        let ref = collection(db,collectionName)

    
            ref = query(ref,orderBy('createdAt','desc'))
        

        const unsub = onSnapshot(ref,(snapshot) => {
            let results = []
            snapshot.docs.forEach((doc)=> {
                results.push({...doc.data(),id : doc.id})
            })
            setDocuments(results)
        })
        return () => unsub()
    },[collectionName])
    
    return {documents}  
}
