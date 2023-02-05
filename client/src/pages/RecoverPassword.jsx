import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { clientAxios } from "../../config/clientAxios";
import { Alerts } from "../components/Alerts";
import { Button } from "../components/Button";

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
    <>
          <h1>Reestablecé tu contraseña</h1>
          {alert.msg && <Alerts {...alert} />}
          {tokenChecked && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password">Nueva contraseña</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Escribí tu nueva contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button text={"Resetear contraseña"}/>
            </form>
          )}
    </>
  );
};
