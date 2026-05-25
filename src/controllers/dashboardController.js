var dashboardModel = require("../models/dashboardModel");

function getMetricas(req, res) {
    dashboardModel.getMetricas()
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("\nErro ao buscar métricas:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function getRanking(req, res) {
    dashboardModel.getRanking()
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("\nErro ao buscar ranking:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function getDistribuicaoNotas(req, res) {
    dashboardModel.getDistribuicaoNotas()
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("\nErro ao buscar distribuição de notas:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function getTimesFavoritos(req, res) {
    dashboardModel.getTimesFavoritos()
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("\nErro ao buscar times favoritos:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function getJogadoresFavoritos(req, res) {
    dashboardModel.getJogadoresFavoritos()
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("\nErro ao buscar jogadores favoritos:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function getPerguntas(req, res) {
    dashboardModel.getPerguntas()
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("\nErro ao buscar perguntas:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

module.exports = { getMetricas, getRanking, getDistribuicaoNotas, getTimesFavoritos, getJogadoresFavoritos, getPerguntas };