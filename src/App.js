import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import useAuthContext from "./hooks/useAuthContext"

// components
import Admin from "./pages/Admin"
import Application from "./pages/Application"
import ApplicationList from "./pages/ApplicationList"
import ApplicationSuccessful from "./pages/ApplicationSuccessful"
import CreateApplication from "./pages/CreateApplication"
import FindApplication from "./pages/FindApplication"
import UserApplication from "./pages/UserApplication"
import NotFound from "./pages/NotFound"

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="app">
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/basvuru-olustur" />} />
            <Route path="/basvuru-olustur" element={<CreateApplication />} />
            <Route path="/basvuru-sorgula" element={<FindApplication />} />
            {/* if we have user we go to the application page that we can add comment.otherwise we go to the application information page */}

            <Route
              path="basvuru/:basvuruNo"
              element={!user ? <UserApplication /> : <Application />}
            />

            <Route
              path="/basvuru-basarili"
              element={<ApplicationSuccessful />}
            />

            <Route path="/admin" element={<Admin />}>
              <Route
                path="basvuru-listesi"
                element={!user ? <Navigate to="/admin" /> : <ApplicationList />}
              />

              <Route
                path="*"
                element={
                  !user ? <Navigate to="" /> : <Navigate to="basvuru-listesi" />
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
