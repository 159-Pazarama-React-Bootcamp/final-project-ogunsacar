import { useNavigate } from "react-router"
import useGetSingleDocument from "../hooks/useGetSingleDocument"
import './ApplicationSuccessful.css'

export default function ApplicationSuccessful() {
  const navigate = useNavigate()

  const appId = localStorage.getItem("appId")

  
  const { document: application } = useGetSingleDocument(
    "applications",
    appId
  )
  

  return (
    <div className="successful-application">
      <div className="successful-application-container">
        <h3 className="successful-application-text">
          Başvurduğunuz için teşekkürler. <br /> Başvurunuz <span> başarılı </span> bir şekilde bize ulaştı.
        </h3>
        <div className="information-container">
          <h3 className='information-name'>{application?.name} {application?.surname }</h3>
          <p className='information'> <span>Adres:</span> {application?.address}</p>
          <p className='information'><span>Başvuru Nedeni:</span> {application?.description}</p>
        </div>
        {appId && (
          <div className="successful-application-appNumber">
            <h4>Başvuru Kodunuz</h4>
            <h3 >{appId}</h3>
          </div>
        )}
        <button
          className="successful-application-btn"
          onClick={() => navigate("/basvuru-sorgula")}
        >
          👍🏻
        </button>
      </div>
    </div>
  )
}
