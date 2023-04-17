const {DataTypes} = require("sequelize");
const {connection} = require("./database");

const Endereco = connection.define("endereco", {
    uf:{
        type: DataTypes.STRING(2),
        allowNull: false,
    },
    cidade:{
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    cep:{
        type: DataTypes.STRING(150),
            allowNull: false,
    },
    rua:{
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    numero:{
        type: DataTypes.STRING(150),
        allowNull: false,
    }
});

module.exports = Endereco;