//importações principais e variáveis de ambiente
//vai disponibilidade o uso de variáveis de ambiente
require("dotenv").config();
const express = require("express");

//PARA ACESSAR ALGO NO ARQUIVO .ENV
// console.log(process.env.NOME_VARIAVEL);

//configuração do APP
const app = express();  
app.use(express.json()); //possibilita transitar dados usando json

//confirguração do BD
const { connection, authenticate } = require("./database/database");
authenticate(connection);
const Cliente = require("./database/cliente");
const Endereco = require("./database/endereco");

//definição de rotas

// GET (/clientes) => Listagem de todos os clientes
app.get("/clientes", async (req, res)=>{
    //select * from clientes;
    const listaClientes = await Cliente.findAll();
    res.json(listaClientes);
});

app.get("/clientes/:id", async (req, res)=>{
    //select * from clientes where id = 5;
    const cliente = await Cliente.findOne({ //findOne busca somente 1 resgitro
        where: {id: req.params.id}, 
        include: [Endereco]
    }); 
    if(cliente){
        res.json(cliente);
    }else{
        res.status(404).json({message: "Usuário não encontrado!"})
    }
});

// POST (/clientes) => Inserir cliente novo
app.post("/clientes", async (req, res)=>{
    //coletar os dados do req.body
    const {nome, email, telefone, endereco} = req.body;
    // console.log(nome, email, telefone);
    try {
        //
        const novo = await Cliente.create({nome, email, telefone, endereco}, 
            {include:[Endereco]});
        res.status(201).json(novo);
    } catch (err) {
        console.log("Um erro inesperado aconteceu", err);
        res.status(500).json({message: "Aconteceu um erro."})
    }
});

// PUT (/clientes) => Atualizar cliente existente
// DELETE (/clientes) => Apagar cliente existente

// Escuta de eventos (listen)
app.listen(3000, () => {
    //pega o arquivo feito para gerar as tabelas
    //force - apaga tudo e recria as tabelas
    connection.sync({force:true});
    console.log("Servidor rodando em http://localhost:3000");
});

