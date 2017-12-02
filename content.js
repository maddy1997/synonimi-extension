var flag=0;
var div;
var a="";
var failed=0;
var x;
var y;
function getSelectedText() {
        var text = "";
        if (typeof window.getSelection != "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            text = document.selection.createRange().text;
        }
        return text;
    }
    
function doSomethingWithSelectedText() {
	if(flag==1){
		div.innerHTML="";div.style.visibility="hidden";flag=0;}
	else{
		x=event.pageX;
		y=event.pageY;
        
		var selectedText = getSelectedText();
        makeacall(selectedText);
		}
	

}
function makeacall(selectedText){
	selectedText=selectedText.trim();
	if(selectedText!=''){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "https://words.bighugelabs.com/api/2/c8acfbde0613d2e57ce75bf758da2e45/"+selectedText+"/json", true,selectedText);
		xhr.send();
		xhr.addEventListener("readystatechange", processRequest, false);
		}
function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
		process(response);
	}
	else if(xhr.status==404){
		failed=1;
		process(response);
	}
	
}
}
process=function(result) { 
	list=[];
	for (key in result) { 
    a=result[key]['syn'];
	list.push(result[key]['syn']);
	}
popup(list);	
}
function popup(list){
	if(x<100){x=100;}
	else x+=20;
	div.style.left= x+'px';
	y=y+10;
    div.style.top=y+'px';
	div.style.visibility="visible";
	for(var i=0;i<list.length;i++){
		if(list[i]!=undefined){
			div.innerHTML=div.innerHTML+list[i]+"<br/>";
		}
	}
	if(failed==1){
		div.innerHTML="Sorry, no results!";
		failed=0;
	}
	if(list==""){
			div.innerHTML="Sorry,no result";
	}
	flag=1;
}
function action(){
	if(document.readyState === 'ready' || document.readyState === 'complete'){
		 div=document.createElement('div');
	document.body.appendChild(div);
	div.style.backgroundColor= '#555';
    div.style.color= '#fff';
    div.style.textAlign= 'left';
    div.style.borderRadius= '6px';
    div.style.padding= '8px 0';
    div.style.position= 'absolute';
    div.style.zIndex= '1';
    div.style.marginLeft= '-80px';
	div.style.width="300px";
	div.style.overflowX="auto";
	div.style.overflowY="auto";
	div.style.font="italic 20px arial,serif";
	document.onmouseup=doSomethingWithSelectedText;
    document.onkeyup=doSomethingWithSelectedText;
}
}
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
		action();
    }
}
}

