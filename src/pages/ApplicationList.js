import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import SingleApplication from "../components/SingleApplication"
import useCollection from "../hooks/useCollection"
import "./ApplicationList.css"

export default function ApplicationList() {
  const [term, setTerm] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const tags = ["hepsi", "bekleyenler", "onaylananlar", "reddedilenler"]
  const [currentTag, setCurrentTag] = useState("hepsi")
  let { documents: applications } = useCollection("applications")

const btnTag = document.getElementById('hepsi')

  useEffect(()=> {
    if(applications?.length > 0){
      btnTag.click()
    }
  },[btnTag,applications])
  


  const filterByTag = (tag) => {
    if (tag === "bekleyenler") {
      setFilteredData(
        applications.filter((application) => {
          return application.progress === "Bekliyor"
        })
      )
    } else if (tag === "onaylananlar") {
      setFilteredData(
        applications.filter((application) => {
          return application.progress === "Onaylandı"
        })
      )
    } else if (tag === "reddedilenler") {
      setFilteredData(
        applications.filter((application) => {
          return application.progress === "Reddedildi"
        })
      )
    } else if (tag === "hepsi") {
      setFilteredData(applications)
    } else {
      setFilteredData(applications)
    }
  }
  
  console.log(applications);

  if (applications?.length === 0) {
    return <div className="no-application">Henüz başvuru yapılmamış.</div>
  }



  
  
  
    

  return (
    
      <div className="application-list-container">
        <div className="filters">
          <div className="searchbar">
            <input
              className="searchbar-input"
              type="text"
              id="search"
              onChange={(e) => setTerm(e.target.value)}
              value={term}
              placeholder="Ad soyad ile arama yapabilirsiniz..."
            />
          </div>
          <div className="tags">
            {tags.map((tag) => (
              <span
                onClick={() => {
                  setCurrentTag(tag)
                  filterByTag(tag)
                }}
                key={tag}
                id={tag}
                className={`tag ${currentTag === tag ? "activeTag" : ""}`}
              >
                #{tag}
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
