import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, FormGroup, Form, Col, Button } from "react-bootstrap";
export const Login = () => {
  return (
    /* <div>
      <nav>
        <Link to={"/register"}>¿No tenés una cuenta? Registrate</Link>
        <Link to={"/forget-password"}>Olvidé mi password</Link>
      </nav>
    </div> */

    <Container className="mt-5">
      <Row>
        <Col sm={12} lg={9} className="mb-4">
          <h1>Iniciá sesión</h1>
          <Form>
            <FormGroup className="mb-1" controlId="formBasicEmail">
              <Form.Label htmlFor="email">Correo electrónico</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Ingrese su email"
              />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="password">Contraseña</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
              />
            </FormGroup>

            <Button variant="primary" type="submit">Iniciar sessión</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
