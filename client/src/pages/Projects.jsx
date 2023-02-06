import React from "react";
import { ProjectPreview } from "../components/ProjectPreview";

export const Projects = () => {
  return (
    <>
      <h1 className="pl-8 py-4 text-xl font-bold text-green-600">Proyectos</h1>
      <div className="my-10 p-8 bg-white rounded-lg border shadow-lg">
        <ProjectPreview />
      </div>
    </>
  );
};
