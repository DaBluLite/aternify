document.addEventListener("DOMContentLoaded", function(){
  onLoadChangeList2();
    fixWebsite();
    stateChange();
    miniPanel();
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
logoImage.src = browser.runtime.getURL('aternos-logo.png');
}

function onLoadChangeList2() {
  function openMiniPanel() {
    window.open("https://aternos.org/server/?mode=mini", "Aternos Mini Panel (Beta)", "menubar=no,location=no,resizable=no,scrollbars=yes,status=no,toolbar=no");
  }
const openMiniPanelBtn = document.querySelector('div#open-mini-panel');
openMiniPanelBtn.addEventListener('click', openMiniPanel);
const imgLogo = document.querySelector('img.image-logo');
const skipBtn = document.querySelector('div.btn.btn-white');
const helpBtn = document.querySelector('div.help');
const helpBtn2 = document.querySelector('div.help div');
const profileActs = document.querySelector('div.account-navigation');
const profileActsMobile = document.querySelector('div.userdropdown');
const innerBody = document.querySelector('div.body');
const navigationBar = document.querySelector('nav.navigation');
const sectionContent = document.querySelector('section.content');
const navBarControls = document.querySelector('div.navigation-settings');
const serverBottom = document.querySelector('div.server-bottom-info');
const mobileDarkJs = document.querySelector('a.dropdown-darkmode-toggle');
profileActs.appendChild(helpBtn2);
profileActsMobile.insertBefore(helpBtn2, mobileDarkJs);
helpBtn2.setAttribute("class", "item");
imgLogo.setAttribute('src', browser.runtime.getURL('aternos-logo.png'));
const aternifyBtn = document.createElement('a');
aternifyBtn.setAttribute('class', 'item');
aternifyBtn.setAttribute('title', 'Aternify Ultimate');
aternifyBtn.setAttribute('href', 'https://aternifies.cf/');
aternifyBtn.setAttribute('target', '_blank');
aternifyBtn.innerHTML = '<i class="fas fa-globe-americas"></i><span class="navigation-item-label">    Aternify Ultimate</span>';
navigationBar.insertBefore(aternifyBtn, navBarControls);
const miniPanelBtn = document.createElement('a');
miniPanelBtn.setAttribute('class', 'item');
miniPanelBtn.setAttribute('title', 'Start Mini Panel');
miniPanelBtn.setAttribute('onclick', "window.open('https://aternos.org/server?mode=mini','','postwindow', 'height=1000px', 'width=500px')");
miniPanelBtn.setAttribute('target', '_blank');
miniPanelBtn.innerHTML = '<i class="fas fa-server"></i><span class="navigation-item-label">    Start Mini Panel (Beta)</span>';
const aternifyVer = document.createElement('div');
aternifyVer.setAttribute('class', 'server-info-container');
aternifyVer.innerHTML = `<div class="server-info-box">
<div class="server-info-box-head">
    <div class="server-info-box-title">
        <i class="fa fa-tag"></i> Aternify Version                    </div>
</div>
<div class="server-info-box-body">
    <div class="server-info-box-value">
        <span id="version">Aternify Ultimate v8.0</span>
                                                    </div>
</div>
</div>`;
serverBottom.appendChild(aternifyVer);
const loadingText = document.createElement("div");
loadingText.setAttribute('class', 'loading-text');
loadingText.innerHTML = `<div class="spinner">
<div class="bounce1"></div>
<div class="bounce2"></div>
<div class="bounce3"></div>
</div>`;
loadingText.style = "width: 100%; text-align: center;";
//sectionContent.appendChild(loadingText);
}
function fixWebsite() {
const antiAdBlockEr = document.querySelector('body > span > div > div');
const header = document.querySelector('header.header');
const divBody = document.querySelector('div.body');
antiAdBlockEr.style = "opacity: 0 !important;"
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
}, 3100);
}
function miniPanel() {
  if(window.location.href.indexOf("?mode=mini") > -1) {
    const navigationBarMini = document.querySelector('nav.navigation').remove();
    const headerMini = document.querySelector('header.header').remove();
    const serverBottomMini = document.querySelector('div.server-bottom').remove();
    const serverActivityMini = document.querySelector('div.start-activity-list').remove();
    const sectionContentMini = document.querySelector('section.content').style = "padding: 0px;";
    const ServerIpMiniTop = document.querySelector('div.server-ip').style = "border-radius: 0px !important; margin-top: 0px !important";
    const ServerIpMiniTopBtn = document.querySelector('div.server-ip > a.btn').remove();
    const ServerIpMiniBottom = document.querySelector('div.status').style = "border-radius: 0px !important;";
    const queueMsg = document.querySelector('div.queue-message').style = "border-radius: 0px !important; margin: 0px !important;";
    document.querySelector('title').innerHTML = "Aternos Mini Panel (Beta)";
  } else {
    return;
  }
}