var database = require("../database/config");

// Retorna todas as perguntas do quiz
function listarPerguntas() {
    var instrucaoSql = `
        SELECT id, pergunta, opcao_a, opcao_b, opcao_c, opcao_d
        FROM quiz_pergunta;
    `;
    return database.executar(instrucaoSql);
}

// Salva o resultado do quiz de um usuário
function salvarResultado(fkUsuario, acertos, total) {
    var instrucaoSql = `
        INSERT INTO quiz_resultado (fk_usuario, acertos, total)
        VALUES ('${fkUsuario}', '${acertos}', '${total}');
    `;
    console.log("SQL salvar resultado:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Para o dashboard: média de acertos de todos os usuários
function mediaAcertos() {
    var instrucaoSql = `
        SELECT
            u.nome,
            qr.acertos,
            qr.total,
            ROUND((qr.acertos / qr.total) * 100, 1) AS percentual,
            qr.feito_em
        FROM quiz_resultado qr
        JOIN usuario u ON qr.fk_usuario = u.id
        ORDER BY qr.feito_em DESC;
    `;
    return database.executar(instrucaoSql);
}

// Para o dashboard: placar geral
function rankingQuiz() {
    var instrucaoSql = `
        SELECT
            u.nome,
            MAX(qr.acertos) AS melhor_pontuacao,
            COUNT(qr.id)    AS vezes_jogado
        FROM quiz_resultado qr
        JOIN usuario u ON qr.fk_usuario = u.id
        GROUP BY u.id, u.nome
        ORDER BY melhor_pontuacao DESC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = { listarPerguntas, salvarResultado, mediaAcertos, rankingQuiz };
