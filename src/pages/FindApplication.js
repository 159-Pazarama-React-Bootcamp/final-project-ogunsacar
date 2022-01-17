import Navbar from "../components/Navbar";

export default function FindApplication() {
  return (
    <div>
      <Navbar/>
      <form>
        <label>
          <span>Başvuru kodu:</span>
          <input type="text" required />
        </label>
        <button className="btn">Sorgula</button>
      </form>
    </div>
  )
}
