var express = require("express");
var router  = express.Router();

var pesquisaController = require("../controllers/pesquisaController");

router.post("/responder", function (req, res) {
    pesquisaController.salvarResposta(req, res);
});

router.get("/dashboard", function (req, res) {
    pesquisaController.dashboard(req, res);
});

module.exports = router;
