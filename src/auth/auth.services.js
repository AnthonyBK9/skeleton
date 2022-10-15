const jwt = require('jsonwebtoken')
const  loginUser  = require('./auth.controller')

const login = (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({msg: 'Missing Data'})
    
    loginUser(email, password)
        .then(response => {
            if (response) {
                const token = jwt.sign({ //? Generamos el token con la siguiente información id, email y role
                    id: response.id,
                    email: response.email,
                    role: response.role
                }, 'antoniodev', {  expiresIn: '7d', })
                res.status(200).json({msg: 'Correct Credentilas', token})
            }else {
                res.status(401).json({msg: 'Invalid Credentials'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

module.exports = login 