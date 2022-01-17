import { useParams } from "react-router";
import SingleApplication from "../components/SingleApplication";
import { Link, Outlet } from "react-router-dom"


export default function Application() {

const {basvuruNo} = useParams()

  return (<div>
      <SingleApplication/>
      <h1>{basvuruNo}</h1>
  </div>)
}
