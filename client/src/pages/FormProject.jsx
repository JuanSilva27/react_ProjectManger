import { Button } from "../components/Button";

export const FormProject = () => {
  return (
    <form
      /* onSubmit={} */
      className="my-10 p-8 bg-white rounded-lg border shadow-lg"
    >
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
        />
      </div>
      <div className="my-5">
        <label
          htmlFor="date-expire"
          className="text-gray-400 block font-bold uppercase"
        >
          Fecha de entrega
        </label>
        <input id="date-expire" type="date" className="w-full mt-3 p-3 border rounded" />
      </div>
      <div className="my-5">
        <label htmlFor="client" className="text-gray-400 block font-bold uppercase">Nombre Cliente</label>
        <input
          id="client"
          type="text"
          placeholder="Nombre del cliente"
          className="w-full mt-3 p-3 border rounded"
        />
      </div>
      <Button text={"actualizar/guardar"}/>
    </form>
  );
};
