import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import useAuthContext from "./hooks/useAuthContext"

// components
import Admin from "./pages/admin/Admin"
import ApplicationList from "./pages/admin/applicationList/ApplicationList"
import Application from "./pages/application/Application"
import ApplicationSuccessful from "./pages/applicationSuccessful/ApplicationSuccessful"
import CreateApplication from "./pages/createApplication/CreateApplication"
import FindApplication from "./pages/findApplication/FindApplication"

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/basvuru-olustur" />} />
            <Route path="/basvuru-olustur" element={<CreateApplication />} />
            <Route
              path="/basvuru-basarili"
              element={<ApplicationSuccessful />}
            />
            <Route path="/basvuru-sorgula" element={<FindApplication />} />
            <Route path="/basvuru/:basvuruNo" element={<Application />} />
            <Route path="/admin" element={<Admin />}>
              <Route
                path="basvuru-listesi"
                element={user ? <ApplicationList /> : <Navigate to="/admin" />}
              />
              <Route
                path="basvuru/:basvuruNo"
                element={user ? <Application /> : <Navigate to="/admin" />}
              />
            </Route>
            <Route path="*" element={<Navigate to="/basvuru-olustur" />} />
          </Routes>
        </BrowserRouter>
      )}
      {/* 
      <Route path="basvuru-listesi" element={user ? <ApplicationList/> : <Navigate to='/admin'/> } />
      <Route path="basvuru/:basvuruNo" element={user ? <Application/> : <Navigate to='/admin'/>}/>
      */}
    </div>
  )
}

export default App
