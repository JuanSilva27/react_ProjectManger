import React from "react";

export const Task = ({name, description, dateExpire, priority}) => {

  let bgTask  
  if(priority === "Baja"){
    bgTask = "bg-green-400"
  }
  
  if(priority === "Media"){
    bgTask = "bg-yellow-400"
  }

  if(priority === "Alta"){
    bgTask = "bg-red-400"
  }


  return (
    <div className={`flex justify-between ${bgTask ? bgTask : "bg-white" } p-5 mb-5 shadow-md`}>
      <div>
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-xl">{dateExpire.split("T")[0]}</p>
        <p className="mb-1 text-gray-600">{priority}</p>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start gap-2">
        <button className="bg-indigo-600 p-2 text-white uppercase font-bold text-sm rounded-lg">
          Editar
        </button>

        {false ? (
          <button className="bg-sky-600 p-2 text-white uppercase font-bold text-sm rounded-lg">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 p-2 text-white uppercase font-bold text-sm rounded-lg">
            Incompleta
          </button>
        )}

        <button className="bg-red-600 p-2 text-white uppercase font-bold text-sm rounded-lg">
          Eliminar
        </button>
      </div>
    </div>
  );
};