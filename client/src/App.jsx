import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Register } from "./pages/Register";
import { ForgetPassword } from "./pages/ForgetPassword";
import { RecoverPassword } from "./pages/RecoverPassword";
import { ConfirmAccount } from "./pages/ConfirmAccount";
import { AuthProvider } from "./context/AuthProvider";
import { ProctectedLayout } from "./layouts/ProctectedLayout";
import { Projects } from "./pages/Projects";
import { ProjectAdd } from "./pages/ProjectAdd";
import { Project } from "./pages/Project";
import { ProjectEdit } from "./pages/ProjectEdit";
import { ProjectProvaider } from "./context/ProjectProvaider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvaider>
          <Routes>
            {/* Rutas publicas */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/confirm/:token" element={<ConfirmAccount />} />
              <Route
                path="/recover-password/:token"
                element={<RecoverPassword />}
              />
            </Route>

            {/* Rutas Privadas */}
            <Route path="/projects" element={<ProctectedLayout />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<ProjectAdd />} />
              <Route path="edit-project/:id" element={<ProjectEdit />} />
              <Route path=":id" element={<Project />} />
            </Route>
          </Routes>
        </ProjectProvaider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
