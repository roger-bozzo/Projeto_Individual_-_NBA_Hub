console.log("auth.js carregado")

document.addEventListener("DOMContentLoaded", function () {
    var nome = sessionStorage.NOME_USUARIO;

    if (!nome) return;

    var btnAcesso = document.querySelector("header .area_cliente");

    if (!btnAcesso) return;

    btnAcesso.outerHTML = `
        <div class="usuario-logado">
            <span class="nome-usuario">👤 ${nome}</span>
            <button class="area_cliente sair" onclick="logout()">SAIR</button>
        </div>
    `;
});

function logout() {
    sessionStorage.clear();
    window.location = "login.html";
}