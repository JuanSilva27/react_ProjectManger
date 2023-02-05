import { Container } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import useAuth from "../hooks/useAuth";

export const ProctectedLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      {auth._id ? (
        <div>
          <Header />
          <div>
            <Sidebar />
            <main className="container mx-auto mt-5 md:mt-10 p-5 md:flex md:justify-center">
              <Outlet></Outlet>
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
