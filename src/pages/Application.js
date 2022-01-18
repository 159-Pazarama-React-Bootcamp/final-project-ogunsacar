import { Timestamp } from "@firebase/firestore"
import { useState } from "react"
import { useParams } from "react-router"
import { useFirestore } from "../hooks/useFirestore"

import useGetSingleDocument from "../hooks/useGetSingleDocument"

export default function Application() {
  const [comment, setComment] = useState("")
  const { updateDocument } = useFirestore("applications")
  let newComment = {
    commentDate: Timestamp.fromDate(new Date()),
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
        {" "}
        {application?.createdAt.seconds}{" "}
      </h2>
      <h2 className="admin-application-applicationId">{application?.id} </h2>
      <h1
        className={`admin-application-progress ${
          application?.progress === "Onaylandı" ? "approved" : ""
        } ${application?.progress === "Reddedildi" ? "declined" : ""}`}
      >
        {application && application?.progress}
      </h1>
      <h2 className="admin-application-name">
        {application?.name}
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
        />
        <button type="submit">yorum ekle</button>
      </form>
      <ul className="comments">
        {application &&
          application?.comments.map((comment) => (
            <li className="comment-list-item" key={comment.comment}>
              <div className="comment">{comment.comment} - {comment.commentDate.seconds}  </div>
            </li>
          ))}
      </ul>
      {application?.progress === "Bekliyor" && (
        <div className="admin-application-btnGroup">
          <button onClick={() => {
            updateDocument(application?.id,{
              progress : 'Onaylandı',
            })
          }} type="button" className="admin-application-btn green-btn">
            Onay
          </button>
          <button onClick={() => {
            updateDocument(application?.id,{
              progress : 'Reddedildi',
            })
          }}  type="button" className="admin-application-btn red-btn">
            Red
          </button>
        </div>
      )}
    </div>
  )
}
