import { useState } from "react"
import { Link ,Outlet} from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext"
import { useLogin } from "../hooks/useLogin"
import { useLogout } from "../hooks/useLogout"

export default function Admin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { user } = useAuthContext()

  const { login, isPending, error } = useLogin()
  const { logout } = useLogout()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    setPassword("")
    setEmail("")
  }

  if (!user) {
    return (
      <div className="admin-form">
        <form onSubmit={handleSubmit}>
          <label>
            <span>
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
            <span>
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
      <div>

      <div className='dashboard'>
        <button className="btn logout-button" onClick={logout}>
          Çıkış yap
        </button>
      </div>
        <Link to="/admin/basvuru-listesi">Başvuru listesi</Link>
        <Link to="/admin/basvuru/1">Başvuru 1</Link>
       <Outlet/>
      </div>
    )
  }
}
