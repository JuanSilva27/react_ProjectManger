import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className=" top-0 left-0 bg-white w-full shadow">
      <div className="container m-auto flex justify-between items-center text-gray-700">
        <h2 className="pl-8 py-4 text-xl font-bold text-green-600">
          Projects Manager
        </h2>
        <input
          type="text"
          placeholder="Buscar proyecto..."
          className="mt-3 mb-3 p-3 border rounded"
        />
        <div className="hidden md:flex items-center pr-10 text-base font-semibold cursor-pointer">
          <Link to="/projects" className="hover:bg-gray-200 py-4 px-6">
            Proyectos
          </Link>
          <button
            type="button"
            className="hover:bg-gray-200 py-4 px-6"
            /* onClick={closeSession} */
          >
            Cerrar sesión
          </button>
        </div>

        <button className="block md:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-gray-200 group">
          <div className="w-5 h-1 bg-gray-600 mb-1"></div>
          <div className="w-5 h-1 bg-gray-600 mb-1"></div>
          <div className="w-5 h-1 bg-gray-600"></div>
          <div className="absolute top-0 -right-full h-screen w-8/12 bg-white border-opacity-0 group-focus:right-0 group-focus:opacity-100 transition-all duration-300">
            <div className="flex flex-col items-center w-full text-base cursor-pointer pt-10">
              <Link
                to="/projects"
                className="hover:bg-gray-200 py-4 px-6 w-full"
              >
                Proyectos
              </Link>
              <button
                type="button"
                className="hover:bg-gray-200 py-4 px-6 w-full"
                /* onClick={closeSession} */
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
