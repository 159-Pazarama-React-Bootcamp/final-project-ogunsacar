import { useEffect, useState } from "react"
import Form from "../components/Form"
import Navbar from "../components/Navbar"

export default function CreateApplication() {
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data))
  }, [])

  return (
    <div className="background">
      <Navbar />
      <Form />
      {quote && (
        <div className='quoteContainer'>
          <span className="quote">{quote.content}</span>
          <div className='author'>-{quote.author}</div>
        </div>
      )}
    </div>
  )
}
