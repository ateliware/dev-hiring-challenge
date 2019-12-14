'use strict';

module.exports = {

  ip: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,


  port: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    3000,
};