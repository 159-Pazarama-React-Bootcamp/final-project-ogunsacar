import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import useAuthContext from "./hooks/useAuthContext"

// components
import Admin from "./pages/Admin"
import Application from "./pages/Application"
import ApplicationList from "./pages/ApplicationList"
import ApplicationSuccessful from "./pages/ApplicationSuccessful"
import CreateApplication from "./pages/CreateApplication"
import FindApplication from "./pages/FindApplication"


function App() {
  const { user, authIsReady } = useAuthContext()
console.log(user);
  return (
    <div className='app'>
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
                element={!user ?  <Navigate  to="/admin" />: <ApplicationList />}
              />
              <Route
                path="basvuru/:basvuruNo"
                element={!user ? <Navigate to="/admin" /> : <Application />}
              />
            <Route path="*" element={<Navigate to="/admin" />} />
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
