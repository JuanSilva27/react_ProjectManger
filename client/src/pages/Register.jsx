import React from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";

export const Register = () => {
  return (
    /* <div>
      <h1>Creá tu cuenta</h1>
      <form action="">
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Ingresá tu nombre"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" type="email" placeholder="Ingresá tu email" />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div>
          <label htmlFor="password2">Confirma tu contraseña</label>
          <input
            id="password2"
            type="password"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button type="submit">Crear cuenta</button>
      </form>
      <nav>
        <Link to={"/"}>¿Estás registrado? Iniciá sesión</Link>
      </nav>
    </div> */
    <Container className="mt-5">
      <Row>
        <Col sm={12} lg={12} className="mb-4">
          <h1>Creá tu cuenta</h1>
          <Form>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                id="name"
                type="text"
                placeholder="Ingresá tu nombre"
                autoComplete="off"
              />
            </FormGroup>
            
            <FormGroup className="mb-3" controlId="formBasicEmail">
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

            <FormGroup className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="password">Confirma tu Contraseña</Form.Label>
              <Form.Control
                id="password2"
                type="password"
                placeholder="Ingrese su contraseña"
              />
            </FormGroup>

            <Button variant="primary" type="submit">Crear cuenta</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
