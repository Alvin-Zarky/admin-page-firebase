import {useState} from 'react'
import {firestore} from "../config/firebase"

export const useDataCount = (collection:string) => {
  const [count, setCount] = useState(0)

  firestore.collection(collection).onSnapshot(snapshot =>{
    setCount(snapshot.size)
  })

  return { count }
}

