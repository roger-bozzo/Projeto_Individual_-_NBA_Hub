var pesquisaModel = require("../models/pesquisaModel");

function salvarResposta(req, res) {
    var fkUsuario       = req.body.idUsuarioServer;
    var timeFavorito    = req.body.timeFavoritoServer;
    var jogadorFavorito = req.body.jogadorFavoritoServer;

    if (!fkUsuario) {
        return res.status(400).send("idUsuario é obrigatório." );
    }

    pesquisaModel.salvarResposta(fkUsuario, timeFavorito, jogadorFavorito)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao salvar pesquisa:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function dashboard(req, res) {
    Promise.all([
        pesquisaModel.timesMaisFavoritos(),
        pesquisaModel.jogadoresMaisFavoritos(),
    ])
    .then(function ([times, jogadores]) {
        res.json({ times, jogadores });
    })
    .catch(function (erro) {
        console.log("Erro no dashboard pesquisa:", erro.sqlMessage);
        res.status(500).json({ erro: erro.sqlMessage });
    });
}

module.exports = { salvarResposta, dashboard };
