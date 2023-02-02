import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { clientAxios } from "../../config/clientAxios";
import { Alerts } from "../components/Alerts";

export const RecoverPassword = () => {
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleShowAlert = (msg) => {
    setAlert({
      msg,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      handleShowAlert("El pasword es Requerido");
      return null;
    }

    try {
      const { data } = await clientAxios.post(
        `/auth/reset-password?token=${token}`,
        {
          password,
        }
      );
      Swal.fire({
        icon: "info",
        title: "Contaseña reseteada",
        text: data.msg,
        confirmButtonText: "Iniciar sesion",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setPassword("")
          navigate("/");
        }
      });
    } catch (error) {
      handleShowAlert(error.response?.data.msg)
      setPassword("")
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await clientAxios.get(
          `/auth/reset-password?token=${token}`
        );
        console.log(data.msg);
        setTokenChecked(true);
      } catch (error) {
        console.log(error);
        handleShowAlert(error.response?.data.msg);
      }

    };
    checkToken();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={12} lg={9} className="mb-4">
          <h1>Reestablecé tu contraseña</h1>
          {alert.msg && <Alerts {...alert} />}
          {tokenChecked && (
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <Form.Label htmlFor="password">Nueva contraseña</Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Escribí tu nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button variant="primary" type="submit">
                Resetea tu contraseña
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};
