import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Register } from "./pages/Register";
import { ForgetPassword } from "./pages/ForgetPassword";
import { RecoverPassword } from "./pages/RecoverPassword";
import { ConfirmAccount } from "./pages/ConfirmAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout/>}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/confirm/:token" element={<ConfirmAccount />} />
          <Route path="/recover-password/:token" element={<RecoverPassword />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
