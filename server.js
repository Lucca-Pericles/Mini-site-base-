const express = require('express');
const path = require('path');
const fs = require('fs');


// Pré-config
info = [];
carrinho = [];

const produtos = JSON.parse(fs.readFileSync('./produtos.json'));

app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());



//APIs 
app.post("/cadastro", (req, res) => {
    const { nome, email, senha } = req.body;
    info.push(req.body);


    console.log("Usuários cadastrados: ", info);

    if(email&&senha){
        //redireciona para a tela login
        res.redirect("/login.html");

    }
});



app.post("/log", (req, res) => {
    const { email, senha } = req.body;
    const usuario = info.find(
        user => user.email === email 
        && user.senha === senha);
        

    if (usuario) {
        //redireciona para a tela home
        res.redirect("/inicial.html")
    } else {
        res.send(`
            <h1>Usuário não encontrado!</h1>
        `);
    }


});



app.get("/produtos", (req, res) => {
    res.json(produtos);
})

app.post("/carrinho", (req, res) => {
    carrinho.push(req.body);
    res.json({
        mensagem: "Item adicionado",
        carrinho
    })

});



app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});