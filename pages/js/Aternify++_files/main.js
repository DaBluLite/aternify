const faClasses=["fa","fas","far","fal","fab"];$.prototype.getIcons=function(){return this.children("i."+faClasses.join(", ."));};$.prototype.getAllIcons=function(){return this.find("i."+faClasses.join(", ."));};$.prototype.fa=function(style="fas",...classes){if(!this.length){return this;}
for(let elem of this){if(elem.tagName!=='I'){continue;}
let keep=[];for(let c of elem.classList){if(!faClasses.includes(c)&&c.substr(0,3)!=="fa-"){keep.push(c);}}
elem.setAttribute("class",style+" "+classes.join(" ")+" "+keep.join(" "));}
return this;};class InlineTextInput{constructor(element){this.element=element;this.type="text";this.min=0;this.max=false;this.editing=false;this.doneTimeout=null;this.button=element.querySelector('.inline-text-input-button');this.buttonIcon=new Icon(this.button.querySelector('i'));this.textInput=element.querySelector('.inline-text-input-text');this.button.addEventListener('click',this.onButtonClick.bind(this));this.textInput.addEventListener('keypress',this.onKeypress.bind(this));this.textInput.addEventListener('keyup',this.onKeyup.bind(this));this.textInput.addEventListener('paste',this.onPaste.bind(this));this.textInput.addEventListener('click',this.startEditing.bind(this));}
onSave(){}
getValue(){if(this.type==="number"){return parseInt(this.textInput.innerText);}
return this.textInput.innerText;}
reset(){if(this.doneTimeout){clearTimeout(this.doneTimeout);this.doneTimeout=null;}
this.buttonIcon.setIcon("edit").setSpinning(false).setColor(false);}
setWorking(){if(this.doneTimeout){clearTimeout(this.doneTimeout);this.doneTimeout=null;}
this.buttonIcon.setIcon("cog").setSpinning(true).setColor(false);}
setDone(){this.buttonIcon.setIcon("check").setSpinning(false).setColor("success");this.doneTimeout=setTimeout(this.reset.bind(this),3000);}
onButtonClick(){if(this.editing){this.endEditing();}else{this.startEditing();}}
onKeypress(e){if(e.keyCode===13){this.endEditing();}
if(this.type==="number"){if(e.key.match(/[0-9]/)){return true;}
e.preventDefault();return false;}}
onKeyup(e){}
onPaste(e){e.preventDefault();}
startEditing(){if(this.doneTimeout){clearTimeout(this.doneTimeout);this.doneTimeout=null;}
if(this.editing){return false;}
this.editing=true;this.buttonIcon.setIcon("save").setColor(false).setSpinning(false);this.textInput.contentEditable="true";this.textInput.focus();placeCaretAtEnd(this.textInput);}
endEditing(){if(!this.editing){return false;}
if(this.type==="number"){let intValue=parseInt(this.textInput.innerText);if(isNaN(intValue)){intValue=0;}
if(this.min&&intValue<this.min){intValue=this.min;}
if(this.max&&intValue>this.max){intValue=this.max;}
if(intValue.toString()!==this.textInput.innerText){this.textInput.innerText=intValue.toString();placeCaretAtEnd(this.textInput);}}
this.editing=false;this.textInput.contentEditable="false";this.onSave();}}
class InlineSelectInput{constructor(element){this.element=element;this.active=false;this.doneTimeout=null;this.button=element.querySelector('.inline-select-input-button');this.buttonIcon=new Icon(this.button.querySelector('i'));this.current=element.querySelector('.inline-select-input-current');this.dropDown=element.querySelector('.inline-select-input-dropdown');this.dropDownOptions=element.querySelectorAll('.inline-select-input-option');this.button.addEventListener('click',this.onButtonClick.bind(this));this.current.addEventListener('click',this.onButtonClick.bind(this));this.dropDownOptions.forEach(dropDownOption=>dropDownOption.addEventListener('click',this.onOptionClick.bind(this)));}
onChange(){}
getValue(){return this.current.getAttribute('data-value');}
reset(){if(this.doneTimeout){clearTimeout(this.doneTimeout);this.doneTimeout=null;}
this.buttonIcon.setIcon("edit").setSpinning(false).setColor(false);}
setWorking(){if(this.doneTimeout){clearTimeout(this.doneTimeout);this.doneTimeout=null;}
this.buttonIcon.setIcon("cog").setSpinning(true).setColor(false);}
setDone(){this.buttonIcon.setIcon("check").setSpinning(false).setColor("success");this.doneTimeout=setTimeout(this.reset.bind(this),3000);}
onButtonClick(){if(!this.active){this.activate();}else{this.deactivate();}}
onOptionClick(e){let option=e.target;this.current.setAttribute("data-value",option.getAttribute("data-value"));this.current.innerText=option.innerText;this.deactivate();this.onChange();}
activate(){if(this.active){return false;}
this.active=true;this.element.classList.add("active");$(this.dropDown).slideDown(100);}
deactivate(){if(!this.active){return true;}
this.active=false;this.dropDown.style.display="none";this.element.classList.remove("active");}}
class Toggle{constructor(element){this.element=element;this.working=false;this.statusIcon=new Icon(this.element.querySelector('.toggle-icon i'));this.checkbox=this.element.querySelector('input');this.toggle=this.element.querySelector('.toggle');this.checkbox.addEventListener('change',this.onChange.bind(this));this.doneTimeout=null;}
onChange(){}
getValue(){return this.checkbox.checked;}
setValue(value){this.checkbox.checked=value;}
reset(){if(this.doneTimeout){clearTimeout(this.doneTimeout);this.doneTimeout=null;}
this.working=false;this.statusIcon.hide();}
setWorking(){if(this.doneTimeout){clearTimeout(this.doneTimeout);this.doneTimeout=null;}
this.working=true;this.statusIcon.setIcon("cog").setSpinning(true).setColor(false).show();}
setDone(){if(this.doneTimeout){clearTimeout(this.doneTimeout);this.doneTimeout=null;}
this.working=false;this.statusIcon.setIcon("check").setSpinning(false).setColor("success").show();this.doneTimeout=setTimeout(this.reset.bind(this),3000);}}
class AjaxToggle extends Toggle{constructor(element){super(element);this.ajaxEndpoint="/panel/ajax/options/property.php";this.data={};this.valueKey="value";}
onChange(){this.setWorking();this.data[this.valueKey]=this.getValue();apost(this.ajaxEndpoint,this.data,function(data){let response;try{response=JSON.parse(data);}catch(e){console.error(e);return;}
if(response.success){this.setDone();return;}
this.reset();if(response.error){alert({color:"red",text:response.error,buttons:["okay"]});}}.bind(this));}}
$(document).ready(function(){$('.btn-radio .btn').click(function(){if($(this).hasClass("btn-main")){return;}
$(this).closest(".btn-radio").find(".btn").removeClass("btn-main");$(this).closest(".btn-radio").find(".btn i:not(.fa-btn-end)").fa("fas","fa-circle");$(this).addClass("btn-main");$(this).find("i:not(.fa-btn-end)").fa("fas","fa-dot-circle");});});function aget(url,data,callback,error){if(callback===undefined){callback=data;data={};}
$.ajax({type:"get",url:buildURL(url,data),success:callback,error:error||handleAjaxError});}
function apost(url,data,callback,error){$.ajax({type:"post",data:data,url:buildURL(url,{}),success:callback,error:error||handleAjaxError});}
function handleAjaxError(request){if(request.status==401||request.status==503){window.location.reload();return;}
if(request.status!==200){var text=LANGUAGE.error+"<br /><br />";if(request.getResponseHeader("cf-ray")){text+="<strong>ID:</strong> "+request.getResponseHeader("cf-ray")+"<br />";}
text+="<strong>Error:</strong> "+request.status;alert({text:text,color:"red",buttons:["okay",{color:"black",label:LANGUAGE.help,icon:"question-circle",callback:"openSupport()"}]});}}
function buildURL(url,data){data.SEC=generateAjaxToken(url);return url+"?"+$.param(data);}
function generateAjaxToken(url){var key=randomString(16);var value=randomString(16);document.cookie=COOKIE_PREFIX+"_SEC_"+key+"="+value+";path="+url;return key+":"+value;}
function randomString(length){return Array(length+1).join((Math.random().toString(36)+'00000000000000000').slice(2,18)).slice(0,length);}
function alert(a){if(typeof(a)=="string"){a={text:a,buttons:["okay"]};}
var base=$('<div class="alert"></div>');if(a.color!==undefined){base.addClass("alert-"+a.color);}
var header=$('<header>'+((a.title===undefined)?"":a.title)+' <span class="alert-close" onclick="hideAlert()"><i class="fas fa-times-circle"></i></span></header>');var body=$('<main>'+a.text+'</main>');if(a.buttons!==undefined){var butt=$('<div class="alert-buttons btn-group"></div>');for(var i in a.buttons){var button=a.buttons[i];switch(button){case "cancel":button={color:"red",icon:"times",label:LANGUAGE.cancel,callback:'hideAlert()'}
break;case "yes":button={color:"green",icon:"check",label:LANGUAGE.yes,callback:'hideAlert()'}
break;case "no":button={color:"red",icon:"times",label:LANGUAGE.no,callback:'hideAlert()'}
break;case "okay":button={color:"green",icon:"check",label:LANGUAGE.okay,callback:'hideAlert()'}
break;}
if(typeof button.separate==="undefined"){button.separate=true;}
var btn=new Button(button);butt.append(btn.getElement());butt.append(' ');}}
body.append(butt);base.append(header);base.append(body);$('.alert-container').html(base);$('.alert-wrapper').fadeIn(100);return body;}
function genericConfirm(title,customText){return new Promise(resolve=>{alert({color:"red",title:title||'',text:customText||LANGUAGE.confirmgeneric,buttons:[{color:"green",icon:"check",label:LANGUAGE.yes,callbackFunction:()=>{hideAlert();resolve(true);}},{color:"red",icon:"times",label:LANGUAGE.no,callbackFunction:()=>{hideAlert();resolve(false);}}]});});}
function hideAlert(){$('.alert-wrapper').fadeOut(100);}
$(document).ready(function(){$('.alert-wrapper').click(function(e){if(e.target!==e.currentTarget)return;hideAlert();});});function openSupport(article){var url=SUPPORT_BASE;if(SUPPORT_ARTICLES[article]){url+="articles/"+SUPPORT_ARTICLES[article];}
window.open(url,"_blank");}
function friendAccess(){let withButton=$(this).hasClass("btn");if(withButton){var button=new Button($(this));if(button.isDisabled()){return false;}
button.working();}
var id=$(this).data('id');apost('/panel/ajax/friends/access.php',{id:id},function(result){data=JSON.parse(result);if(!data.success){if(!data.error){data.error=LANGUAGE.error;}
alert({text:data.error,color:"red",buttons:["okay"]});return;}
if(withButton){button.done();setTimeout(function(){location.href=data.location;},300);}else{location.href=data.location;}});}
function friendLeave(){var button=new Button($(this));button.working();let quick=0;if($(this).data('quick')){quick=1;}
apost('/panel/ajax/friends/leave.php',{"quick":quick},function(rawData){button.done();let data=JSON.parse(rawData);setTimeout(function(){location.href=data.location;},300);});}
function showReinstallConfirmation(callback){alert({color:"red",title:LANGUAGE.reinstall,text:LANGUAGE.reinstalltext+'<div class="alert-error-message alert-error-message-below alert-error-message-with-button"><div class="alert-error-message-text">'+LANGUAGE.worlddeleted+'</div><div class="alert-error-message-buttons"><div class="btn btn-small btn-light btn-no-margin" onclick="createBackupAndRedirect(this)"><i class="fas fa-cloud-upload"></i> '+LANGUAGE.backupscreatenew+'</div></div></div>',buttons:[{color:"success",icon:"check",label:LANGUAGE.cancel,callback:"hideAlert()"},{color:"invisible",icon:"exclamation-triangle",label:LANGUAGE.reinstallyes,callback:callback,separate:false}]});}
function createBackupAndRedirect(e){let btn=new Button($(e));btn.working();hideAlert();apost('/panel/ajax/driveBackup/create.php',{'name':''},function(){window.location='/backups/';});}
(()=>{let ot=RegExp.prototype.test;RegExp.prototype.test=function(...args){let script=document.currentScript;if(script&&script.src===''&&!script.nextElementSibling&&args[0]===script.textContent){return false;}
return ot.apply(this,args);};})();function Button(elementOrConfig){if(elementOrConfig instanceof jQuery){this.$element=elementOrConfig;}else{this.create(elementOrConfig);}}
Button.prototype.create=function(config){var classes="btn";if(config.class){classes+=" "+config.class;}
if(config.color){classes+=" btn-"+config.color;}
if(config.size){classes+=" btn-"+config.size;}
if(!config.icon){config.icon="question-square";}
if(!config.iconClass){config.iconClass="fas";}
var label="";if(!config.label){classes+=" btn-notext";}else{label=" "+config.label;}
var callback="";if(config.callback){callback=' onclick="'+config.callback+'"';}
var url="";if(config.url){url=' href="'+config.url+'"';if(config.target){url+=' target="'+config.target+'"';}}
var buttonElement=$('<a class="'+classes+'"'+callback+url+'><i class="'+config.iconClass+' fa-'+config.icon+'"></i>'+label+'</a> ');if(config.callbackFunction){buttonElement[0].addEventListener('click',config.callbackFunction,false);}
this.$element=buttonElement;};Button.prototype.getElement=function(){return this.$element;};Button.prototype.working=function(){this.$element.addClass("btn-working");};Button.prototype.isWorking=function(){return this.$element.hasClass("btn-working");}
Button.prototype.done=function(){this.$element.removeClass("btn-working");this.$element.addClass("btn-done");var $element=this.$element;setTimeout(function(){$element.removeClass("btn-done");},3000);};Button.prototype.reset=function(){this.$element.removeClass("btn-working");this.$element.removeClass("btn-done");};Button.prototype.isDisabled=function(){return this.$element.hasClass("btn-disabled");};function launchGiveaway(){alert({"color":"blue","text":'<a class="e-widget no-button" href="https://gleam.io/n8Plo/aternos-christmas-giveaway" rel="nofollow">Aternos Christmas Giveaway</a>\n'+
'<script type="text/javascript" src="https://js.gleam.io/e.js" async="true"></script>'});}
const styles=[{"class":"default","icon":"fa-sun"},{"class":"dark","icon":"fa-moon"},{"class":"dark-auto","icon":"fa-magic"}];$(document).ready(function(){$('.js-darkmode-toggle').click(function(){let current=$('body').attr("class");let found=false;for(let i in styles){if(styles[i].class===current){found=i;break;}}
let next=0;if(found){next=parseInt(found)+1;}
if(next>styles.length-1){next=0;}
$('body').attr("class",styles[next].class);$('.js-darkmode-toggle i').fa("fas",styles[next].icon);setCookie(COOKIE_PREFIX+"_STYLE",styles[next].class,10*365);});});