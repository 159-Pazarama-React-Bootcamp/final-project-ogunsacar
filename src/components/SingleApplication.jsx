import { Link } from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext"

export default function SingleApplication({ application }) {
  const { user } = useAuthContext()
  if (user) {
    return (
      
        <div className="card">
          <h6 className='card-applicationId'>{application.applicationNumber.substring(0,5)} <span className='card-applicationIdNumber'> {application.applicationNumber.substring(5,11)}</span> {application.applicationNumber.substring(11,17)} </h6>
          
            <h4 className="applicant-name">
              {application.name}
              <br />
              {application.surname}
            </h4>
          
          <p className='description'>   <span> Başvuru Nedeni </span> <br /> {application.description} </p>
          <Link className='card-btn' to={"/basvuru/" + application.id}> İNCELE </Link>
        </div>
     
    )
  }
}
