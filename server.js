import express from 'express';
import routes from './src/routes/postRoutes.js';

// Array de posts inicial (pode ser substituído por dados do banco de dados)
const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gato brincando com um novelo de lã",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 3,
        descricao: "Gatinho dormindo em uma caixa",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 4,
        descricao: "Gato curioso olhando pela janela",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 5,
        descricao: "Gato miau!",
        imagem: "https://placecats.com/millie/300/150"
    }
];

// Cria uma instância do Express.js
const app = express();


// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor Escutando...');
});


// function buscarPostPorId(id) {
//     return posts.findIndex((posts) => {
//         return posts.id === Number(id);
//     });
// };
// app.get('/posts/:id', (req, res) => {
//     const index = buscarPostPorId(req.params.id);
//     res.status(200).json(posts[index]);
// });