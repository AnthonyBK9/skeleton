//? Dependencies
const express = require('express')
//* Routes
const userRouter = require('./users/users.router')
//? Files
const { port } = require('./config')
const db = require('./utils/database')


//? Initial Configs
const app = express()
app.use(express.json());

db.authenticate() // ? Authenticate database credentials
    .then(() => console.log('Database authenticated'))
    .catch((err) => console.log(err))

db.sync() //? Sync sequelize models
    .then(() => console.log('Database synced'))
    .catch((err) => console.log(err))

app.use('/api/v1/users', userRouter)

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
})