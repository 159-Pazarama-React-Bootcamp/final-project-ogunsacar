import { BrowserRouter, Route, Routes } from "react-router-dom"

// components
import Admin from "./pages/admin/Admin"
import Application from "./pages/application/Application"
import ApplicationSuccessful from "./pages/applicationSuccessful/ApplicationSuccessful"
import CreateApplication from "./pages/createApplication/CreateApplication"
import FindApplication from "./pages/findApplication/FindApplication"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/basvuru-olustur" element={<CreateApplication />} />
          <Route path="/basvuru-basarili" element={<ApplicationSuccessful />} />
          <Route path="/basvuru-sorgula" element={<FindApplication />} />
          <Route path="/basvuru/:basvuruNo" element={<Application />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="basvuru-listesi" />
            <Route path="basvuru/:basvuruNo"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
