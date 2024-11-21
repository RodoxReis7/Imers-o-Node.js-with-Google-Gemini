import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts da coleção "posts" no banco de dados
export async function getTodosOsPosts() {
    // Obtém o banco de dados "imersao-instabyte"
    const db = conexao.db("imersao-instabyte");
    // Obtém a coleção "posts"
    const colecao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return colecao.find().toArray();
}