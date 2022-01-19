import SingleApplication from "../components/SingleApplication"
import useCollection from "../hooks/useCollection"
import './ApplicationList.css'

export default function ApplicationList() {
  const { documents: applications } = useCollection("applications")

  if (applications?.length === 0) {
    return <div className="no-application">
      Henüz başvuru yapılmamış.
    </div>;
  }

  return (
    <div>
      <div className="filters">filters</div>
      <ul className='application-card'>
        {applications &&
          applications.map((application) => (
            <SingleApplication key={application.id} application={application} />
          ))}
      </ul>
    </div>
  )
}
