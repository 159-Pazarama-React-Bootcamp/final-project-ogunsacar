import { useNavigate } from "react-router"

export default function ApplicationSuccessful() {

  const navigate = useNavigate()

    return (
        <div>
            Başvuru başarılı
            
            <button onClick={() => navigate('/basvuru-sorgula')}>Başvuru durumunu kontrol et</button>
        </div>
    )
}
