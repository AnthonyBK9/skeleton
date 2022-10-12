//? Dependencies
const express = require('express')

//? Files
const { port } = require('./config')
const db = require('./utils/database')

//? Initial Configs
const app = express()
app.use(express.json());

// ? Authenticate database credentials
db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch((err) => console.log(err))
//? Sync sequelize models
db.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.log(err))


app.get('/api/v1', (req, res) => {
    res.status(200).json({msg: 'OK!', users: `localhost:${port}/api/v1/users`});
})

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
})