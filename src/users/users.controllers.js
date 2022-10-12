const User = require('../models/users.models')

const getAllUsers = async () => {
    const data = await User.findAll();
    return data;
}

const getUserById = async (id) => {
    const data = await User.findOne({
        where: {
            id
        }
    });
    return data;
}

