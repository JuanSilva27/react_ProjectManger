import React from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";

export const ForgetPassword = () => {
  return (
    /*<>
        <Link to={"/register"}>¿No tenés una cuenta? Registrate</Link>
        <Link to={"/"}>¿Estás registrado? Iniciá sesión</Link>
      </nav>
    </> */
    <Container className="mt-5">
      <Row>
        <Col sm={12} className="mb-4">
          <h1>Recupera tu acceso</h1>
          <Form>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="email">Correo electrónico</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Ingresá tu email"
              />
            </FormGroup>
            <Button variant="primary" type="submit">
            Recuperar contraseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
