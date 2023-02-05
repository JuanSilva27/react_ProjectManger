import React from "react";
import { useState } from "react";
import { clientAxios } from "../../config/clientAxios";
import { Alerts } from "../components/Alerts";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "../components/Button";

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

export const Register = () => {
  const [alert, setAlert] = useState({});
  const [sending, setSending] = useState(false);

  const { formValues, setFromValues, handleInputChange, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, password2].includes("")) {
      handleShowAlert("Todos los campos son obligatorios");
      return null;
    }

    if (!exRegEmail.test(email)) {
      handleShowAlert("El email tiene un formato invalido");
      return null;
    }

    if (password !== password2) {
      handleShowAlert("Las contraseñas tienen que ser Iguales");
      return null;
    }

    try {
      setSending(true);

      const { data } = await clientAxios.post(`/auth/register`, {
        name,
        email,
        password,
      });

      setSending(false);
      console.log(data.data);
      Swal.fire({
        icon: "info",
        title: "Gracias por registrarte",
        text: data.msg,
      });
    } catch (error) {
      console.error(error);
      handleShowAlert(error.response.data.msg);
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
    <>
      <h1 className="text-green-600 font-black text-3xl capitalize">
        Creá tu cuenta
      </h1>
      {alert.msg && <Alerts {...alert} />}
      <form
        className="my-10 p-8 bg-white rounded-lg border shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Ingresá tu nombre"
            autoComplete="off"
            value={name}
            name="name"
            className="w-full mt-3 p-3 border rounded"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full mt-3 p-3 border rounded"
            placeholder="Ingrese su email"
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            className="w-full mt-3 p-3 border rounded"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Confirma tu Contraseña</label>
          <input
            id="password2"
            type="password"
            name="password2"
            className="w-full mt-3 p-3 border rounded"
            value={password2}
            placeholder="Ingrese su contraseña"
            onChange={handleInputChange}
          />
        </div>

        <Button text="Crear cuenta"/>
      </form>
      <nav>
        <Link to={"/"} className="text-sky-700 block text-center my-3 text-sm uppercase">¿Estas registrado? Iniciar Sesion</Link>
      </nav>
    </>
  );
};
