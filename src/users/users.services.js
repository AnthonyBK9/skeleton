const userControllers = require('./users.controllers')

//? Obtener la respuesta de todos los usuarios
const getAllUsers = (req, res) => {
    userControllers.getAllUsers()
        .then( response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(400).json({msg: err.message});
        })
}
//? obtener un solo usuario
const getUserById = (req, res) => {
    const id = req.params.id;
    userControllers.getUserById(id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch( err => {
            res.status(404).json({msg: err.message});
        })
}

const registerUser = (req, res) => {
    const { firstName, lastName, email, password, phone, birthday , gender, country } = req.body;    
    if (firstName && lastName && email && password && phone && birthday ) {
        //? Ejecutamos el controller
        userControllers.createUser({ firstName, lastName, email, password, phone, birthday , gender, country })
            .then( data => {
                res.status(201).json(data)
            })
            .catch( err => {
                res.status(400).json({msg: err.message});
            })
    } else {
        //? Error cuando no mandan todos lo datos necesarios para crear un usuario
        res.status(400).json({msg: 'All fields must be completed', fields: {
            firstName: 'String',
            lastName: 'String',
            email: 'example@example.com',
            password: 'string',
            phone: '+522784563452',
            birthday: 'YYYY/MM/DD'
        }})
    }
}

//? Actualiza un usuario con los datos necesarios
const patchUser = (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, phone , gender, country } = req.body;
    userControllers.updateUser(id,  { firstName, lastName, phone , gender, country })
        .then(data => {
            if (data[0]) {
                res.status(200).json({msg: `User whit the id: ${id}, edited succesfully!`})
            } else {
                res.status(400).json({msg: 'Invalid ID'})
            }
        })
        .catch( err => { 
            res.status(400).json({msg: err.message});
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    userControllers.deleteUser(id)
        .then(data => {
            if(data) {
                res.status(204).json()
            } else {
                res.status(400).json({msg: 'Invalid ID'})
            }
        })
        .catch( err => {
            res.status(400).json({msg: err.message});
        })
}

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    patchUser,
    deleteUser
}