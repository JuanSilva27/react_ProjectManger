import { Alerts } from "./Alerts";
import { Button } from "./Button";
import { useForm } from "../hooks/useForm";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

export const FormProject = () => {
  const { alert, showAlert, storeProject, project } = useProjects();
  const { formValues, handleInputChange, setFromValues } = useForm({
    name: "",
    description: "",
    dateExpire: "",
    client: "",
  });

  const { id } = useParams();
  let { name, description, dateExpire, client } = formValues;

  useEffect(() => {
    if (id) {
      /* const { name, description, dateExpire, client } = project; */
      inputName.current.value = project.name;
      inputDescription.current.value = project.description;
      inputDateExpire.current.value = project.dateExpire?.split("T")[0];
      inputClient.current.value = project.client;

      setFromValues({
        name: project.name,
        description: project.description,
        dateExpire: project.dateExpire?.split("T")[0],
        client: project.client,
      });
    }
  }, []);

  const inputName = useRef(null);
  const inputDescription = useRef(null);
  const inputDateExpire = useRef(null);
  const inputClient = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([name, description, dateExpire, client].includes("")) {
      showAlert("Todos los campos son obligatorios");
      return null;
    }
    storeProject({
      id: id ? id : null,
      name,
      description,
      dateExpire,
      client,
    });
  };
  return (
    <form
      /* onSubmit={} */
      /* my-10 p-8 bg-white rounded-lg border shadow-lg */
      className="bg-white py-5 px-5 md:w-4/4 lg:w-3/4 rounded-md border-2"
      onSubmit={handleSubmit}
    >
      {alert.msg && <Alerts {...alert} />}
      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Proyecto
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre del proyecto"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={name}
          onChange={handleInputChange}
          name="name"
          ref={inputName}
        />
      </div>
      <div className="my-5">
        <label
          htmlFor="description"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descripción
        </label>
        <textarea
          id="description"
          type="text"
          style={{ resize: "none" }}
          placeholder="Descripción del proyecto"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={description}
          onChange={handleInputChange}
          name="description"
          ref={inputDescription}
        />
      </div>
      <div className="my-5">
        <label
          htmlFor="date-expire"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Fecha de entrega
        </label>
        <input
          id="date-expire"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={dateExpire}
          onChange={handleInputChange}
          name="dateExpire"
          ref={inputDateExpire}
        />
      </div>
      <div className="my-5">
        <label
          htmlFor="client"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Cliente
        </label>
        <input
          id="client"
          type="text"
          placeholder="Nombre del cliente"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          onChange={handleInputChange}
          value={client}
          name="client"
          ref={inputClient}
        />
      </div>
      <Button text={id ? "actualizar" : "guardar"} />
    </form>
  );
};
