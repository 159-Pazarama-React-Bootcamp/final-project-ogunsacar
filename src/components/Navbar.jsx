import { NavLink } from "react-router-dom";
import './Navbar.css'
export default function Navbar() {
    return (
        <nav>
            <NavLink to='/basvuru-olustur'>Başvuru oluştur</NavLink>
            <NavLink to='/basvuru-sorgula'>Başvuru durumu</NavLink>
        </nav>
    )
}
