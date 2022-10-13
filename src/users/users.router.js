const router = require('express').Router();
const userServices = require('./users.services')

//? Rutas raiz
router.get('/', userServices.getAllUsers)

//? Rutas dinamicas por ID
router.route('/:id')
    .get(userServices.getUserById)
    .patch(userServices.patchUser)
    .delete(userServices.deleteUser)

module.exports = router;