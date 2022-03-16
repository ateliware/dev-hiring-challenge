// Express setup
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const routes = require('./routes/index');
app.use(routes);

require("./base/pg");

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});