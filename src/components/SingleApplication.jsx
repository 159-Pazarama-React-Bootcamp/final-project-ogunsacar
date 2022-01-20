import { Link } from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext"
import { BsEnvelopeOpen } from "react-icons/bs"
import './SingleApplication.css'


export default function SingleApplication({ application }) {
  const { user } = useAuthContext()
  if (user) {
    return (
      <div className="card">
        <span className={`card-applicationIdNumber ${application.progress === 'Onaylandı' ? 'approvedApplication': ''} ${application.progress === 'Reddedildi' ? 'declinedApplication': ''}`}> {application.id}</span>
        <div className="card-grid">
        
          <div className="card-name">
            <h3>
              {application.name}
              <br />
              {application.surname}
            </h3>
          </div>
          <div className="card-description">
             {application.description.substr(0,50) + '...'}
          </div>
        </div>
        <Link className="card-btn" to={"/basvuru/" + application.id}>
          {" "}
          {<BsEnvelopeOpen className="icon" />}{" "}
        </Link>
      </div>
    )
  }
}
