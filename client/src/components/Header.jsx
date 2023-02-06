import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="fixed top-0 left-0 bg-white w-full shadow">
      <div className="container m-auto flex justify-between items-center text-gray-700">
        <h2 className="pl-8 py-4 text-xl font-bold text-green-600">Projects Manager</h2>
        <input type="text" placeholder="Buscar proyecto..." className="mt-3 mb-3 p-3 border rounded" />
        <div className="md:flex items-center pr-10 text-base font-semibold cursor-pointer">
          <Link to="/projects" className="hover:bg-gray-200 py-4 px-6">Proyectos</Link>
          <button
            type="button"
            className="hover:bg-gray-200 py-4 px-6"
            /* onClick={closeSession} */
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
