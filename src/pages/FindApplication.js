import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import useGetSingleDocument from "../hooks/useGetSingleDocument"
import './FindApplicatioons.css'

export default function FindApplication() {
  const [quote, setQuote] = useState(null)
  const [inputValue,setInputValue] = useState('')
  const requestedAppId = localStorage.getItem("appId")

  
  

  const { document: application } = useGetSingleDocument('applications',requestedAppId)

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data))
  }, [])


  return (
    <div className="background">
      <Navbar />
      <form className='find-application-form'>
        <label className='find-application-label'>
          <span className='find-application-span'>Başvuru kodu:</span>
          <input className='find-application-input' value={inputValue} placeholder={requestedAppId} onChange={(e) => setInputValue(e.target.value)}  type="text"  required />
        </label>
        <button className="btn">SORGULA</button>
        <div className="application-progress">
          Başvuru durumu
          {application && <p> {application.name} - {application.surname} </p> }
        </div>
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
