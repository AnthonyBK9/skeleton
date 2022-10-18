//? Dependencies
const express = require('express');
//* Routes
const userRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');
//? Files
const { port } = require('./config');
const initModels = require('./models/initModels')
const db = require('./utils/database');

//? Initial Configs
const app = express();
app.use(express.json());

db.authenticate() // ? Authenticate database credentials
    .then(() => console.log('Database authenticated'))
    .catch((err) => console.log(err))

db.sync() //? Sync sequelize models
    .then(() => console.log('Database synced'))
    .catch((err) => console.log(err))

initModels()

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

app.get('/', (req, res) => {
    res.status(200).json({msg: 'OK'})
});

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});