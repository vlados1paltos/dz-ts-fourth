import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header, LoginForm, RegistrationForm } from "./components";
import "./styles.css";

/**
 * HashRouter выбран специально для GitHub Pages:
 * маршруты работают без отдельной настройки сервера.
 */
function App() {
  return (
    <HashRouter>
      <Header />

      <main className="page">
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
