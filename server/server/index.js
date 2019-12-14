const express = require('express');
const app = express();

require('../config/express')(app);
require('../routes')(app);


module.exports = app;