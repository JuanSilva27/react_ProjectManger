import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { clientAxios } from "../../config/clientAxios";
import { Alerts } from "../components/Alerts";
import { Button } from "../components/Button";
export const ForgetPassword = () => {
  const [alert, setAlert] = useState({});
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      handleShowAlert("El email es requerido");
      return null;
    }

    try {
      setSending(true);
      const { data } = await clientAxios.post("/auth/send-token", {
        email,
      });
      setSending(false);

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
    <>
      <h1 className="text-green-600 font-black text-3xl capitalize">
        Recupera tu acceso
      </h1>
      {alert.msg && <Alerts {...alert} />}
      <form onSubmit={handleSubmit}  className="my-10 p-8 bg-white rounded-lg border shadow-lg">
        <div className="my-5">
          <label htmlFor="email" className="text-gray-400 block font-bold uppercase">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Ingresá tu email"
            className="w-full mt-3 p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button text={"Recuperar contraseña"}>
          
        </Button>
      </form>
      <nav className="md:flex md:justify-between">
        <Link to={"/register"} className=" text-sky-700 block text-center my-3 text-sm uppercase ">¿No tenés una cuenta? Registrate</Link>
        <Link to={"/"} className=" text-sky-700 block text-center my-3 text-sm uppercase ">¿Estás registrado? Iniciá sesión</Link>
      </nav>
    </>
  );
};
