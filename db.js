const mysql = require('mysql');
const mysqlSettings = require('./dbsettings.js');

function connectDatabase(settings) {
  this.connection = null
  this.settings = settings;
}
connectDatabase.prototype.createConnection = function(){
  this.connection = mysql.createConnection(this.settings);
  return this.connection
}

module.exports = new connectDatabase(mysqlSettings)
