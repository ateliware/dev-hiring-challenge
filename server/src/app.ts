require('dotenv').config()
import express from 'express'
import morgan from 'morgan'

import IndexRouter from './routes'
const app = express()

app.use(express.json())
app.use(morgan('combined'))

app.use('/', IndexRouter)

app.listen(process.env.SERVER_PORT, () => console.log('Listening on PORT ' + process.env.SERVER_PORT))

export default app