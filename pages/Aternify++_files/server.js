$('#status').on("status:update",function(e,status){updateServerStatus(status);});$('#status').on("queue:reduced",function(e,queue){updateQueue(queue);});var queueUpdateInterval=null;var lastStatusQueuePercentage=100;let pendingCancelTimeout=null;let statusAdShown=false;updateServerStatus(lastStatus);function updateServerStatus(status){if(status.class=="queueing"){$('.server-status .server-status-label-right').html(status.queue.position+" / "+status.queue.count);$('.server-status .server-status-label-left').html(status.queue.time);$('.server-status .server-status-label-right').show();$('.server-status .server-status-label-left').show();if(status.queue.percentage<lastStatusQueuePercentage){lastStatusQueuePercentage=status.queue.percentage;}
$('.server-status .status').css({backgroundImage:"linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) "+lastStatusQueuePercentage+"%, rgba(0, 0, 0, 0) "+lastStatusQueuePercentage+"%)"});if(queueUpdateInterval===null){}}else if(status.class=="online"){COUNTDOWN=status.countdown;$('.server-status .server-status-label-right').html(status.ram+"MB RAM");$('.server-status .server-status-label-left').show();$('.server-status .server-status-label-right').show();}else{$('.server-status .server-status-label-right').html("");$('.server-status .server-status-label-left').html("");$('.server-status .server-status-label-right').hide();$('.server-status .server-status-label-left').hide();$('.server-status .status').css({backgroundImage:""});}
if(ADMIN){status.headstarts="A";}
if(status.headstarts!==null&&(status.headstarts>0||status.headstarts==="A")){$('#headstart').removeClass('hidden');}else{if(!$('#headstart').hasClass('hidden')){$('#headstart').addClass('hidden');}}
if(status.class!="queueing"){lastStatusQueuePercentage=100;clearInterval(queueUpdateInterval);queueUpdateInterval=null;}
if(status.status==7){$('.crashed-view-log-button').show();}else{$('.crashed-view-log-button').hide();}
if(status.status==1||status.status==0||status.status==7||status.status==5){statusAdShown=false;}
showStatusAd();$('#headstart-count').html(status.headstarts);$('.server-actions').attr('class','server-actions '+status.class+((status.class=="queueing")?' '+status.queue.pending:''));$('#players').html(status.players+"/"+status.slots);$('#software').html(status.software);if(status.bedrock){$('#port').html(status.port);$('#ip').html(status.ip);}
if(parseInt(status.status)===2){if($('.status-console-text').text()===""){$('.status-console-text').text(LANGUAGE.starting);}}else{$('.status-console-text').text("");}
if(pendingCancelTimeout!==null){clearTimeout(pendingCancelTimeout);}
if(parseInt(status.status)===8){let timeSinceChange=Date.now()-status.change*1000;const cancelTime=600*1000;if(!$('.server-actions').hasClass("status-pending-cancel")&&timeSinceChange<cancelTime){pendingCancelTimeout=setTimeout(()=>{$('.server-actions').addClass("status-pending-cancel");},cancelTime-timeSinceChange);}}}
function updateQueue(queue){if(lastStatus.class==="queueing"){if(queue.queue!==lastStatus.queue.queue){return;}
lastStatus.queue.position--;if(lastStatus.queue.position<1){lastStatus.queue.position=1;}
if(queue.total){lastStatus.queue.count=queue.total;}
var percentage=lastStatus.queue.position/queue.total*100;if(percentage<lastStatusQueuePercentage){lastStatusQueuePercentage=percentage;}
if(queue.maxtime){let minutes=Math.round((queue.maxtime-((Date.now()/1000)-lastStatus.queue.jointime))/60);if(minutes<1||lastStatus.queue.pending==="ready"){minutes=1;}
if(minutes>lastStatus.queue.minutes){minutes=lastStatus.queue.minutes;}
if(lastStatus.queue.minutes-minutes<=3){lastStatus.queue.minutes=minutes;}
lastStatus.queue.time="ca. "+lastStatus.queue.minutes+" min";}
$('.server-status .server-status-label-right').html(lastStatus.queue.position+" / "+lastStatus.queue.count);$('.server-status .server-status-label-left').html(lastStatus.queue.time);$('.server-status .server-status-label-right').show();$('.server-status .server-status-label-left').show();$('.server-status .status').css({backgroundImage:"linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) "+lastStatusQueuePercentage+"%, rgba(0, 0, 0, 0) "+lastStatusQueuePercentage+"%)"});}}
var headstart=0;$('#start').click(function(){if(isWorking('#start')||isWorking('#headstart')||!this._ready){return;}
$('#start').addClass("btn-working");headstart=0;start(headstart,function(){$('#start').removeClass("btn-working");});});$('#headstart').click(function(){$('#headstart').addClass("btn-working");headstart=1;start(headstart,function(){$('#headstart').removeClass("btn-working");});});function start(headstart,callback){aget('/panel/ajax/start.php',{'headstart':headstart},function(data){var status=JSON.parse(data);if(!status.success){if(status.error=="file"){alert({text:LANGUAGE.fileserver,color:"red",buttons:["okay"]});}
else if(status.error=="eula"){alert({title:LANGUAGE.eula,text:LANGUAGE.eulatext,color:"green",buttons:[{color:"green",label:LANGUAGE.eulayes,icon:"check",callback:"acceptEULA()"},"no"]});}
else if(status.error=="wrongversion"){alert({text:LANGUAGE.wrongversion,color:"red",buttons:["okay",{color:"black",label:LANGUAGE.software,icon:"cogs",callback:"window.open('/software/')"}]});}
else if(status.error=="size"){alert({text:LANGUAGE.servertoobig.replace("{{size}}",status.size),color:"red",buttons:["okay",{color:"red",label:LANGUAGE.help,icon:"question-circle",callback:"openSupport('size')"}]});}else if(status.error==="already"){}else{alert({text:status.error,color:"red",buttons:["okay"]});}}else{showStatusAd();requestNotificationPermissions();}
if(typeof(callback)!=="undefined"){callback();}});}
setInterval(countdown,1000);function countdown(){if(lastStatus.status===1){if(COUNTDOWN){COUNTDOWN--;if(COUNTDOWN>=0){$('.server-status .server-status-label-left').html(Math.floor(COUNTDOWN/60)+":"+((COUNTDOWN%60)+"").padStart(2,"0")+' <i class="fas fa-question-circle"></i>');}}else{$('.server-status .server-status-label-left').html('<i class="fas fa-check"></i>');}}}
$('.server-status-label-left').click(function(){if(lastStatus.status===1){openSupport('countdown');}});function acceptEULA(){hideAlert();aget('/panel/ajax/eula.php',{},function(){if(headstart===1){$('#headstart').click();}else{$('#start').click();}});}
$('#stop').click(function(){if(isWorking('#stop')||isWorking('#restart')){return;}
$('#stop').addClass("btn-working");stop(function(){$('#stop').removeClass("btn-working");});});function stop(callback){aget('/panel/ajax/stop.php',function(data){let result=JSON.parse(data);if(!result.success){if(result.error){alert({text:result.error,color:"red",buttons:["okay"]});}else{alert({text:LANGUAGE.error,color:"red",buttons:["okay"]});}}
callback();});}
const cancelButton=new Button($('#cancel'));$('#cancel').click(function(){if(isWorking('#cancel')){return;}
cancelButton.working();showCancelConfirmation();});function showCancelConfirmation(){alert({color:"red",title:LANGUAGE.pending,text:LANGUAGE.pendingwarn,buttons:[{color:"red",label:LANGUAGE.help,icon:"question-circle",callback:"openSupport('pending')"},{color:"green",icon:"check",label:LANGUAGE.no,callbackFunction:()=>{hideAlert();cancelButton.reset();}},{color:"invisible",icon:"exclamation-triangle",label:LANGUAGE.yescancel,callbackFunction:()=>{hideAlert();cancel();},separate:false}]});}
function cancel(){aget('/panel/ajax/cancel.php',function(data){let result=JSON.parse(data);if(!result.success){alert({text:LANGUAGE.error,color:"red",buttons:["okay"]});cancelButton.reset();}else{cancelButton.done();}});}
$('#restart').click(function(){if(isWorking('#restart')||isWorking('#stop')){return;}
$('#restart').addClass("btn-working");restart(function(){$('#restart').removeClass("btn-working");});});function restart(callback){aget('/panel/ajax/restart.php',callback);}
$('#confirm').click(function(){if(isWorking('#confirm')){return;}
$('#confirm').addClass("btn-working");confirm(function(){$('#confirm').removeClass("btn-working");});});$('#confirm').click(confirm);function isWorking(id){if($(id).hasClass("btn-working")){return true;}
return false;}
if(location.hash==="#connect"){showIP();}
function showIP(){let buttons=["okay",{color:"red",label:LANGUAGE.help,icon:"question-circle",callback:"openSupport('connect')"}];if(lastStatus.bedrock&&lastStatus.ip&&lastStatus.port){buttons.unshift({color:"black",label:"",icon:"plus-circle",url:"minecraft://?addExternalServer="+lastStatus.ip+"|"+lastStatus.ip+":"+lastStatus.port,separate:false,target:"_blank"});}
let text="<strong>"+LANGUAGE.ip+"</strong>: "+lastStatus.ip+"<br />";text+="<strong>"+LANGUAGE.port+"</strong>: "+lastStatus.port;if(lastStatus.class==="online"){if(lastStatus.bedrock){text+="<br /><strong>"+LANGUAGE.dynip+"</strong>: "+lastStatus.host;}else{text+="<br /><strong>"+LANGUAGE.dynip+"</strong>: "+lastStatus.dynip;}}
alert({color:"green",title:LANGUAGE.connect,text:text,buttons:buttons});}
if(CONSOLE_PERMISSION){let consoleStream=Legilimens.getInstance().getStream("console");consoleStream.startStatuses=[2];consoleStream.start();consoleStream.addEventListener("line",showLine);}
const linePatterns=[{patterns:[/Preparing spawn area: ([0-9]+%)/],callback:lineProgress,hide:true}];function showLine(e){let hideLine=false;for(let linePattern of linePatterns){let matched=false;for(let pattern of linePattern.patterns){let result=e.rawLine.match(pattern);if(result!==null){matched=true;linePattern.callback(result);if(linePattern.hide){hideLine=true;}
break;}}
if(!matched){linePattern.callback(null);}}
if(!hideLine){$('.status-console-text').html(e.line);}}
function lineProgress(match){if(match===null){$('.status-console-pgb').hide();return;}
$('.status-console-pgb .pgb-bar').css({width:match[1]});$('.status-console-pgb').show();}
function timeWarn(match){if(match===null){$('.status-console-warn').hide();return;}
$('.status-console-warn').show();}
if(navigator.share){$('.js-share-copy').hide();$('.js-share').show();}
$('.js-share-copy').click(function(){let copyText=$(this).data("share");var button=new Button($(this));button.working();copyToClipboard(copyText);setTimeout(function(){button.done();},100);});$('.js-share').click(function(){let shareURL=$(this).data("share");var button=new Button($(this));button.working();navigator.share({url:shareURL});setTimeout(function(){button.done();},100);});var statusAdCountdownInterval=null;showStatusAd();function showStatusAd(){if(statusAdShown){return;}
if(ISXMPL){return;}
if(lastStatus.status!=2&&lastStatus.status!=4&&lastStatus.status!=10&&lastStatus.status!=6){return;}
statusAdShown=true;let previouslyVisible=false;if($('.server-status-ad').css("display")!=="none"){previouslyVisible=true;}
$('.server-status-ad-overlay-close').hide();$('.server-status-ad-overlay-countdown').show();$('.status-ad-countdown').text(30);$('.server-status-ad').show();if(!previouslyVisible){snhb.queue.push(function(){snhb.startAuction(['start_button_unit']);});}
$('.content').scrollTop($('.content').scrollTop()+$('.server-status-ad-container').position().top);if(statusAdCountdownInterval){clearInterval(statusAdCountdownInterval);}
statusAdCountdownInterval=setInterval(statusAdCountdown,1000);}
function statusAdCountdown(){let value=parseInt($('.status-ad-countdown').text());value--;if(value<0){value=0;}
if(value>0){$('.status-ad-countdown').text(value);}else{$('.server-status-ad-overlay-countdown').hide();$('.server-status-ad-overlay-close').show();clearInterval(statusAdCountdownInterval);statusAdCountdownInterval=null;}}
$('.server-status-ad-overlay-close').click(()=>{$('.server-status-ad').hide();});