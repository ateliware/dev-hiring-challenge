const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));
app.listenh(process.env.PORT || 8080);

// PathLocationStrategy

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})

console.log('Server running!')
