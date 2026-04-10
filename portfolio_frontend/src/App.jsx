import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Admin } from "./pages/Admin";
import { AdminLogin } from "./pages/AdminLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
