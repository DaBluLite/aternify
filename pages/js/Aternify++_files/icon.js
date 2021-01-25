class Icon{constructor(element){this.styles=["fas","far","fal","fad","fab"];this.spinningClass="fa-spin";this.iconPrefix="fa-";this.$element=element;this.style="fas";this.spinning=false;this.icon="";for(let className of this.$element.classList){if(this.styles.includes(className)){this.style=className;continue;}
if(className===this.spinningClass){this.spinning=true;continue;}
if(className.substr(0,this.iconPrefix.length)===this.iconPrefix){this.icon=className.substr(this.iconPrefix.length);}}}
getStyle(){return this.style;}
setStyle(style){this.$element.classList.remove(this.style);this.style=style;this.$element.classList.add(this.style);return this;}
getIcon(){return this.icon;}
setIcon(icon){this.$element.classList.remove(this.iconPrefix+this.icon);this.icon=icon;this.$element.classList.add(this.iconPrefix+this.icon);return this;}
setColor(color){if(!color){this.$element.style.color="";}else{this.$element.style.color="var(--color-"+color+")";}
return this;}
setSpinning(spinning){if(this.spinning===spinning){return this;}
this.spinning=spinning;if(this.spinning){this.$element.classList.add(this.spinningClass);}else{this.$element.classList.remove(this.spinningClass);}
return this;}
hide(){this.$element.style.display="none";return this;}
show(){this.$element.style.display="inherit";return this;}}