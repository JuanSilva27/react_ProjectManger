import { Link, useNavigate } from "react-router-dom";
import { Row, FormGroup, Form, Col, Button, Nav } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Alerts } from "../components/Alerts";
import { clientAxios } from "../../config/clientAxios";
import useAuth from "../hooks/useAuth";

export const Login = () => {
  const [alert, setAlert] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleShowAlert = (msg, time = true) => {
    setAlert({
      msg,
    });

    if (time) {
      setTimeout(() => {
        setAlert({});
      }, 2000);
    }
  };

  const { formValues, handleInputChange, reset } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      handleShowAlert("Todos los campos deben estar completos");
      return null;
    }

    try {
      const { data } = await clientAxios.post(`/auth/login/`, {
        email,
        password,
      });
      console.log(data);

      setAuth(data.user);
      sessionStorage.setItem("token", data.token);
      navigate("/projects");
    } catch (error) {
      console.log(error);
      handleShowAlert(error.response?.data.msg);
    }
  };

  return (
    <Row>
      <Col xs={12} lg={9} className="mb-4">
        <Form onSubmit={handleSubmit}>
          <h1>Iniciá sesión</h1>
          {alert.msg && <Alerts {...alert} />}
          <FormGroup className="mb-1">
            <Form.Label htmlFor="email">Correo electrónico</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Ingrese su email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <Form.Label htmlFor="password">Contraseña</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </FormGroup>

          <Button variant="primary" type="submit">
            Iniciar sessión
          </Button>
        </Form>
        <Nav>
          <Link to={"/register"}>¿No tenés una cuenta? Registrate</Link>
          <Link to={"/forget-password"}>Olvidé mi password</Link>
        </Nav>
      </Col>
    </Row>
  );
};
