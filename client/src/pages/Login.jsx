import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Alerts } from "../components/Alerts";
import { clientAxios } from "../../config/clientAxios";
import useAuth from "../hooks/useAuth";
import { Button } from "../components/Button";

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
    reset();
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
    <>
      <form
        onSubmit={handleSubmit}
        className="my-10 p-8 bg-white rounded-lg border shadow-lg"
      >
        <h1 className="text-green-600 font-black text-3xl capitalize">
          Iniciá sesión
        </h1>
        {alert.msg && <Alerts {...alert} />}
        <div className="my-5">
          <label
            htmlFor="email"
            className="text-gray-400 block font-bold uppercase"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingrese su email"
            name="email"
            className="w-full mt-3 p-3 border rounded"
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className="text-gray-400 block font-bold uppercase"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            name="password"
            className="w-full mt-3 p-3 border rounded"
            value={password}
            onChange={handleInputChange}
          />
        </div>

        <Button text="Iniciar sesion"/>
      </form>
      <nav className="md:flex md:justify-between">
        <Link
          to={"/register"}
          className="text-sky-700 block text-center my-3 text-sm uppercase"
        >
          ¿No tenés una cuenta? Registrate
        </Link>
        <Link
          to={"/forget-password"}
          className="text-sky-700 block text-center my-3 text-sm uppercase"
        >
          Olvidé mi password
        </Link>
      </nav>
    </>
  );
};
