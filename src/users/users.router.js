const router = require('express').Router();
const passport = require('passport')
const userServices = require('./users.services')
require('../middlewares/auth.middleware')(passport)

//? Rutas raiz
router.get('/', passport.authenticate('jwt', { session: false }), userServices.getAllUsers)

//? Ruta de información propia del usuario
router.route('/me')
    .get( passport.authenticate('jwt', { session: false }), userServices.getMyUser)
    .patch( passport.authenticate('jwt', { session: false }), userServices.patchMyUser)
    .delete( passport.authenticate('jwt', { session: false }),userServices.deleteMyUser )

//? Rutas dinamicas por ID
//* Ruta /api/v1/users
router.route('/:id')
    .get(userServices.getUserById)
    .patch(authenticate('jwt', { session: false }),userServices.patchUser)
    .delete(authenticate('jwt', { session: false }),userServices.deleteUser)
    
module.exports = router;