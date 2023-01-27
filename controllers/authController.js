module.exports = {
    register : async (req,res)=>{
        try {

            const {name, email, password} = req.body
            if([name,email,password].includes("")){
                let error = new Error("Todos los campos son Obligatorios");
                error.status = 400;
                throw error
            }
            return res.status(201).json({
                ok: true,
                msg:"Usuario Registrado"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    login : async (req,res)=>{
        try {
            return res.status(200).json({
                ok: true,
                msg:"Usuario Loguedo"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    checked : async (req,res)=>{
        try {
            return res.status(200).json({
                ok: true,
                msg:"Usuario Checkeado"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    sendToken : async (req,res)=>{
        try {
            return res.status(200).json({
                ok: true,
                msg:"Token enviado"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    verifyToken : async (req,res)=>{
        try {
            return res.status(200).json({
                ok: true,
                msg:"Token verificado"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    changePassword : async (req,res)=>{
        try {
            return res.status(200).json({
                ok: true,
                msg:"Password actualizada"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok:false,
                msg: error.message || "Upss, hubo un error"
            })
        }

    },

    
}