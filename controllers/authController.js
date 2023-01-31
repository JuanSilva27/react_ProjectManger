const createError = require('http-errors');
const User = require("../database/models/User")
const errorResponse = require("../helpers/errorResponse");
const generateJWT = require('../helpers/generateJWT');
const generateTokenRandom = require('../helpers/generateTokenRandom');
const { confirmRegister, frogotPassword } = require('../helpers/sendMail');
module.exports = {
    register : async (req,res)=>{
        try {

            const {name, email, password} = req.body
            
            if([name,email,password].includes("")){
                throw createError(400,"Todos los campos son obligatorios")
            }

            let user = await User.findOne({
                email
            })

            if(user){
                throw createError(400, "El email ya se encuentra registrado")
            }

            const token = generateTokenRandom()

            user = new User(req.body)
            user.token = token
            
            const userStore = await user.save()
            
            await confirmRegister({
                name: userStore.name,
                email: userStore.email,
                token: userStore.token
            })

            return res.status(201).json({
                ok: true,
                msg:"Usuario Registrado",
                data: userStore,
            })
        } catch (error) {
            return errorResponse(res, error, "Register")
        }

    },

    login : async (req,res)=>{
        const {email, password} = req.body
        try {
            
            if([email,password].includes("")){
                throw createError(400,"Todos los campos son obligatorios")
            }

            let user = await User.findOne({
                email
            })

            if(!user){
                throw createError(404, "Credenciales invalidas || EMAIL")
            }

            if(!user.checked){
                throw createError(403, "Tu cuenta no a sido confirmada")
            }

            if(!await user.checkedPassword(password)){
                throw createError(403, "Credenciales invalidas || PASSWORD")
            }

            return res.status(200).json({
                ok: true,
                msg:"Usuario Loguedo",
                user : {
                    nombre : user.name,
                    email : user.email,
                    token: generateJWT({
                        id: user._id
                    })
                }
            })
        } catch (error) {
           return errorResponse(res, error, "LOGIN")
        }

    },

    checked : async (req,res)=>{

        const {token} = req.query //http://localhost:4000/api/auth/cheked?token=sasasasdasdasd
        try {
            
            if(!token){
                throw createError(400, "Token inexistente")
            }

            const user = await User.findOne({
                token
            })

            if(!user){
                throw createError(400, "Token invalido")
            }

            user.checked = true;
            user.token = "";

            await user.save()

            return res.status(201).json({
                ok: true,
                msg:"Registro completado exitosamente"
            })

        } catch (error) {
            return errorResponse(res, error, "CHECKED")
        }

    },

    sendToken : async (req,res)=>{
        
        const {email} = req.body

        try {

            let user = await User.findOne({
                email
            })

            if(!user){
                throw createError(400, "Email incorrecto")
            }
            
            const token = generateTokenRandom()
            
            user.token = token
            await user.save();

            await frogotPassword({
                name: user.name,
                email: user.email,
                token: user.token
            })

            return res.status(200).json({
                ok: true,
                msg:"Se a enviado un Mail con las Intrucciones"
            })
        } catch (error) {
            errorResponse(res, error, "SENDTOKEN")
        }

    },

    verifyToken : async (req,res)=>{
        try {
            const {token} = req.query;

            if(!token) throw createError(400,"No hay token en la petición");

            const user = await User.findOne({
                token
            });

            if(!user) throw createError(400,"Token inválido");

            return res.status(200).json({
                ok: true,
                msg:"Token verificado"
            })
        } catch (error) {
            return errorResponse(res,error, "VERIFY-TOKEN")
        }

    },

    changePassword : async (req,res)=>{
        try {

            const {token} = req.query
            const {password} = req.body

            if(!password) throw createError(400,"El password es obligatorio")

            const user = await User.findOne({
                token
            })

            user.password = password;
            user.token = "";
            await user.save();

            return res.status(200).json({
                ok: true,
                msg:"Password actualizada"
            })
        } catch (error) {
            return errorResponse(res,error, "CHANGE-PASSWORD")

        }

    },

    
}