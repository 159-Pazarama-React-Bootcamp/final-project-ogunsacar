import React,{  useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Navbar from "../components/Navbar"

import "./FindApplications.css"

export default function FindApplication() {
  const [quote, setQuote] = useState(null)
  let requestedAppId = localStorage.getItem("appId")
  const navigate = useNavigate()
  
  const [inputValue, setInputValue] = useState( requestedAppId?.length > 0 ? requestedAppId : 'Başvuru kodunuzu giriniz')
  
  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data))
      
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/basvuru/${inputValue}`)
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
