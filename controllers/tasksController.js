const createError = require("http-errors");
const Project = require("../database/models/Project");
const Task = require("../database/models/Task");
const errorResponse = require("../helpers/errorResponse");

module.exports = {
  list: async (req, res) => {
    try {
      return res.status(201).json({
        ok: true,
        msg: "Lista de Tareas",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error",
      });
    }
  },

  store: async (req, res) => {
    const { name, description, priority, project: projectId } = req.body;
    try {
      if (
        [name, description, priority].includes("") ||
        !name ||
        !description ||
        !priority
      )
        throw createError(400, "Todos los campos son obligatorios");

      const project = await Project.findById(projectId);

      if (req.user._id.toString() !== project.createdBy.toString())
        throw createError(403, "No estás autorizado");

      const taskStore = await Task.create(req.body);
      project.tasks.push(taskStore._id);
      await project.save();

      return res.status(201).json({
        ok: true,
        msg: "Tarea guardada con exito",
        task: taskStore,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "STORE-TASK");
    }
  },

  detail: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Detalle de la Tarea",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error",
      });
    }
  },

  update: async (req, res) => {
    try {
      return res.status(201).json({
        ok: true,
        msg: "Tarea actualizada",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error",
      });
    }
  },

  remove: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Tarea eliminada",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error",
      });
    }
  },

  changeState: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Tarea Completada",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error",
      });
    }
  },
};
