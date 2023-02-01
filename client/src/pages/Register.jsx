import React from "react";
import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { clientAxios } from "../../config/clientAxios";
import { Alerts } from "../components/Alerts";
import { useForm } from "../hooks/useForm";
import Swal from 'sweetalert2'

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

export const Register = () => {

  const [alert, setAlert] = useState({})
  const [sending, setSending]= useState(false)

  const {formValues,setFromValues,handleInputChange,reset} = useForm({
    name : "",
    email: "",
    password:"",
    password2:""
  })

  const {name, email, password, password2} = formValues

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if([name,email,password,password2].includes("")){
      handleShowAlert("Todos los campos son obligatorios")
      return null
    }

    if(!exRegEmail.test(email)){
      handleShowAlert("El email tiene un formato invalido")
      return null
    }

    if(password !== password2){
      handleShowAlert("Las contraseñas tienen que ser Iguales")
      return null
    }

    try {

      setSending(true)

      const {data} = await clientAxios.post(`/auth/register`,{
        name,
        email,
        password
      })

      setSending(false)
      console.log(data.data)
      Swal.fire({
        icon:"info",
        title:"Gracias por registrarte",
        text: data.msg
      })
    } catch (error) {
      console.error(error)
      handleShowAlert(error.response.data.msg)
    }
    
  }

  const handleShowAlert =(msg)=>{
    setAlert({
      msg
    });
    setTimeout(()=>{
      setAlert({})
    },2000)
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={12} lg={12} className="mb-4">
          <h1>Creá tu cuenta</h1>
          {
            alert.msg && <Alerts {...alert}/>
          }
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                id="name"
                type="text"
                placeholder="Ingresá tu nombre"
                autoComplete="off"
                value={name}
                name="name"
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup className="mb-3">
              <Form.Label htmlFor="email">Correo electrónico</Form.Label>
              <Form.Control
                id="email"
                type="email"
                name="email"
                placeholder="Ingrese su email"
                value={email}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label htmlFor="password">Contraseña</Form.Label>
              <Form.Control
                id="password"
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label htmlFor="password">Confirma tu Contraseña</Form.Label>
              <Form.Control
                id="password2"
                type="password"
                name="password2"
                value={password2}
                placeholder="Ingrese su contraseña"
                onChange={handleInputChange}
              />
            </FormGroup>

            <Button variant="primary" type="submit" disabled={sending}>Crear cuenta</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
