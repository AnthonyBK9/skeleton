const jwt = require('jsonwebtoken')
const { loginUser, confirmByUser, forgotPasswordByUser, resetPasswordByUser } = require('./auth.controller')
const { jwtSecret } = require('../config')
const { getUserByEmail, getUserByToken } = require('../users/users.controllers')


const login = (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({msg: 'Missing Data'})
    getUserByEmail(email)
        .then(data => {
            if (!data.dataValues.isVerified) {
                res.status(400).json({msg: 'Usuario no confirmado, favor de validar su cuenta'})
            } else {
                loginUser(email, password)
                    .then(response => {
                        if (response) {
                            const token = jwt.sign({ //? Generamos el token con la siguiente información id, email y role
                                id: response.id,
                                email: response.email,
                                role: response.role
                            }, jwtSecret, {  expiresIn: '7d', })
                            res.status(200).json({msg: 'Correct Credentilas', token})
                        }else {
                            res.status(401).json({msg: 'Invalid Credentials'})
                        }
                    })
                    .catch(err => {
                        res.status(400).json({message: err.message})
                    })
            }
        })    
}

const confirm = (req, res) => {
    const token = req.params.token
    getUserByToken(token) //? Realiza una busque por el token del usuario
        .then(data => {
            if(data){
                res.status(200).json('Usuario confirmado correctamente') 
                confirmByUser(token) //? Si es correcto se actualiza isVerified a true
            } else {
                res.status(400).json({msg: 'Token no valido'}) //? En caso de no encontrarlo lanza un error de token no valido
            }
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

const forgotPassword = (req, res) => {
    const email = req.body.email
    if (!email) return res.status(400).json({msg: 'Missing Data'})
    getUserByEmail(email) //? Se envie el email para validar si existe en ls BD
        .then(data => {
            if (data){
                res.status(200).json({msg: 'Hemos enviado un email con las instrucciones'})
                forgotPasswordByUser(email) 

            } else {
                res.status(404).json({msg: 'Usuario no registrado'})
            }
        })
        .catch( err => {
            res.status(400).json({msg: err.message})
        })
        
}

const newPassword = (req, res) => {
    const password = req.body.password
    const token = req.params.token
    if (!password) res.status(400).json({msg: 'Missing password'})
        getUserByToken(token) //? Se envia el Token para cambio de contraseña
            .then(data => {
                if (data) {
                    res.status(200).json({msg: 'Password actualizado correctamente'})
                    resetPasswordByUser(token, password)
                } else {
                    res.status(400).json({msg: 'Token Invalido'})
                }
            })
}

module.exports = {
    login,
    confirm,
    forgotPassword,
    newPassword
} 