import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function FindApplication() {
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data))
  }, [])

  return (
    <div className='background'>
      <Navbar/>
      <form>
        <label>
          <span>Başvuru kodu:</span>
          <input type="text" required />
        </label>
        <button className="btn">Sorgula</button>
      </form>
      {quote && (
        <div className='quoteContainer'>
          <span className="quote">{quote.content}</span>
          <div className='author'>-{quote.author}</div>
        </div>
      )}
    </div>
  )
}
