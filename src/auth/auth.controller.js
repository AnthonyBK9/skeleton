
const { getUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')

//* Email y Password del usuario

//? Email es único en la base de datos
const loginUser = async (email, password) => {
    //* Este controllador tiene 2 posibles respuestas  1.- Las credenciales son válidad y retornamos el usuario  2.- las credenciales con invalidad y retornamos false
    try {
        const user = await getUserByEmail(email)
        //? user.password contiene la contraseña encriptada de mi base de datos
        const verifiedPassword = comparePassword(password, user.password)
        if (verifiedPassword) {
            return user
        }
         return false
    } catch (error) {
        return error
    }
}

const passwordRecovery = async () => {

}

module.exports = loginUser

