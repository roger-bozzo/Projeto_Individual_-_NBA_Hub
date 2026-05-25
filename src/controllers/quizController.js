var quizModel = require("../models/quizModel");

function listarPerguntas(req, res) {
    quizModel.listarPerguntas()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar perguntas:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function salvarResultado(req, res) {
    var fkUsuario = req.body.idUsuarioServer;
    var acertos   = req.body.acertosServer;
    var total     = req.body.totalServer;

    if (!fkUsuario || acertos === undefined || !total) {
        return res.status(400).json({ erro: "idUsuario, acertos e total são obrigatórios." });
    }

    quizModel.salvarResultado(fkUsuario, acertos, total)
        .then(function (resultado) {
            res.status(201).json({ mensagem: "Resultado salvo com sucesso!" });
        })
        .catch(function (erro) {
            console.log("Erro ao salvar resultado:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function dashboard(req, res) {
    Promise.all([
        quizModel.mediaAcertos(),
        quizModel.rankingQuiz()
    ])
    .then(function ([historico, ranking]) {
        res.json({ historico, ranking });
    })
    .catch(function (erro) {
        console.log("Erro no dashboard quiz:", erro.sqlMessage);
        res.status(500).json({ erro: erro.sqlMessage });
    });
}

module.exports = { listarPerguntas, salvarResultado, dashboard };
