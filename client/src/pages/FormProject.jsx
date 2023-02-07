import { Alerts } from "../components/Alerts";
import { Button } from "../components/Button";
import { useForm } from "../hooks/useForm";
import useProjects from "../hooks/useProjects";

export const FormProject = () => {
  const { alert, showAlert, storeProject } = useProjects();

  const { formValues, handleInputChange, reset } = useForm({
    name: "",
    description: "",
    dateExpire: "",
    client: "",
  });

  const { name, description, dateExpire, client } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([name, description, dateExpire, client].includes("")) {
      showAlert("Todos los campos son obligatorios");
      return null;
    }

    storeProject({
      name,
      description,
      dateExpire,
      client,
    });
  };
  return (
    <form
      /* onSubmit={} */
      className="my-10 p-8 bg-white rounded-lg border shadow-lg"
      onSubmit={handleSubmit}
    >
      {alert.msg && <Alerts {...alert} />}
      <div className="my-5">
        <label
          htmlFor="name"
          className="text-gray-400 block font-bold uppercase"
        >
          Nombre Proyecto
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre del proyecto"
          className="w-full mt-3 p-3 border rounded"
          value={name}
          onChange={handleInputChange}
          name="name"
        />
      </div>
      <div className="my-5">
        <label
          htmlFor="description"
          className="text-gray-400 block font-bold uppercase"
        >
          Descripción
        </label>
        <textarea
          id="description"
          type="text"
          style={{ resize: "none" }}
          placeholder="Descripción del proyecto"
          className="w-full mt-3 p-3 border rounded"
          value={description}
          onChange={handleInputChange}
          name="description"
        />
      </div>
      <div className="my-5">
        <label
          htmlFor="date-expire"
          className="text-gray-400 block font-bold uppercase"
        >
          Fecha de entrega
        </label>
        <input
          id="date-expire"
          type="date"
          className="w-full mt-3 p-3 border rounded"
          value={dateExpire}
          onChange={handleInputChange}
          name="dateExpire"
        />
      </div>
      <div className="my-5">
        <label
          htmlFor="client"
          className="text-gray-400 block font-bold uppercase"
        >
          Nombre Cliente
        </label>
        <input
          id="client"
          type="text"
          placeholder="Nombre del cliente"
          className="w-full mt-3 p-3 border rounded"
          onChange={handleInputChange}
          value={client}
          name="client"
        />
      </div>
      <Button text={"actualizar/guardar"} />
    </form>
  );
};
