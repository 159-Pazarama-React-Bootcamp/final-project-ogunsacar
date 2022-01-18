import { useParams } from "react-router"
import useGetSingleDocument from "../hooks/useGetSingleDocument"

export default function Application() {
  const { basvuruNo } = useParams()
  const {document} = useGetSingleDocument('applications',basvuruNo)

  return (
    <div className='single-application'>
      <h1>{document?.name}</h1>
    </div>
  )
}
