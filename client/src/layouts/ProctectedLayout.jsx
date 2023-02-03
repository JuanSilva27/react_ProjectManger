import { Container } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const ProctectedLayout = () => {
  const { auth, loading } = useAuth();
  {
    if (loading) {
      return <p>Cargando...</p>;
    }
  }
  return (
    <>
      {auth._id ? (
        <Container>
          <Outlet></Outlet>
        </Container>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
