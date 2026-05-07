import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Board from "./components/Board";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/login";
import Register from "./pages/Register";

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Board />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
