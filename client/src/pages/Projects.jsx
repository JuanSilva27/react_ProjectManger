import React, { useEffect } from "react";
import { ProjectPreview } from "../components/ProjectPreview";
import useProjects from "../hooks/useProjects";

export const Projects = () => {
  const { loading, alert, projects, getProjects } = useProjects;

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <h1 className="pl-8 py-4 text-xl font-bold text-green-600">Proyectos</h1>
      <div className="bg-white p-5 shadow mt-10 rounded-md">
        {loading ? (
          <p>Cargando...</p>
        ) : projects.length ? (
          projects.map((project) => <ProjectPreview key={project} />)
        ) : (
          <p>No hay proyectos agregados</p>
        )}
      </div>
    </>
  );
};

/* 
import React from 'react'
import { ProjectPreview } from '../components/ProjectPreview'

export const Projects = () => {
  const projects = [1,2]
  return (
    <>
    <h1
     className='text-4xl font-black'
    >
      Proyectos
    </h1>
    <div
     className='bg-white p-5 shadow mt-10 rounded-md'
    >
      {
        projects.length
        ?
        projects.map(project => <ProjectPreview key={project}/>)
        :
        <p>No hay proyectos agregados</p>
      
      }
    </div>
    </>
  )
}

*/
