import { useNavigate } from "react-router"

export default function ApplicationSuccessful() {
  const navigate = useNavigate()

  const appNumber = localStorage.getItem("appNumber")

  return (
    <div className="successful-application">
      <div className="successful-application-container">
        <h3 className="successful-application-text">
          Başvurunuz <span> başarılı </span> bir şekilde bize ulaştı.
        </h3>
        {appNumber && (
          <div className="successful-application-appNumber">
            <h3 >{appNumber}</h3>
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
