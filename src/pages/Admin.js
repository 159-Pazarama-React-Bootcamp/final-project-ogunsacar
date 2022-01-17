import { useState } from "react"
import { useNavigate } from "react-router"
import { Link, Outlet } from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext"
import { useLogin } from "../hooks/useLogin"
import { useLogout } from "../hooks/useLogout"

export default function Admin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate()

  const { user } = useAuthContext()
  const { login, isPending, error } = useLogin()
  const { logout } = useLogout()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    setPassword("")
    setEmail("")

    navigate("/admin/basvuru-listesi")
  }

  if (!user) {
    return (
      <div className="admin-form">
        <form onSubmit={handleSubmit}>
          <label>
            <span className="admin-label">
              Email:
              <span className="mailandpassword">
                {" "}
                (kodluyoruz@pazarama.com)
              </span>
            </span>
            <input
              type="text"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <span className="admin-label">
              Şifre: <span className="mailandpassword"> (bootcamp109)</span>
            </span>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          {!isPending && <button className="btn">Giriş yap</button>}
          {isPending && (
            <button className="btn" disabled>
              Giriş yapılıyor
            </button>
          )}
          {error && <h3>{error}</h3>}
        </form>
      </div>
    )
  } else {
    return (
      <div className="dashboard">
        <div className="buttonDiv">
          <h2>BAŞVURULAR</h2>
          <button
            className="btn logout-button"
            onClick={() => {
              logout()
              navigate("/admin")
            }}
          >
            Çıkış yap
          </button>
        </div>

        <Outlet />
      </div>
    )
  }
}
