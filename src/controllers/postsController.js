import { getTodosOsPosts, criarPost, atualizarPost } from "../models/postModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Importa as funções para obter todos os posts e criar um novo post do módulo de modelos
// de posts. Também importa o módulo fs para realizar operações com o sistema de arquivos.

export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados (ou outra fonte de dados)
  const posts = await getTodosOsPosts();
  // Envia os posts como resposta em formato JSON com status 200 (sucesso)
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  // Extrai as informações do novo post do corpo da requisição
  const novoPost = req.body;
  // Tenta criar um novo post no banco de dados
  try {
    const postCriado = await criarPost(novoPost);
    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, registra o erro no console e envia uma resposta com status 500
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}

export async function uploadImagem(req, res) {
  // Cria um objeto com as informações básicas do novo post, incluindo o nome do arquivo da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };
  // Tenta criar um novo post e renomear a imagem
  try {
    const postCriado = await criarPost(novoPost);
    // Cria um novo nome para a imagem, utilizando o ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, registra o erro no console e envia uma resposta com status 500
    console.error(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}

export async function atualizarNovoPost(req, res) {
    // Extrai as informações do novo post do corpo da requisição
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    // Tenta criar um novo post no banco de dados
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl : urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
      const postCriado = await atualizarPost(id, post);
      // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
      
      res.status(200).json(postCriado);
    } catch (erro) {
      // Caso ocorra um erro, registra o erro no console e envia uma resposta com status 500
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"});
    }
  }