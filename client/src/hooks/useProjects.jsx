import React, { useContext } from 'react'
import ProjectContext from '../context/ProjectProvaider'

export const useProjects = () => {
  return useContext(ProjectContext)
}

export default useProjects
