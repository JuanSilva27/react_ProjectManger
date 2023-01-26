module.exports = {
    list : async (req,res)=>{
        try {
            return res.status(201).json({
                ok: true,
                msg:"Lista de Tareas"
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
                msg:"Tareas guardada"
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
                msg:"Detalle de la Tarea"
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
                msg:"Tarea actualizada"
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
                msg:"Tarea eliminada"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    changeState : async (req,res)=>{
        try {
            return res.status(200).json({
                ok: true,
                msg:"Tarea Completada"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },
}