import {  useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import useGetSingleDocument from "../hooks/useGetSingleDocument"
import "./FindApplications.css"

export default function FindApplication() {
  const [quote, setQuote] = useState(null)
  let requestedAppId = localStorage.getItem("appId")
  
  const [inputValue, setInputValue] = useState( requestedAppId?.length > 0 ? requestedAppId : 'Başvuru kodunuzu giriniz')
  
  
  const { document: application } = useGetSingleDocument(
    "applications",
    inputValue
  )


  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data))
      
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Tekrar bak!!! ")
  }

  return (
    <div className="background">
      <Navbar />
      <form onSubmit={handleSubmit} className="find-application-form">
        <label className="find-application-label">
          <span className="find-application-span">Başvuru kodu:</span>
          <input
            className="find-application-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            required
          />
        </label>
        <button  type="submit" className="btn">
          SORGULA
        </button>
        {application?.name && (
          <div className="find-application-progress-container">
            {/* <h2> Başvuru durumu </h2> */}
            {application && (
              <div className="find-application-applicant">
                
                {application.name} {application.surname}
              </div>
            )}
            <ul className="find-application-comments-ul">
              {application?.comments?.map((comment) => (
                <li
                  className="find-application-comment-list"
                  key={comment.commentDate}
                >
                    <div className='find-application-comment-item'> {comment.comment} </div> 
                    <div  className='find-application-comment-date'> {new Date(comment.commentDate).toLocaleString()} </div> 
                </li>
              ))}
            </ul>
            {application && (
              <div
                className={`find-application-progress ${ application?.progress === "Onaylandı" ? "approved" : ""     } ${application?.progress === "Reddedildi" ? "declined" : ""}`}
              >
                
                {application.progress}
              </div>
            )}
          </div>
        )}
      </form>

      {quote && (
        <div className="quoteContainer">
          <span className="quote">{quote.content}</span>
          <div className="author">-{quote.author}</div>
        </div>
      )}
    </div>
  )
}
