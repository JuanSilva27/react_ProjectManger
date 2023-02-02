import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { clientAxios } from "../../config/clientAxios";
import { Alerts } from "../components/Alerts";

export const ConfirmAccount = () => {
  const params = useParams();
  const { token } = params;

  const navigate = useNavigate();

  const [alert, setAlert] = useState({});

  const handleShowAlert = (msg) => {
    setAlert({
      msg,
    });
    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await clientAxios.get(`/auth/checked?token=${token}`);

        Swal.fire({
          icon: "info",
          title: "Felicitaciones!",
          text: data.msg,
          confirmButtonText: "Iniciar sesion",
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      } catch (error) {
        console.error(error);
        handleShowAlert(error.response.data.msg);
      }
    };

    confirmAccount();
  }, []);

  return (
    <>
      <h1>Confirma tu cuenta</h1>
      <div>
        {
          alert.msg && (
            <>
              <Alerts {...alert}/>
            </>
          ) 
        }
      </div>
    </>
  );
};
