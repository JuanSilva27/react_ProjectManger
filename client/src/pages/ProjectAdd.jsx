import React from "react";
import { FormProject } from "../components/FormProject";

export const ProjectAdd = () => {
  return (
    <>
      <h1 className="text-green-600 font-black text-4xl capitalize">Crear proyecto</h1>
      <div className='mt-10 flex justify-center'>
        <FormProject />
      </div>
    </>
  );
};
