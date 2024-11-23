import conectarAoBanco from "../config/dbConfig.js";

// Importa a função `conectarAoBanco` do arquivo `dbConfig.js`, responsável por estabelecer a conexão com o banco de dados.

// Conecta ao banco de dados MongoDB usando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Estabelece a conexão com o banco de dados MongoDB utilizando a string de conexão obtida da variável de ambiente.
// A função `conectarAoBanco` retorna uma promise que é resolvida com o objeto de conexão.

// Função assíncrona para buscar todos os posts da coleção "posts" no banco de dados
export async function getTodosOsPosts() {
  // Obtém o banco de dados "imersao-instabyte" a partir da conexão estabelecida
  const db = conexao.db("imersao-instabyte");
  // Obtém a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Executa uma operação de busca em toda a coleção "posts" e retorna todos os documentos em forma de array
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
  // Obtém o banco de dados "imersao-instabyte" a partir da conexão estabelecida
  const db = conexao.db("imersao-instabyte");
  // Obtém a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Insere um novo documento (post) na coleção "posts" e retorna um objeto que representa o resultado da operação
  return colecao.insertOne(novoPost);
}