import useAuthContext from "../hooks/useAuthContext"

export default function SingleApplication({ application }) {
  const { user } = useAuthContext()
  if (user) {
    return (
      <div className="content">
        <div className="application-card">
          <h2>
            {application.name} {application.surname}{" "}
          </h2>
          <h3> {application.age} </h3>
          <h3> {application.idNumber} </h3>
          <p> {application.description} </p>
          <p> {application.address} </p>
        </div>
        <div className='application-detail'>
          detaylı bilgi
        </div>
      </div>
    )
  } else {
    return <div>sorgulayınca karşımıza çıkan</div>
  }
}
