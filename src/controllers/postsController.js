import { getTodosOsPosts } from "../models/postModels.js";

export async function listarPosts(req, res) {
    // Chama a função para buscar os posts e armazena o resultado
    const posts = await getTodosOsPosts();
    // Envia os posts como resposta JSON com status 200 (sucesso)
    res.status(200).json(posts);
}