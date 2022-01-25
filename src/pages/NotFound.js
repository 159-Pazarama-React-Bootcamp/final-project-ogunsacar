import React from "react"
import { useNavigate } from "react-router"
import "./NotFound.css"
export default function NotFound() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/basvuru-sorgula')
  }
  return (
    <div data-testid='notFound' className="notFound">
      <aside className="notFound-aside">
        <img
          className="notFound-img"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png"
          alt="404"
        />
      </aside>

      <h1 className="notFound-title">Üzgünüz aradığınız sayfa mevcut değil!</h1>
      <button onClick={handleClick} className="btn btn-application-goBack">Geri dön</button>
    </div>
  )
}
