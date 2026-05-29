function mostrarToast(mensagem){
const toast=document.getElementById("toast");
const toastText=document.getElementById("toastText");
if(!toast||!toastText)return;
toastText.textContent=mensagem;
toast.classList.add("show");
setTimeout(()=>toast.classList.remove("show"),2500);
}

function setText(id,text){
const el=document.getElementById(id);
if(el)el.textContent=text;
}

function setHTML(id,html){
const el=document.getElementById(id);
if(el)el.innerHTML=html;
}

function aplicarLoadingTema(){
const loadingLogo=document.getElementById("loadingLogo");
const tema=localStorage.getItem("temaRodoStar");

if(tema==="dark"){
document.body.classList.add("dark-mode");
if(loadingLogo)loadingLogo.src="img/logo-clara.png";
}else{
document.body.classList.remove("dark-mode");
if(loadingLogo)loadingLogo.src="img/logo-escura.png";
}
}

aplicarLoadingTema();

function abrirComLoading(url){
const loading=document.getElementById("loadingScreen");
aplicarLoadingTema();

if(loading){
loading.style.display="flex";
loading.classList.remove("hide");
}

setTimeout(function(){
window.location.href=url;
},450);
}

window.addEventListener("load",function(){
const loading=document.getElementById("loadingScreen");

if(loading){
setTimeout(function(){
loading.classList.add("hide");
},350);

setTimeout(function(){
loading.style.display="none";
},700);
}
});

/* TEMA */

const themeBtn=document.getElementById("themeToggle");

function carregarTema(){
const tema=localStorage.getItem("temaRodoStar");

if(tema==="dark"){
document.body.classList.add("dark-mode");
if(themeBtn)themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';
}else{
document.body.classList.remove("dark-mode");
if(themeBtn)themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';
}

aplicarLoadingTema();
}

carregarTema();

if(themeBtn){
themeBtn.onclick=function(e){
e.stopPropagation();

if(document.body.classList.contains("dark-mode")){
localStorage.setItem("temaRodoStar","light");
}else{
localStorage.setItem("temaRodoStar","dark");
}

carregarTema();
};
}

/* FULLSCREEN */

const fullscreenBtn=document.getElementById("fullscreenBtn");

if(fullscreenBtn){
fullscreenBtn.onclick=function(e){
e.stopPropagation();

if(!document.fullscreenElement){
document.documentElement.requestFullscreen();
fullscreenBtn.innerHTML='<i class="fa-solid fa-compress"></i>';
}else{
document.exitFullscreen();
fullscreenBtn.innerHTML='<i class="fa-solid fa-expand"></i>';
}
};
}

/* MENU 3 BARRINHAS */

const menuToggle=document.getElementById("menuToggle");
const sidebarDropdown=document.getElementById("sidebarDropdown");

if(menuToggle&&sidebarDropdown){
menuToggle.onclick=function(e){
e.stopPropagation();

sidebarDropdown.style.display=
sidebarDropdown.style.display==="flex"?"none":"flex";
};
}

document.querySelectorAll(".sidebar-link").forEach(function(link){
link.onclick=function(e){
e.preventDefault();
abrirComLoading(link.getAttribute("href"));
};
});

/* POWER BI */

let zoomPowerBI=1;
const powerbiPanel=document.getElementById("powerbiPanel");

const reloadPowerBI=document.getElementById("reloadPowerBI");
const zoomInBtn=document.getElementById("zoomInBtn");
const zoomOutBtn=document.getElementById("zoomOutBtn");
const printBtn=document.getElementById("printBtn");
const fullscreenReportBtn=document.getElementById("fullscreenReportBtn");

if(reloadPowerBI){
reloadPowerBI.onclick=function(){
location.reload();
};
}

if(zoomInBtn&&powerbiPanel){
zoomInBtn.onclick=function(){
zoomPowerBI+=0.1;
powerbiPanel.style.transform=`scale(${zoomPowerBI})`;
powerbiPanel.style.transformOrigin="top center";
};
}

if(zoomOutBtn&&powerbiPanel){
zoomOutBtn.onclick=function(){
zoomPowerBI=Math.max(0.7,zoomPowerBI-0.1);
powerbiPanel.style.transform=`scale(${zoomPowerBI})`;
powerbiPanel.style.transformOrigin="top center";
};
}

if(printBtn){
printBtn.onclick=function(){
window.print();
};
}

if(fullscreenReportBtn&&powerbiPanel){
fullscreenReportBtn.onclick=function(){
if(!document.fullscreenElement){
powerbiPanel.requestFullscreen();
}else{
document.exitFullscreen();
}
};
}

/* IDIOMA */

const languageCurrent=document.getElementById("languageCurrent");
const languageDropdown=document.getElementById("languageDropdown");
const languageFlag=document.getElementById("languageFlag");
const languageText=document.getElementById("languageText");

if(languageCurrent&&languageDropdown){
languageCurrent.onclick=function(e){
e.stopPropagation();

languageDropdown.style.display=
languageDropdown.style.display==="block"?"none":"block";
};
}

const translations={
"pt-br":{
dashboard:"DASHBOARD",
reports:"RELATÓRIOS",
search:"Pesquisar",
available:"RELATÓRIOS DISPONÍVEIS",
lastUpdate:"ÚLTIMA ATUALIZAÇÃO",
cards:["FATURAMENTO","FAROL EXPEDIÇÃO","FAROL DISTRIBUIÇÃO","EVOLUÇÃO QUALITATIVA"],
subs:["Performance Financeira","Controle de Expedição","Controle da Distribuição","Eficiência"],
access:"ACESSAR"
},
"en":{
dashboard:"DASHBOARD",
reports:"REPORTS",
search:"Search",
available:"AVAILABLE REPORTS",
lastUpdate:"LAST UPDATE",
cards:["REVENUE","EXPEDITION LIGHTHOUSE","DISTRIBUTION LIGHTHOUSE","QUALITATIVE EVOLUTION"],
subs:["Financial Performance","Expedition Control","Distribution Control","Efficiency"],
access:"ACCESS"
},
"es":{
dashboard:"PANEL",
reports:"INFORMES",
search:"Buscar",
available:"INFORMES DISPONIBLES",
lastUpdate:"ÚLTIMA ACTUALIZACIÓN",
cards:["FACTURACIÓN","FARO EXPEDICIÓN","FARO DISTRIBUCIÓN","EVOLUCIÓN CUALITATIVA"],
subs:["Rendimiento Financiero","Control de Expedición","Control de Distribución","Eficiencia"],
access:"ACCEDER"
},
"pt-pt":{
dashboard:"DASHBOARD",
reports:"RELATÓRIOS",
search:"Pesquisar",
available:"RELATÓRIOS DISPONÍVEIS",
lastUpdate:"ÚLTIMA ATUALIZAÇÃO",
cards:["FATURAÇÃO","FAROL EXPEDIÇÃO","FAROL DISTRIBUIÇÃO","EVOLUÇÃO QUALITATIVA"],
subs:["Performance Financeira","Controlo de Expedição","Controlo da Distribuição","Eficiência"],
access:"ACEDER"
}
};

function aplicarIdioma(key){
const lang=translations[key];
if(!lang)return;

setText("titleDashboard",lang.dashboard);
setText("reportsTitle",lang.reports);
setText("availableReportsText",lang.available);
setText("lastUpdateText",lang.lastUpdate);

const searchInput=document.getElementById("searchInput");
if(searchInput)searchInput.placeholder=lang.search;

setText("cardTitleOne",lang.cards[0]);
setText("cardTitleTwo",lang.cards[1]);
setText("cardTitleThree",lang.cards[2]);
setText("cardTitleFour",lang.cards[3]);

setText("cardSubOne",lang.subs[0]);
setText("cardSubTwo",lang.subs[1]);
setText("cardSubThree",lang.subs[2]);
setText("cardSubFour",lang.subs[3]);

document.querySelectorAll(".accessButton").forEach(function(btn){
btn.textContent=lang.access;
});
}

document.querySelectorAll(".language-option").forEach(function(option){
option.onclick=function(e){
e.stopPropagation();

const flag=option.getAttribute("data-flag");
const text=option.getAttribute("data-text");
const key=option.getAttribute("data-key");

if(languageFlag)languageFlag.src=flag;
if(languageText)languageText.textContent=text;

localStorage.setItem("rodostarLanguageFlag",flag);
localStorage.setItem("rodostarLanguageText",text);
localStorage.setItem("rodostarLanguageKey",key);

aplicarIdioma(key);

if(languageDropdown)languageDropdown.style.display="none";
};
});

const savedFlag=localStorage.getItem("rodostarLanguageFlag");
const savedText=localStorage.getItem("rodostarLanguageText");
const savedKey=localStorage.getItem("rodostarLanguageKey");

if(savedFlag&&savedText){
if(languageFlag)languageFlag.src=savedFlag;
if(languageText)languageText.textContent=savedText;
}

if(savedKey)aplicarIdioma(savedKey);

/* NOTIFICAÇÕES */

const notificationBtn=document.getElementById("notificationBtn");
const notificationMenu=document.getElementById("notificationMenu");
const notificationCount=document.getElementById("notificationCount");
const markReadBtn=document.getElementById("markReadBtn");

if(notificationBtn&&notificationMenu){
notificationBtn.onclick=function(e){
e.stopPropagation();

notificationMenu.style.display=
notificationMenu.style.display==="block"?"none":"block";
};
}

if(markReadBtn){
markReadBtn.onclick=function(e){
e.stopPropagation();

document.querySelectorAll(".notification-item").forEach(function(item){
item.classList.remove("unread");
});

if(notificationCount)notificationCount.style.display="none";

mostrarToast("Notificações marcadas como lidas.");
};
}

/* PERFIL */

const profileBtn=document.getElementById("profileBtn");
const profileMenu=document.getElementById("profileMenu");

if(profileBtn&&profileMenu){
profileBtn.onclick=function(e){
e.stopPropagation();

profileMenu.style.display=
profileMenu.style.display==="block"?"none":"block";
};
}

/* MODAL PERFIL */

const editProfileBtn=document.getElementById("editProfileBtn");
const profileModal=document.getElementById("profileModal");
const closeProfileModal=document.getElementById("closeProfileModal");

if(editProfileBtn){
editProfileBtn.onclick=function(e){
e.stopPropagation();

if(profileModal)profileModal.style.display="flex";
if(profileMenu)profileMenu.style.display="none";
};
}

if(closeProfileModal&&profileModal){
closeProfileModal.onclick=function(){
profileModal.style.display="none";
};
}

/* FOTO PERFIL */

const changePhotoBtn=document.getElementById("changePhotoBtn");
const profilePhotoInput=document.getElementById("profilePhotoInput");
const profileModalAvatar=document.getElementById("profileModalAvatar");
const profileAvatar=document.querySelector(".profile-avatar");
const profileTopCircle=document.querySelector(".profile-circle");
const removePhotoBtn=document.getElementById("removePhotoBtn");
const saveProfileBtn=document.getElementById("saveProfileBtn");

const profileNameInput=document.getElementById("profileNameInput");
const profileRoleInput=document.getElementById("profileRoleInput");
const profileEmailInput=document.getElementById("profileEmailInput");

if(changePhotoBtn&&profilePhotoInput){
changePhotoBtn.onclick=function(){
profilePhotoInput.click();
};
}

if(profilePhotoInput){
profilePhotoInput.onchange=function(){
const file=this.files[0];
if(!file)return;

const reader=new FileReader();

reader.onload=function(event){
const image=event.target.result;

if(profileModalAvatar)profileModalAvatar.innerHTML='<img src="'+image+'">';
if(profileAvatar)profileAvatar.innerHTML='<img src="'+image+'">';
if(profileTopCircle)profileTopCircle.innerHTML='<img src="'+image+'"><div class="online-dot"></div>';

localStorage.setItem("profilePhoto",image);
mostrarToast("Foto salva com sucesso.");
};

reader.readAsDataURL(file);
};
}

if(removePhotoBtn){
removePhotoBtn.onclick=function(){
localStorage.removeItem("profilePhoto");

if(profileModalAvatar)profileModalAvatar.innerHTML="LOG";
if(profileAvatar)profileAvatar.innerHTML="LOG";
if(profileTopCircle)profileTopCircle.innerHTML='<span class="profile-initials">LOG</span><div class="online-dot"></div>';

mostrarToast("Foto removida com sucesso.");
};
}

if(saveProfileBtn){
saveProfileBtn.onclick=function(){
const nome=profileNameInput?profileNameInput.value:"";
const cargo=profileRoleInput?profileRoleInput.value:"";
const email=profileEmailInput?profileEmailInput.value:"";

localStorage.setItem("profileName",nome);
localStorage.setItem("profileRole",cargo);
localStorage.setItem("profileEmail",email);

const headerName=document.querySelector(".profile-header h4");
const headerRole=document.querySelector(".profile-header p");

if(headerName)headerName.textContent=nome;
if(headerRole)headerRole.textContent=cargo;

if(profileModal)profileModal.style.display="none";

mostrarToast("Perfil atualizado com sucesso.");
};
}

const savedPhoto=localStorage.getItem("profilePhoto");
const savedName=localStorage.getItem("profileName");
const savedRole=localStorage.getItem("profileRole");
const savedEmail=localStorage.getItem("profileEmail");

if(savedPhoto){
if(profileModalAvatar)profileModalAvatar.innerHTML='<img src="'+savedPhoto+'">';
if(profileAvatar)profileAvatar.innerHTML='<img src="'+savedPhoto+'">';
if(profileTopCircle)profileTopCircle.innerHTML='<img src="'+savedPhoto+'"><div class="online-dot"></div>';
}

if(savedName){
if(profileNameInput)profileNameInput.value=savedName;
const headerName=document.querySelector(".profile-header h4");
if(headerName)headerName.textContent=savedName;
}

if(savedRole){
if(profileRoleInput)profileRoleInput.value=savedRole;
const headerRole=document.querySelector(".profile-header p");
if(headerRole)headerRole.textContent=savedRole;
}

if(savedEmail&&profileEmailInput){
profileEmailInput.value=savedEmail;
}

/* PESQUISA */

const searchInput=document.getElementById("searchInput");

if(searchInput){
searchInput.onkeyup=function(){
const texto=searchInput.value.toLowerCase();

document.querySelectorAll(".card").forEach(function(card){
const titulo=card.querySelector("h3").innerText.toLowerCase();
card.style.display=titulo.includes(texto)?"flex":"none";
});
};
}

/* BOTÕES DASHBOARD */

document.querySelectorAll(".accessButton").forEach(function(botao){
botao.onclick=function(){
const titulo=botao.parentElement.querySelector("h3").innerText.toLowerCase();

if(titulo.includes("faturamento")||titulo.includes("revenue")||titulo.includes("facturación")||titulo.includes("faturação")){
abrirComLoading("faturamento.html");
}else if(titulo.includes("expedição")||titulo.includes("expedition")||titulo.includes("expedición")){
abrirComLoading("farol-expedicao.html");
}else if(titulo.includes("distribuição")||titulo.includes("distribution")||titulo.includes("distribución")){
abrirComLoading("farol-distribuicao.html");
}else if(titulo.includes("evolução")||titulo.includes("qualitative")||titulo.includes("evolución")){
abrirComLoading("evolucao-qualitativa.html");
}
};
});

/* SAIR */

const logoutText=document.getElementById("logoutText");

if(logoutText){
logoutText.onclick=function(){
abrirComLoading("index.html");
};
}

/* SUPORTE */

const supportBtn=document.getElementById("supportBtn");
const supportPanel=document.getElementById("supportPanel");

if(supportBtn&&supportPanel){
supportBtn.onclick=function(e){
e.stopPropagation();

supportPanel.style.display=
supportPanel.style.display==="block"?"none":"block";
};
}

/* FECHAR MENUS */

window.addEventListener("click",function(e){

if(languageDropdown&&!e.target.closest(".language-selector")){
languageDropdown.style.display="none";
}

if(notificationMenu&&!e.target.closest(".notification-wrapper")){
notificationMenu.style.display="none";
}

if(profileMenu&&!e.target.closest(".profile-wrapper")){
profileMenu.style.display="none";
}

if(profileModal&&e.target===profileModal){
profileModal.style.display="none";
}

if(supportPanel&&!e.target.closest(".support-widget")){
supportPanel.style.display="none";
}

if(sidebarDropdown&&!e.target.closest(".sidebar")){
sidebarDropdown.style.display="none";
}

});