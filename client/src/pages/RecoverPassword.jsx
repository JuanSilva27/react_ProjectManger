import React from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";

export const RecoverPassword = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col sm={12} lg={9} className="mb-4">
          <h1>Reestablecé tu contraseña</h1>
          <Form>
            <FormGroup className="mb-3" controlId="formBasicPassword">
              <Form.Label htmlFor="password">Nueva contraseña</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Escribí tu nueva contraseña"
              />
            </FormGroup>
            <Button variant="primary" type="submit">
              Guaradar tu contraseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
