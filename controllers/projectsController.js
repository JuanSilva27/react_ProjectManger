const createError = require("http-errors");
const Project = require("../database/models/Project");
const errorResponse = require("../helpers/errorResponse");
const ObjectId = require("mongoose").Types.ObjectId;


module.exports = {
  list: async (req, res) => {
    try {
      const projects = await Project.find()
        .where("createdBy")
        .equals(req.user._id);

      return res.status(201).json({
        ok: true,
        msg: "Lista de Proyectos",
        projects,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error en Projects-List",
      });
    }
  },

  store: async (req, res) => {
    try {
      const { name, description, client } = req.body;
      console.log(req.user)
      if (
        [name, description, client].includes("") ||
        !name ||
        !description ||
        !client
      ) {
        throw createError(400, "todos los campos son obligatorios");
      }

      if (!req.user) {
        throw createError(401, "Error de autenticacion");
      }

      const project = new Project(req.body);
      project.createdBy = req.user._id;
      const projectStrore = await project.save();

      console.log(project);

      return res.status(201).json({
        ok: true,
        msg: "Proyecto guardado",
        project: projectStrore,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error en store",
      });
    }
  },

  detail: async (req, res) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        throw createError(400, "No es un ID valido");
      }

      const project = await Project.findById(id).populate("tasks");

      if (!project) throw createError(404, "Projecto no encontrado");

      if (req.user._id.toString() !== project.createdBy.toString()) {
        throw createError(401, "No estas autorizado/a");
      }

      return res.status(200).json({
        ok: true,
        msg: "Detalle del Proyecto",
        project,
      });
    } catch (error) {
      errorResponse(res,error, "DETAIL-PROJECT")
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        throw createError(400, "No es un ID valido");
      }

      const project = await Project.findById(id);

      if (!project) throw createError(404, "Projecto no encontrado");

      if (req.user._id.toString() !== project.createdBy.toString()) {
        throw createError(401, "No estas autorizado/a");
      }

      const { name, description, client, dateExpire } = req.body;

      project.name = name || project.name;
      project.description = description || project.description;
      project.client = client || project.client;
      project.dateExpire = dateExpire || project.dateExpire;

      const projectUpdated = await project.save();

      return res.status(201).json({
        ok: true,
        msg: "Proyecto actualizado",
        project: projectUpdated,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error en Update",
      });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        throw createError(400, "No es un ID valido");
      }

      const project = await Project.findById(id);

      if (!project) throw createError(404, "Projecto no encontrado");

      if (req.user._id.toString() !== project.createdBy.toString()) {
        throw createError(401, "No estas autorizado/a");
      }

      await project.deleteOne()

      return res.status(200).json({
        ok: true,
        msg: "Proyecto eliminado",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error",
      });
    }
  },

  addCollaborator: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Colaborador Agregado",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error",
      });
    }
  },

  removeCollaborator: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Colaborador eliminado",
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Upss, hubo un error",
      });
    }
  },
};
