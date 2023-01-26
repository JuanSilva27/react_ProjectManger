module.exports = {
    list : async (req,res)=>{
        try {
            return res.status(201).json({
                ok: true,
                msg:"Lista de Proyectos"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    store : async (req,res)=>{
        try {
            return res.status(201).json({
                ok: true,
                msg:"Proyecto guardado"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    detail : async (req,res)=>{
        try {
            return res.status(200).json({
                ok: true,
                msg:"Detalle del Proyecto"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    update : async (req,res)=>{
        try {
            return res.status(201).json({
                ok: true,
                msg:"Proyecto actualizado"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    remove : async (req,res)=>{
        try {
            return res.status(200).json({
                ok: true,
                msg:"Proyecto eliminado"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    addCollaborator : async (req,res)=>{
        try {
            return res.status(200).json({
                ok: true,
                msg:"Colaborador Agregado"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    removeCollaborator : async (req,res)=>{
        try {
            return res.status(200).json({
                ok: true,
                msg:"Colaborador eliminado"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    
}