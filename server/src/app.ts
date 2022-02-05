require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import { createConnection } from 'typeorm'
import cors from 'cors'

import IndexRouter from './routes'

const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

app.use('/', IndexRouter)

app.listen(process.env.SERVER_PORT, async () => {
  const db_connection = await createConnection()
  if (db_connection) console.log('Server connected to database ' + db_connection.driver.database)
  console.log('Listening on PORT ' + process.env.SERVER_PORT)
})

export default app