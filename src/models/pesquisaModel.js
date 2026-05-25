var database = require("../database/config");

// Salva a resposta da pesquisa de um usuário
function salvarResposta(fkUsuario, timeFavorito, jogadorFavorito) {
    var instrucaoSql = `
        INSERT INTO pesquisa_resposta (fk_usuario, time_favorito, jogador_favorito)
        VALUES ('${fkUsuario}', '${timeFavorito}', "${jogadorFavorito}");
    `;
    console.log("SQL salvar pesquisa:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Dashboard: times mais citados como favorito
function timesMaisFavoritos() {
    var instrucaoSql = `
        SELECT
            time_favorito,
            COUNT(*) AS quantidade
        FROM pesquisa_resposta
        WHERE time_favorito IS NOT NULL AND time_favorito != ''
        GROUP BY time_favorito
        ORDER BY quantidade DESC;
    `;
    return database.executar(instrucaoSql);
}

// Dashboard: nota média do site
function jogadoresMaisFavoritos() {
    var instrucaoSql = `
        SELECT
            jogador_favorito,
            COUNT(*) AS quantidade
        FROM pesquisa_resposta
        WHERE jogador_favorito IS NOT NULL AND jogador_favorito != ''
        GROUP BY jogador_favorito
        ORDER BY quantidade DESC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = { salvarResposta, timesMaisFavoritos, jogadoresMaisFavoritos};
