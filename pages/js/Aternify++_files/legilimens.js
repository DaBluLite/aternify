let legilimensInstance=null;class Legilimens{static getInstance(){if(!legilimensInstance){legilimensInstance=new this();}
return legilimensInstance;}
constructor(){this.hermesConnected=hermes.readyState===1&&hermesReady;this.connected=false;this.streams={};this.availableStreams={"console":ConsoleStream,"stats":StatsStream}
this.connectStatuses=[1,2,3,4];this.status=parseInt(lastStatus.status);this.retryInterval=setInterval(this.tryToStartStreams.bind(this),15000);$('#status').on("status:update",this.onStatusChange.bind(this)).on("hermes:message",this.onMessage.bind(this)).on("hermes:ready",this.onHermesConnected.bind(this)).on("hermes:disconnect",this.onHermesDisconnected.bind(this));}
onStatusChange(e,newStatus){this.status=parseInt(newStatus.status);for(let stream of Object.keys(this.streams)){this.streams[stream].onStatusChange(this.status);}}
onMessage(e,message){if(!message.type){return false;}
switch(message.type){case "connected":this.connected=true;break;case "disconnected":this.connected=false;for(let stream of Object.keys(this.streams)){this.streams[stream].started=false;}
break;default:if(!message.stream||!this.streams[message.stream]){return false;}
this.streams[message.stream].onMessage(message);}}
onHermesConnected(){this.hermesConnected=true;this.tryToStartStreams();}
onHermesDisconnected(){this.hermesConnected=false;for(let stream of Object.keys(this.streams)){this.streams[stream].started=false;}}
getStream(stream){if(!this.availableStreams[stream]){return false;}
if(this.streams[stream]){return this.streams[stream];}
this.streams[stream]=new this.availableStreams[stream](this);return this.streams[stream];}
tryToStartStreams(){for(let stream of Object.keys(this.streams)){this.streams[stream].tryToStart();}}
send(stream,type,data){if(hermes.readyState!==1||!hermesReady){return false;}
let message={stream:stream,type:type};if(typeof data!=="undefined"){message.data=data;}
hermes.send(JSON.stringify(message));}}
class Stream extends EventTarget{constructor(legilimens){super();this.legilimens=legilimens;this.started=false;this.shouldStart=false;this.name=null;this.startStatuses=this.legilimens.connectStatuses;}
send(type,data){this.legilimens.send(this.name,type,data);}
onStatusChange(status){this.tryToStart();this.tryToStop();}
onMessage(message){switch(message.type){case "started":this.dispatchEvent(new Event("started"));this.started=true;break;case "stopped":this.dispatchEvent(new Event("stopped"));this.started=false;break;default:let func="on"+message.type.charAt(0).toUpperCase()+message.type.slice(1);if(typeof this[func]==="function"){this[func](message.data);}}}
start(){this.shouldStart=true;this.tryToStart();}
shouldBeStarted(){return this.shouldStart&&this.startStatuses.includes(this.legilimens.status);}
tryToStart(){if(this.started||!this.legilimens.hermesConnected||!this.shouldBeStarted()){return false;}
this.send("start");}
stop(){this.shouldStart=false;this.tryToStop();delete this.legilimens.streams[this.name];}
tryToStop(){if(!this.started||(this.shouldBeStarted())){return false;}
this.send("stop");}}
class ConsoleStream extends Stream{constructor(legilimens){super(legilimens);this.name="console";this.ansi_up=new AnsiUp;}
onLine(data){let line=this.parseLine(data);let event=new Event("line");event.rawLine=data;event.line=line;this.dispatchEvent(event);}
parseLine(line){line=line.replace(/\u001b[()][AB012]/g,"");line=line.replace(/^.?\[?m?>\.\.\.\.\s/,"");line=this.ansi_up.ansi_to_html(line);return line;}
sendCommand(command){this.send("command",command);}}
class StatsStream extends Stream{constructor(legilimens){super(legilimens);this.name="stats";}
onStats(data){console.log(data);}}