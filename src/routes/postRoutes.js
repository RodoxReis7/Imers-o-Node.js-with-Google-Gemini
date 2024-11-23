import express from "express";
import { listarPosts, postarNovoPost } from '../controllers/postsController.js';

const routes = (app) => {
    // Permite que o servidor interprete corpos de requisições no formato JSON
    app.use(express.json());
  
    // Rota para recuperar uma lista de todos os posts
    app.get("/posts", listarPosts); // Chama a função controladora apropriada
  
    // Rota para criar um novo post
    app.post("/posts", postarNovoPost); // Chama a função controladora para criação de posts
  
}

export default routes;