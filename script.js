/* =========================
   ELEMENTOS
========================= */

const olho = document.getElementById("olho");
const senha = document.getElementById("senha");
const temaBtn = document.getElementById("tema-btn");
const logo = document.getElementById("logo");
const btnEntrar = document.querySelector(".entrar-btn");

/* =========================
   CAMINHOS DAS IMAGENS
========================= */

const LOGO_CLARA = "img/logo-clara.png";
const LOGO_ESCURA = "img/logo-escura.png";

/* =========================
   APLICAR TEMA + LOGOS
========================= */

function aplicarTema(){

const tema = localStorage.getItem("temaRodoStar");
const loadingLogo = document.getElementById("loadingLogo");

if(tema === "dark"){

document.body.classList.add("dark-mode");

if(temaBtn){
temaBtn.innerHTML = "◑";
}

if(logo){
logo.src = LOGO_CLARA;
}

if(loadingLogo){
loadingLogo.src = LOGO_CLARA;
}

}else{

document.body.classList.remove("dark-mode");

if(temaBtn){
temaBtn.innerHTML = "◐";
}

if(logo){
logo.src = LOGO_ESCURA;
}

if(loadingLogo){
loadingLogo.src = LOGO_ESCURA;
}

}

}

aplicarTema();

/* =========================
   TROCAR TEMA
========================= */

if(temaBtn){

temaBtn.addEventListener("click", function(){

if(document.body.classList.contains("dark-mode")){
localStorage.setItem("temaRodoStar", "light");
}else{
localStorage.setItem("temaRodoStar", "dark");
}

aplicarTema();

});

}

/* =========================
   LOADING SCREEN
========================= */

window.addEventListener("load", function(){

aplicarTema();

const loading = document.getElementById("loadingScreen");

if(loading){

setTimeout(function(){
loading.classList.add("hide");
}, 350);

setTimeout(function(){
loading.style.display = "none";
}, 700);

}

});

function abrirComLoading(url){

aplicarTema();

const loading = document.getElementById("loadingScreen");

if(loading){
loading.style.display = "flex";
loading.classList.remove("hide");
}

setTimeout(function(){
window.location.href = url;
}, 450);

}

/* =========================
   TOAST
========================= */

function mostrarToast(mensagem, tipo){

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");
const toastIcon = document.getElementById("toastIcon");

if(!toast || !toastText || !toastIcon){
return;
}

toastText.textContent = mensagem;

toast.classList.remove("success", "error");
toast.classList.add(tipo);

toastIcon.className =
tipo === "success"
? "fa-solid fa-circle-check"
: "fa-solid fa-circle-xmark";

toast.classList.add("show");

setTimeout(function(){
toast.classList.remove("show");
}, 2600);

}

/* =========================
   USUÁRIOS
========================= */

const usuarios = {

"otavio-camargo@hotmail.com": {
senha: "123456",
chave: "admin",
nome: "Otavio Camargo",
cargo: "Administrador Global",
iniciais: "OC"
},

"admin@rodostar.com": {
senha: "123456",
chave: "admin",
nome: "Administrador",
cargo: "Administrador Global",
iniciais: "AD"
}

};

/* =========================
   MOSTRAR / OCULTAR SENHA
========================= */

if(olho && senha){

olho.addEventListener("click", function(){

if(senha.type === "password"){

senha.type = "text";
olho.classList.remove("fa-eye");
olho.classList.add("fa-eye-slash");

}else{

senha.type = "password";
olho.classList.remove("fa-eye-slash");
olho.classList.add("fa-eye");

}

});

}

/* =========================
   LOGIN
========================= */

if(btnEntrar){

btnEntrar.addEventListener("click", function(){

const emailCampo = document.getElementById("email");
const senhaCampo = document.getElementById("senha");

if(!emailCampo || !senhaCampo){
mostrarToast("Erro: campos não encontrados.", "error");
return;
}

const email = emailCampo.value.trim().toLowerCase();
const senhaDigitada = senhaCampo.value.trim();

const usuario = usuarios[email];

if(usuario && usuario.senha === senhaDigitada){

localStorage.setItem("usuarioLogado", usuario.chave);
localStorage.setItem("usuarioNome", usuario.nome);
localStorage.setItem("usuarioCargo", usuario.cargo);
localStorage.setItem("usuarioIniciais", usuario.iniciais);
localStorage.setItem("usuarioEmail", email);

mostrarToast("Login realizado com sucesso.", "success");

setTimeout(function(){
abrirComLoading("dashboard.html");
}, 500);

}else{

mostrarToast("Login ou senha inválidos.", "error");

}

});

}

/* =========================
   ESQUECEU A SENHA
========================= */

const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const forgotModal = document.getElementById("forgotModal");
const forgotClose = document.getElementById("forgotClose");
const forgotSend = document.getElementById("forgotSend");
const forgotEmail = document.getElementById("forgotEmail");

if(forgotPasswordBtn && forgotModal){

forgotPasswordBtn.addEventListener("click", function(event){
event.preventDefault();
forgotModal.style.display = "flex";
});

}

if(forgotClose && forgotModal){

forgotClose.addEventListener("click", function(){
forgotModal.style.display = "none";
});

}

if(forgotSend && forgotEmail){

forgotSend.addEventListener("click", function(){

const email = forgotEmail.value.trim().toLowerCase();

if(email === ""){
mostrarToast("Informe seu e-mail corporativo.", "error");
return;
}

if(typeof emailjs === "undefined"){
mostrarToast("EmailJS não carregou corretamente.", "error");
return;
}

mostrarToast("Enviando instruções...", "success");

emailjs.send(
"service_fvf5sm8",
"template_ecelun3",
{
email: email,
sistema: "RodoStar"
}
)
.then(function(){

mostrarToast("Instruções enviadas com sucesso.", "success");

forgotModal.style.display = "none";
forgotEmail.value = "";

})
.catch(function(error){

console.log(error);
mostrarToast("Erro ao enviar e-mail.", "error");

});

});

}

window.addEventListener("click", function(event){

if(forgotModal && event.target === forgotModal){
forgotModal.style.display = "none";
}

});

/* =========================
   ENTER LOGIN
========================= */

document.addEventListener("keydown", function(event){

if(event.key === "Enter"){

const btnEntrarAtual = document.querySelector(".entrar-btn");

if(btnEntrarAtual){
btnEntrarAtual.click();
}

}

});