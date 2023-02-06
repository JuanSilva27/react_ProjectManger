import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="bg-white-500 h-screen w-3/12 lg:w-3/12 flex flex-col">
      <p className="py-4 px-6 w-full">Hola: Nombre de usuario</p>
      <Link to="create-project" className="bg-green-600 rounded text-center  py-3 px-5 w-full">Nuevo proyecto</Link>
    </aside>
  );
};
