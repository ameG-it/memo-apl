import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Authlayout from "./components/layout/Authlayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authlayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
