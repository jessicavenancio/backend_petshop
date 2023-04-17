//modelo para gerar tablea de clientes
//Mapeamento: cada propriedade vira uma coluna da tabela


//ele vai mapear e passar tipo da coluna
const {DataTypes} = require("sequelize");

//conexã com o BD
const {connection} = require("./database");

//primeiro coloca o nome da tabela e segundo parâmento nome das colunas
const Cliente = connection.define("cliente", {  
    //configurar a coluna
        nome: { //nome varchar not null
            type: DataTypes.STRING(150),
            allowNull: false, //not null - não permite valores nulo nesse caso para nome
        },
        email:{// email varchar not null unique
            type : DataTypes.STRING(150),
            allowNull: false,
            unique: true
        }, //telefone string not null 
        telefone:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    //relacionar dados no seguelize https://sequelize.org/docs/v6/core-concepts/model-basics/
    //associação 1:1 (one-to-one), define o relacionamento
    const Endereco = require("./endereco");//importa endereço
    //endereço ganha uma chave estrangeira (nome do model + id)
    Cliente.hasOne(Endereco); //o cliente tem  endereço (quem está no hasOne que recebe a chave estrangeira)
    Endereco.belongsTo(Cliente);//endereço pertence a um cliente


    module.exports = Cliente;