const Sequelize = require("sequelize");
const connection = require("../../database/database");
const Record = require("../record/Record");

const File = connection.define('files', {
    fileName:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//File.sync({ force:true });

module.exports = File;