import { NavLink } from "react-router-dom"
import "./Navbar.css"
export default function Navbar() {
  return (
    <nav>
      <NavLink data-testid='create-application' to="/basvuru-olustur">Başvuru oluştur</NavLink>
      <NavLink data-testid='application-progress' to="/basvuru-sorgula">Başvuru durumu</NavLink>
    </nav>
  )
}
