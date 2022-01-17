export default function Form() {
    return (    
            <div>
            <form >
                <label>
                    <span>Ad:</span>
                    <input 
                    type="text"
                    required
                    />
                </label>
                <label>
                    <span>Soyad:</span>
                    <input 
                    type="text"
                    required
                    />
                </label>
                <label>
                    <span>Yaş:</span>
                    <input 
                    type="number"
                    required
                    />
                </label>
                <label>
                    <span>Tc Kimlik No:</span>
                    <input 
                    type="number"
                    required
                    />
                </label>
                <label>
                    <span>Başvuru Nedeni:</span>
                    <textarea 
                    type="text"
                    required
                    ></textarea>
                </label>
                <label>
                    <span>Adres:</span>
                    <textarea 
                    type="text"
                    required
                    ></textarea>
                </label>
                
                <button className='btn'>Gönder</button>
            </form>
        </div>
    )
}
