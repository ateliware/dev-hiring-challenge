/**
 * Main application routes
 */
'use strict';

module.exports = function (app) {
    app.use('/api/repository', require('../api/repository'));    
    app.use('/api/github', require('../api/github')); 
};