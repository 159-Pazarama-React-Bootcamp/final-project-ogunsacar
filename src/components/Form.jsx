import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router"
import * as Yup from "yup"
import { useFirestore } from "../hooks/useFirestore"
export default function Form() {
  const { addDocument, response } =
    useFirestore("applications")
  const [attachedDoc, setAttachedDoc] = useState(null)
  const [attachedDocError, setAttachedDocError] = useState(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setAttachedDoc(null)
    let selected = e.target.files[0]

    if (!selected.type.includes("image")) {
      setAttachedDocError("'image' dosyası seçmelisiniz!")
      return
    }
    if (selected.size > 200000) {
      setAttachedDocError("Dosya boyutu 200kb'dan az olmalı!")
      return
    }
    setAttachedDocError(null)
    setAttachedDoc(selected)
  }


  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      age: 10,
      idNumber: 12345678912,
      description: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Adınız 15 harften uzun olamaz!")
        .min(2, "Adınız 2 harften kısa olamaz!")
        .required("Bu alanı doldurmanız gerekmektedir!"),
      surname: Yup.string()
        .max(15, "Soyadınız 20 harften uzun olamaz!")
        .min(2, "Soyadınız 2 harften kısa olamaz!")
        .required("Bu alanı doldurmanız gerekmektedir!"),
      age: Yup.number()
        .required("Yaşınızı girmeniz gerekmektedir!")
        .min(10, "10 yaşından küçükseniz büyüğünüze danışın!")
        .max(100, "100 yaşından büyükseniz gençlerden yardım alın!"),
      description: Yup.string()
        .min(5, "Başvuru nedeni 10 harften az olmamalı!")
        .max(400, "Başvuru nedeni 400 harften fazla olmamalı!")
        .required("Başvuru nedenini belirtmeniz gerekmektedir!"),
      address: Yup.string()
        .min(20, "Adresiniz 20 karakterden az olmamalı!")
        .max(200, "Adresiniz 200 karakterden fazla olmamalı!")
        .required("Adresinizi belirtmeniz gerekmektedir!"),
    }),
    onSubmit: (values, { resetForm }) => {
      addDocument({ ...values, attachedDoc }).then(() => {
        resetForm()
        setTimeout(() => {
          navigate("/basvuru-basarili")
        }, 500)
      })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        <span>Ad:</span>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="input-error">{formik.errors.name}</p>
        )}
      </label>
      <label>
        <span>Soyad:</span>
        <input
          id="surname"
          name="surname"
          type="text"
          required
          value={formik.values.surname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.surname && formik.errors.surname && (
          <p className="input-error">{formik.errors.surname}</p>
        )}
      </label>
      <label>
        <span>Yaş:</span>
        <input
          id="age"
          name="age"
          type="number"
          required
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.age && formik.errors.age && (
          <p className="input-error">{formik.errors.age}</p>
        )}
      </label>
      <label>
        <span>Tc Kimlik No:</span>
        <input
          id="idNumber"
          name="idNumber"
          type="number"
          required
          value={formik.values.idNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.idNumber && formik.errors.idNumber && (
          <p className="input-error">{formik.errors.idNumber}</p>
        )}
      </label>
      <label>
        <span>Başvuru Nedeni:</span>
        <textarea
          id="description"
          name="description"
          type="text"
          required
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="input-error">{formik.errors.description}</p>
        )}
      </label>
      <label>
        <span>Adres:</span>
        <textarea
          id="address"
          name="address"
          type="text"
          required
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.errors.address && (
          <p className="input-error">{formik.errors.address}</p>
        )}
      </label>
      <label>
        <span>
          Fotoğraflar/Ekler:{" "}
          <span className="mailandpassword">(Zorunlu alan değil.)</span>{" "}
        </span>
        <input type="file" onChange={handleFileChange} />
        {attachedDocError && (
          <div className="input-error">{attachedDocError}</div>
        )}
      </label>

      {!response.isPending && (
        <button type="submit" className="btn">
          GÖNDER
        </button>
      )}
      {response.isPending && (
        <button disabled className="btn">
          GÖNDERİLİYOR
        </button>
      )}
      
    </form>
  )
}
