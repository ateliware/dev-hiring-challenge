const express = require('express')
const cors = require('cors')

const app = express()

var corsOptions = {
    origin: 'http://localhost:8081'
    // origin: 'https://epic-kowalevski-50ba5f.netlify.app'
}

app.use(cors(corsOptions))

//parse requests od content-type - application/json and application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require('./app/models')
db.sequelize.sync()

// For developing, use the code below. May need to drop existing tables and re-sync database.
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// })

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the application" })
})

require("./app/routes/repository.routes")(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})