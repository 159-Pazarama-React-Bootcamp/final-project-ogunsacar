import { useFormik } from "formik"
import { useNavigate } from "react-router"
import { Link, Outlet } from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext"
import { useLogin } from "../hooks/useLogin"
import { useLogout } from "../hooks/useLogout"
import * as Yup from "yup"

import './Admin.css'

export default function Admin() {
  let navigate = useNavigate()

  const { user } = useAuthContext()
  const { login, isPending, error } = useLogin()
  const { logout } = useLogout()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Lütfen bir e-mail adresi giriniz').required(
        "Zorunlu alandır.(Örnekteki mail adresiyle giriş yapabilirsiniz.)"
      ),
      password: Yup.string()
        .max(15, "Maximum 15 karakter olmalıdır")
        .min(8, "Minimum 8 karakter olmalıdır")
        .required("Zorunlu alandır.(Örnekteki şifreye giriş yapabilirsiniz.)"),
    }),
    onSubmit: (values, { resetForm }) => {
      login(formik.values.email, formik.values.password)
      resetForm()
      navigate("/admin/basvuru-listesi")
    },
  })

  if (!user) {
    return (
      <div className="admin-page">
        <form className="admin-form" onSubmit={formik.handleSubmit}>
          <label className="admin-form-label">
            <span className="admin-form-span">
              Email:
              <span className="mailandpassword">
                (kodluyoruz@pazarama.com)
              </span>
            </span>
            <input
              name="email"
              id="email"
              className="admin-form-input"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="input-error">{formik.errors.email}</p>
            )}
          </label>
          <label className="admin-form-label">
            <span className="admin-form-span">
              Şifre: <span className="mailandpassword"> (bootcamp109)</span>
            </span>
            <input
              name="password"
              id="password"
              className="admin-form-input"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="input-error">{formik.errors.password}</p>
            )}
          </label>
            {!isPending && <button type='submit' className="btn">Giriş yap</button>}
            {isPending && (
              <button className="btn" disabled>
                Giriş yapılıyor
              </button>
            )}
            {error && <h3 className="input-error">E-mail adresi veya şifre yanlış!</h3>}
        </form>
      </div>
    )
  } else {
    return (
      <div className="dashboard">
        <div className="buttonDiv">
          <Link className='application-link' to='basvuru-listesi'>BAŞVURULAR</Link>
          <button
            className="btn logout-button"
            onClick={() => {
              logout()
              navigate("/admin")
            }}
          >
            Çıkış yap
          </button>
        </div>

        <Outlet />
      </div>
    )
  }
}
