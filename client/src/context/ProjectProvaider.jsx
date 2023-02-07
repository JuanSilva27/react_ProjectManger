import React, { createContext, useState } from "react";
import { clientAxios } from "../../config/clientAxios";
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const ProjectContext = createContext();

const ProjectProvaider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const showAlert = (msg, time = true) => {
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

  const getProjects = async () => {
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clientAxios.get("/projects", config);
      setProjects(data.projects);
    } catch (error) {
      console.error(error);
      showAlert(
        error.resoponse ? error.response.data.msg : "ups hubo un error",
        false
      );
    } finally {
      setLoading(false);
    }
  };

  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clientAxios.get(`/projects/${id}`, config);
      setProject(data.projects);
    } catch (error) {
      console.error(error);
      showAlert(
        error.resoponse ? error.response.data.msg : "ups hubo un error",
        false
      );
    } finally {
      setLoading(false);
    }
  };

  const storeProject = async (project) => {
    
    const token = sessionStorage.getItem("token");
    try {
      if (!token) return null;
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const {data} = await clientAxios.post(`/projects`,project,config)
      setProjects([...projects,data.project])

      Toast.fire({
        icon: "success",
        title: data.msg
      })
      navigate("/")
    } catch (error) {
      console.error(error);
      showAlert(
        error.resoponse ? error.response.data.msg : "ups hubo un error",
        false
      );
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        loading,
        alert,
        showAlert,
        projects,
        getProjects,
        project,
        getProject,
        storeProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvaider };

export default ProjectContext;
