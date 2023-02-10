import React, { createContext, useState } from "react";
import { clientAxios } from "../../config/clientAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
  const [showModal, setShowModal] = useState(false);
  const [alertModal, setAlertModal] = useState({});
  const [tasks, setTasks] = useState([])

  const navigate = useNavigate();

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
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const showAlertModal = (msg, time = true) => {
    setAlertModal({
      msg,
    });

    if (time) {
      setTimeout(() => {
        setAlertModal({});
      }, 3000);
    }
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
      setProject(data.project);
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
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      if (project.id) {
        const { data } = await clientAxios.put(
          `/projects/${project.id}`,
          project,
          config
        );
        const projectsUpdated = projects.map((projectState) => {
          if (projectState._id === data.project._id) {
            return data.project;
          }
          return projectState;
        });

        setProject(projectsUpdated);
      } else {
        const { data } = await clientAxios.post(`/projects`, project, config);
        setProjects([...projects, data.project]);

        Toast.fire({
          icon: "success",
          title: data.msg,
        });
      }

      navigate("projects");
    } catch (error) {
      console.error(error);
      showAlert(
        error.resoponse ? error.response.data.msg : "ups hubo un error",
        false
      );
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return null;
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await clientAxios.delete(`/projects/${id}`, config);

      const projectsFiltered = projects.filter((project) => project._id !== id);

      setProjects(projectsFiltered);

      Toast.fire({
        icon: "success",
        title: data.msg,
      });

      navigate("projects");
    } catch (error) {
      console.error(error);
      showAlert(
        error.response ? error.response.data.msg : "Hubo un error....",
        false
      );
    }
  };

  const storeTask = async (task) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      task.project = project._id;
      const { data } = await clientAxios.post("/task", task, config);
      project.tasks = [...project.tasks, data.task];
      setProject(project);
      setShowModal(false);
      Toast.fire({ icon: "success", title: data.msg });
      setAlert({});
    } catch (error) {
      console.log(error);
      showAlertModal(
        error.resoponse ? error.response.data.msg : "Upss, hubo un error",
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
        storeProject,
        deleteProject,
        alertModal,
        showAlertModal,
        storeTask,
        handleShowModal,
        showModal
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvaider };

export default ProjectContext;
