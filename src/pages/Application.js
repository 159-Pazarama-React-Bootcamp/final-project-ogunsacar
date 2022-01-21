import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useFirestore } from "../hooks/useFirestore"
import "./Application.css"

import useGetSingleDocument from "../hooks/useGetSingleDocument"

export default function Application() {
  const [comment, setComment] = useState("")
  const { updateDocument } = useFirestore("applications")
  const navigate = useNavigate()
  let newComment = {
    commentDate: Date.now(),
    comment,
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    updateDocument(application?.id, {
      comments: [...application?.comments, newComment],
    })

    setComment("")
  }

  const { basvuruNo } = useParams()
  const { document: application } = useGetSingleDocument(
    "applications",
    basvuruNo
  )

  return (
    <div className="admin-application">
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
      <img className='admin-application-image' src={application?.attachedDoc} alt={application?.name+ application?.surname} />
      <h2 className="admin-application-name">
        {application?.name} {application?.surname}
        <span className="admin-application-age-id">
          Yaş : {application?.age} - TC No: {application?.idNumber}
        </span>
      </h2>

      <div className="admin-application-description">
        Başvuru açıklaması: {application?.description}
      </div>
      <div className="admin-application-address">
        Adres: {application?.address}
      </div>
      {/* attached docs */}
      <form onSubmit={handleSubmit} className="application-comment-form">
        <input
          className="comment-form-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
        />
        <button className="comment-form-btn" type="submit">
          +
        </button>
      </form>
      <ul className="comments">
        {application &&
          application?.comments.map((comment) => (
            <li className="comment-list-item" key={comment.commentDate}>
              <div className="comment-item">
                {comment.comment} 
              </div>
              <div className="comment-date">
                {new Date(comment.commentDate).toLocaleString()}
              </div>
            </li>
          ))}
      </ul>
      {application?.progress === "Bekliyor" && (
        <div className="admin-application-btnGroup">
          <button
            onClick={() => {
              const answer = prompt('onaylamak için "onay" yazınız')
              const approved = {
                comment :'Güzel haber! Başvurunuz onaylandı!',
                commentDate: Date.now(),
            }
              if (answer === "onay") {
                updateDocument(application?.id, {
                  progress: "Onaylandı",
                  comments: [...application?.comments, approved],
                })
                
              }
            }}
            type="button"
            className="admin-application-btn green-btn"
          >
            Onay
          </button>
          <button
            onClick={() => {
              const answer = prompt('reddetmek için "red" yazınız')
              const declined = {
                comment :'Üzgünüz :( Başvurunuz reddedildi.',
                commentDate: Date.now(),
            }
              if (answer === "red") {
                updateDocument(application?.id, {
                  progress: "Reddedildi",
                  comments: [...application?.comments, declined],
                })
              }
            }}
            type="button"
            className="admin-application-btn red-btn"
          >
            Red
          </button>
        </div>
      )}
      <button
        className="btn btn-goBack"
        type="button"
        onClick={() => {
          navigate("/admin/basvuru-listesi")
        }}
      >
       
{'<'}
      </button>
    </div>
  )
}
