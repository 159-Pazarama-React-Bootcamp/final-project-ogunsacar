import {  useState } from "react"
import SingleApplication from "../components/SingleApplication"
import useCollection from "../hooks/useCollection"
import "./ApplicationList.css"

export default function ApplicationList() {
  const [term, setTerm] = useState("")
  const tags = [
    "hepsi",
    "bekleyenler",
    "onaylananlar",
    "reddedilenler",
  ]
  const [currentTag, setCurrentTag] = useState("hepsi")

  let { documents: applications } = useCollection("applications")

  const [filteredData,setFilteredData] = useState([])

  if (applications?.length === 0) {
    return <div className="no-application">Henüz başvuru yapılmamış.</div>
  }


  const filterByTag = (tag) => {
    if (applications.length > 0) {
      if (tag === "bekleyenler") {
        setFilteredData(applications.filter((application) => {
          return application.progress === "Bekliyor"
        }))
      } else if (tag === "onaylananlar") {
        setFilteredData(applications.filter((application) => {
          return application.progress === "Onaylandı"
        }))
      } else if (tag === "reddedilenler") {
        setFilteredData(applications.filter((application) => {
          return    application.progress === "Reddedildi" 
        }))
      } else if (tag === "hepsi") {
        setFilteredData(applications)
      } else {
        setFilteredData(applications)
      }
    }
  }



  console.log(filteredData,currentTag)

  return (
    <div>
      <div className="filters">
        <div className="searchbar">
          <input
          className='searchbar-input'
            type="text"
            id="search"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
            placeholder='Ad soyad ile arama yapabilirsiniz...'
          />
        </div>
        <div className='tags'>
          {tags.map((tag) => (
            <span
              onClick={() => {
                setCurrentTag(tag)
                filterByTag(tag)
              }}
              key={tag}
              className={`tag ${currentTag === tag ? 'activeTag' : ''}`}
            >
              {" "}
              #{tag}{" "}
            </span>
          ))}
        </div>
      </div>
      <ul className="application-card">
        {filteredData &&
          filteredData
            .filter((val) => {
              if (term !== "") {
                return (
                  val.name.toLowerCase() +
                  " " +
                  val.surname.toLowerCase()
                ).includes(term.toLowerCase())
              }
              return val
            })
            .map((application) => (
              <SingleApplication
                key={application.id}
                application={application}
              />
            ))}
      </ul>
    </div>
  )
}
