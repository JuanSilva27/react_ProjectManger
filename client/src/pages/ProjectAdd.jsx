import React from "react";
import { FormProject } from "./FormProject";

export const ProjectAdd = () => {
  return (
    <>
      <h1 className="text-green-600 font-black text-3xl capitalize">Crear proyecto</h1>
      <div>
        <FormProject />
      </div>
    </>
  );
};
