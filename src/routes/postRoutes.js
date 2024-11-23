import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from '../controllers/postsController.js';

// Configura o armazenamento de arquivos enviados pelo usuário
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo no servidor
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads" , storage });

const routes = (app) => {
  // Permite que o servidor interprete corpos de requisições no formato JSON
  app.use(express.json());

  // Rota para recuperar uma lista de todos os posts
  app.get("/posts", listarPosts); // Chama a função controladora para listar posts

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost); // Chama a função controladora para criar novos posts

  // Rota para fazer upload de uma imagem
  app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função controladora para lidar com o upload da imagem
};

export default routes;