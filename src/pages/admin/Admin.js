export default function Admin() {


  
  return (
    <div className='admin-form'>
      <form>
        <label>
          <span>
            Email:
            <span className="mailandpassword"> (kodluyoruz@pazarama.com)</span>
          </span>
          <input type="text" required />
        </label>
        <label>

          <span>
            Şifre: <span className="mailandpassword"> (bootcamp109)</span>
          </span>
          <input type="text" required />
        </label>
        <button className="btn">Giriş yap</button>
      </form>
    </div>
  )
}
