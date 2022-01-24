import { useParams } from "react-router"
import useGetSingleDocument from "../hooks/useGetSingleDocument"

export default function UserApplication() {
  const { basvuruNo } = useParams()
  const { document: application } = useGetSingleDocument(
    "applications",
    basvuruNo
  )
  /* const navigate = useNavigate()

  const handleClick = (e) => {
    navigate("/basvuru-sorgula")
  }
   */
  /* return (
    <div className="notFound">
    <aside className="notFound-aside">
      <img
        className="notFound-img"
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png"
        alt="404"
      />
    </aside>

    <h1 className="notFound-title application-notFound-title">Üzgünüz aradığınız başvuru bulunmamaktadır!</h1>
    <button onClick={handleClick} className="btn btn-application-goBack">Geri dön</button>
  </div>
  )
 */

  
    return (
      <div
        className={`admin-application ${
          application?.progress === "Onaylandı" ? "approved" : ""
        } ${application?.progress === "Reddedildi" ? "declined" : ""}`}
      >
        <h2 className="admin-application-date">
          {new Date(application?.createdAt).toLocaleString()}
        </h2>
        <h2
          className={`admin-application-applicationId ${
            application?.progress === "Onaylandı" ? "approved" : ""
          } ${application?.progress === "Reddedildi" ? "declined" : ""}`}
        >
          {application?.id}
        </h2>
        <h1
          className={`admin-application-progress ${
            application?.progress === "Onaylandı" ? "approved" : ""
          } ${application?.progress === "Reddedildi" ? "declined" : ""}`}
        >
          {application && application?.progress}
        </h1>
        <img
          className="admin-application-image"
          src={application?.attachedDoc}
          alt={application?.name}
        />
        <h2 className="admin-application-name">
          {application?.name} {application?.surname}
          <span className="admin-application-age-id">
            Yaş : {application?.age} | TC No: {application?.idNumber}
          </span>
        </h2>

        <div className="admin-application-description">
          <span> Başvuru açıklaması: </span> {application?.description}
        </div>
        <div className="admin-application-description">
          <span> Adres: </span> {application?.address}
        </div>
        <ul className="comments">
          {application &&
            application?.comments.map((comment) => (
              <li className="comment-list-item" key={comment.commentDate}>
                <div className="comment-item">{comment.comment}</div>
                <div className="comment-date">
                  {new Date(comment.commentDate).toLocaleString()}
                </div>
              </li>
            ))}
        </ul>
      </div>
    )
  }

