var express = require("express");
var router  = express.Router();

var quizController = require("../controllers/quizController");

router.get("/perguntas", function (req, res) {
    quizController.listarPerguntas(req, res);
});

router.post("/resultado", function (req, res) {
    quizController.salvarResultado(req, res);
});

router.get("/dashboard", function (req, res) {
    quizController.dashboard(req, res);
});

module.exports = router;
