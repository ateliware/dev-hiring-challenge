'use strict';

var path = require('path');
var _ = require('lodash');

var all = {
    env: process.env.NODE_ENV,

    root: path.normalize(__dirname + '/../../..'),


    port: process.env.PORT || 80,


    ip: process.env.IP || '0.0.0.0',
};

module.exports = _.extend(all, require('./' + process.env.NODE_ENV + '.js') || {});