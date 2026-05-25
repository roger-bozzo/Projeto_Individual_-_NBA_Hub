var database = require("../database/config");

function getMetricas() {
    var instrucaoSql = `
        SELECT
            (SELECT COUNT(*) FROM usuario) AS totalUsuarios,
            (SELECT COUNT(*) FROM quiz_resultado) AS totalQuizzes,
            (SELECT COALESCE(AVG((acertos / total) * 100), 0) FROM quiz_resultado) AS aproveitamentoMedio,
            (SELECT COUNT(*) FROM pesquisa_resposta) AS totalPesquisas;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql).then(function (resultado) {
        return resultado[0];
    });
}

function getRanking() {
    var instrucaoSql = `
        SELECT u.nome, MAX(qr.acertos) AS acertos, qr.total
        FROM quiz_resultado qr
        JOIN usuario u ON u.id = qr.fk_usuario
        GROUP BY qr.fk_usuario, u.nome, qr.total
        ORDER BY acertos DESC
        LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getDistribuicaoNotas() {
    var instrucaoSql = `
        SELECT acertos AS faixa, COUNT(*) AS quantidade
        FROM quiz_resultado
        GROUP BY acertos
        ORDER BY acertos ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getTimesFavoritos() {
    var instrucaoSql = `
        SELECT time_favorito AS time, COUNT(*) AS votos
        FROM pesquisa_resposta
        WHERE time_favorito IS NOT NULL
        GROUP BY time_favorito
        ORDER BY votos DESC
        LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getJogadoresFavoritos() {
    var instrucaoSql = `
        SELECT jogador_favorito AS jogador, COUNT(*) AS votos
        FROM pesquisa_resposta
        WHERE jogador_favorito IS NOT NULL
        GROUP BY jogador_favorito
        ORDER BY votos DESC
        LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getPerguntas() {
    var instrucaoSql = `
        SELECT
            qp.pergunta,
            ROUND(
                SUM(CASE WHEN qr.acertos > 0 THEN 1 ELSE 0 END) * 100.0 / COUNT(*),
                1
            ) AS taxaAcerto
        FROM quiz_pergunta qp
        LEFT JOIN quiz_resultado qr ON qr.fk_usuario IS NOT NULL
        GROUP BY qp.id, qp.pergunta
        ORDER BY qp.id ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { 
    getMetricas, 
    getRanking, 
    getDistribuicaoNotas, 
    getTimesFavoritos, 
    getJogadoresFavoritos, 
    getPerguntas 
}