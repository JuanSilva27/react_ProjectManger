import React from "react";
import { Link } from "react-router-dom";

export const ProjectPreview = () => {
  return (
    <>
      <div className="my-5 mt-3 p-3 bg-gray-100 flex content-between ">
        <p>
          Nombre del proyecto
          <span>| Cliente</span>
        </p>
        <Link to={"/"}>Ver proyecto</Link>
      </div>
      <div className="my-5 mt-3 p-3 bg-gray-100 flex content-between ">
        <p>
          Nombre del proyecto
          <span>| Cliente</span>
        </p>
        <Link to={"/"}>Ver proyecto</Link>
      </div>
      <div className="my-5 mt-3 p-3 bg-gray-100 flex content-between ">
        <p>
          Nombre del proyecto
          <span>| Cliente</span>
        </p>
        <Link to={"/"}>Ver proyecto</Link>
      </div>
    </>
  );
};
