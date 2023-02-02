import React from "react";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Nav,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { clientAxios } from "../../config/clientAxios";
import { Alerts } from "../components/Alerts";
export const ForgetPassword = () => {
  const [alert, setAlert] = useState({});
  const [email, setEmail] = useState("");
  const [sending, setSending]= useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      handleShowAlert("El email es requerido");
      return null;
    }

    try {
      setSending(true)
      const { data } = await clientAxios.post("/auth/send-token", {
        email,
      });
      setSending(false)

      Swal.fire({
        icon: "info",
        title: "Revisa tu casilla de Correo",
        text: data.msg,
        confirmButtonText: "Entendido",
        allowOutsideClick: false,
      });

      setEmail("");
    } catch (error) {
      handleShowAlert(error.response?.data.msg);
      setEmail("");
    }
  };

  const handleShowAlert = (msg) => {
    setAlert({
      msg,
    });
    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={12} className="mb-4">
          <h1>Recupera tu acceso</h1>
          {alert.msg && <Alerts {...alert}/>}
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <Form.Label htmlFor="email">Correo electrónico</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Ingresá tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <Button variant="primary" type="submit" disabled={sending}>
              Recuperar contraseña
            </Button>
          </Form>
          <Nav>
            <Link to={"/register"}>¿No tenés una cuenta? Registrate</Link>
            <Link to={"/"}>¿Estás registrado? Iniciá sesión</Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};
