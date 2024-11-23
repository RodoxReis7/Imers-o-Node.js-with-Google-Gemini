import { getTodosOsPosts } from "../models/postModels.js";

export async function listarPosts(req, res) {
    // Chama a função para buscar os posts e armazena o resultado
    const posts = await getTodosOsPosts();
    // Envia os posts como resposta JSON com status 200 (sucesso)
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}