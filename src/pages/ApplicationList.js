import SingleApplication from "../components/SingleApplication"
import useCollection from "../hooks/useCollection"


export default function ApplicationList() {
const {documents:applications} = useCollection('applications')

  return (
    <ul>
    {applications && applications.map((application) => (
        <SingleApplication key={application.id} application={application}/>
    ))}
    </ul>
  )
}
