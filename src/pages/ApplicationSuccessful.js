import { useNavigate } from "react-router"
import './ApplicationSuccessful.css'

export default function ApplicationSuccessful() {
  const navigate = useNavigate()

  const appId = localStorage.getItem("appId")

  return (
    <div className="successful-application">
      <div className="successful-application-container">
        <h3 className="successful-application-text">
          Başvurduğunuz için teşekkürler.Başvurunuz <span> başarılı </span> bir şekilde bize ulaştı.
        </h3>
        {appId && (
          <div className="successful-application-appNumber">
            <h3 >{appId}</h3>
          </div>
        )}
        <button
          className="successful-application-btn"
          onClick={() => navigate("/basvuru-sorgula")}
        >
          Başvuru durumunu kontrol et
        </button>
      </div>
    </div>
  )
}
