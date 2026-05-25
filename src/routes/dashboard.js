var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/metricas", function (req, res) {
    dashboardController.getMetricas(req, res);
});

router.get("/ranking", function (req, res) {
    dashboardController.getRanking(req, res);
});

router.get("/distribuicao-notas", function (req, res) {
    dashboardController.getDistribuicaoNotas(req, res);
});

router.get("/times-favoritos", function (req, res) {
    dashboardController.getTimesFavoritos(req, res);
});

router.get("/jogadores-favoritos", function (req, res) {
    dashboardController.getJogadoresFavoritos(req, res);
});

router.get("/perguntas", function (req, res) {
    dashboardController.getPerguntas(req, res);
});

module.exports = router