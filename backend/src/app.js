
const express = require('express');
//const repoController = require('./controllers/repoController')
require('express-async-errors')
const cors = require('cors')
const helmet = require('helmet')


const app = express();
app.use(cors({origin: process.env.CORS_ORIGEM}))
app.use(helmet())

/*backend vai receber JSON */
app.use(express.json())

/* processamento */

const repoRouters = require('./routers/repoRouter')
app.use('/repo', repoRouters)
module.exports = app;