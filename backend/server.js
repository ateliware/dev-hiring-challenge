const express = require('express')
const cors = require('cors')

const routes = require('./routes');

const PORT = process.env.PORT || 3333
const app = express()

app.use(cors())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
