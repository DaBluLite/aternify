document.addEventListener("DOMContentLoaded", function(){
  try{

    onLoadChangeList();
  
  }catch(e){
  
    onLoadChangeList2();
    fixWebsite();
    stateChange();
    btnFunct1();
    btnFunct2();
  }
  try{

    onLoadChangeList2();
    fixWebsite();
    stateChange();
    btnFunct1();
    btnFunct2();
  
  }catch(e){
  
    onLoadChangeList();
  }
});

if( typeof Element.prototype.clearChildren === 'undefined' ) {
Object.defineProperty(Element.prototype, 'clearChildren', {
  configurable: true,
  enumerable: false,
  value: function() {
    while(this.firstChild) this.removeChild(this.lastChild);
  }
});
}

function onLoadChangeList() {
const logoImage = document.querySelector('img.opnav-logo-img');
logoImage.src = "https://cdn.discordapp.com/attachments/801712144705781760/811273858081882122/aternos-ultimate-logo-blue.png";
}

function onLoadChangeList2() {
const imgLogo = document.querySelector('a.logo img');
const skipBtn = document.querySelector('div.btn.btn-white');
const helpBtn = document.querySelector('div.help');
const helpBtn2 = document.querySelector('div.help div');
const profileActs = document.querySelector('div.account-navigation');
const innerBody = document.querySelector('div.body');
const navigationBar = document.querySelector('nav.navigation');
const sectionContent = document.querySelector('section.content');
const navBarControls = document.querySelector('div.navigation-settings');
helpBtn.remove();
profileActs.appendChild(helpBtn2);
helpBtn2.setAttribute("class", "item");
imgLogo.src = "https://cdn.discordapp.com/attachments/801712144705781760/811273858081882122/aternos-ultimate-logo-blue.png";
skipBtn.click();
const aternifyBtn = document.createElement('a');
aternifyBtn.setAttribute('class', 'item');
aternifyBtn.setAttribute('title', 'Aternify Ultimate');
aternifyBtn.setAttribute('href', 'https://addons.mozilla.org/en-US/firefox/addon/aternify-ultimate/');
aternifyBtn.setAttribute('target', '_blank');
aternifyBtn.innerHTML = '<span class="navigation-item-label">    Aternify Ultimate</span>';
navigationBar.insertBefore(aternifyBtn, navBarControls);
const loadingText = document.createElement("div");
loadingText.setAttribute('class', 'loading-text');
loadingText.innerHTML = `<div class="spinner">
<div class="bounce1"></div>
<div class="bounce2"></div>
<div class="bounce3"></div>
</div>`;
loadingText.style = "width: 100%; text-align: center;";
sectionContent.appendChild(loadingText);
}
function fixWebsite() {
const antiAdBlockEr = document.querySelector('body > span > div > div');
const header = document.querySelector('header.header');
const divBody = document.querySelector('div.body');
antiAdBlockEr.style = "opacity: 0 !important;"
header.style = "display: flex !important;";
divBody.style = "display: flex !important; height: 100% !important;";
}
function antiAdBlockerFixedMessage() {
const antiAdBlockerBody = document.querySelector('body > span');
antiAdBlockerBody.clearChildren();
}
function stateChange() {
const antiAdBlock = document.querySelector('body > span');
const innerBody = document.querySelector('div.body');
const loadingText = document.querySelector('div.loading-text');
window.setTimeout(function() {
  antiAdBlock.remove();
  loadingText.remove();
  innerBody.style = "opacity: 1; height: calc(100% - 100px);";
}, 4000);
}
