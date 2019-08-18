 var sortType = "Sort By Rank";
 var globalTotal = "" , globalKey = "";
	 
 function detail(i,url){
	 getname(i,url);
	 document.getElementsByClassName("right-content")[i].style.display = "none";
	 	 document.getElementsByClassName("detail-data")[i].style.display = "block";
		 document.getElementsByClassName("right-content-collapse")[i].style.display = "block";
		  
 }
  function collapse(i){
		document.getElementsByClassName("detail-data")[i].style.display = "none";
		document.getElementsByClassName("right-content-collapse")[i].style.display = "none";
		document.getElementsByClassName("right-content")[i].style.display = "block";
 }
 
 function getname(i,url){
	 var xhttp = new  XMLHttpRequest();
	 xhttp.onreadystatechange= function(){
		 if(xhttp.readyState == 4 && xhttp.status == 200){
			 var htmlData = "",JsonData=[];
			 parseJson = JSON.parse(xhttp.responseText);
			
				JsonData = {};
				JsonData.name = parseJson['name'];
				JsonData.company = parseJson['company'];
				JsonData.location = "dsm";//parseJson['location'];
				JsonData.followers = parseJson['followers'];
				JsonData.following = parseJson['following'];
				JsonData.public_gists = parseJson['public_gists'];
				JsonData.public_repos = parseJson['public_repos'];
				JsonData.profile_url = parseJson['profile_url'];
				JsonData.blog = parseJson['blog'];
				JsonData.email = parseJson['email'];
				var htmlCont = '<div class="detail-data-row"><p>Location</p><p>'+JsonData.location+'</p></div><div class="detail-data-row"> <p>Public Repos</p><p>'+JsonData.public_repos+'</p></div><div class="detail-data-row"> <p>Public Gists</p><p>'+JsonData.public_gists+'</p></div><div class="detail-data-row"> <p>Followers</p><p>'+JsonData.followers+'</p></div><div class="detail-data-row"> <p>Public Gists</p><p>'+JsonData.following+'</p></div>'
				document.getElementsByClassName('detail-data')[i].innerHTML = htmlCont;
			 
		 }else{
			 return {};
		 }
	 }
	xhttp.open('GET',url,true);
	xhttp.setRequestHeader('Origin',"https://api.github.com");
	xhttp.setRequestHeader('Accept','application/json');
	xhttp.setRequestHeader('Content-Type','application/json');
	xhttp.send();
 }
 
 function api(key, pages,pageUrl){
	 if(key.trim()){
	 var xhttp = new  XMLHttpRequest();
	 xhttp.onreadystatechange= function(){
		 if(xhttp.readyState == 4 && xhttp.status == 200){
			var parseJson = (JSON.parse(xhttp.responseText)).items;
			 var total = (JSON.parse(xhttp.responseText)).total_count;
			 globalTotal = total;
			 globalKey = key;
			 document.getElementById('total').innerHTML = "Total Counts: "+total;
			 renderData(parseJson,total,key,pages);
		}
		 
	 }
	if(!pages)
		xhttp.open('GET','https://api.github.com/search/users?q='+key+'&page=1&per_page=5',true);
	else
		xhttp.open('GET',pageUrl,true);
	xhttp.setRequestHeader('Origin',"https://api.github.com");
	xhttp.setRequestHeader('Accept','application/json');
	xhttp.setRequestHeader('Content-Type','application/json');
	xhttp.send();
	 }
 }
 
 function renderData(parseJson,total,key,pages){
	 var htmlData = "";
	 var JsonData = [];
	 parseJson = sortOrder(sortType,parseJson);
	 for(var x in parseJson){
		JsonData[x] = {};
		JsonData[x].login = parseJson[x].login   //getname(parseJson[x].url) ;
		JsonData[x].html_url = parseJson[x].html_url
		//JsonData[x].location = parseJson[x].location
		JsonData[x].score = parseJson[x].score;
		JsonData[x].url = parseJson[x].url;
		JsonData[x].avatar_url = parseJson[x].avatar_url;
	 }
	 globalJsonData = JsonData;
	 for(var i in JsonData){
		htmlData += '<div class="row"><div class="first-row"><div class="left-content"><img src="'+JsonData[i].avatar_url+'" id="profile-icon"></img></div><div class="mid-content"><p class="name">'+JsonData[i].login+'</p><p>Profile URL:'+JsonData[i].html_url+' </p><p>Score:'+JsonData[i].score+' </p>'+
		 ' </div><button class="right-content" id = "btn-detatil"'+i+' onclick="detail('+i+',\''+JsonData[i].url+'\')">Details</button><div class="right-content-collapse"><button id = "btn-detatil"'+i+' onclick="collapse('+i+')">Collapse</button></div></div><div class="detail-data"'+i+'></div></div>';
	 }
	 document.getElementsByClassName('row-container')[0].innerHTML =  htmlData;
	 if(!pages)
		document.getElementsByClassName('pagination')[0].innerHTML = (total && key ) ? pagination(total,key) : pagination(globalTotal,globalKey);
 }
 
 function pagination(total,key){
	var div =  Math.ceil(total/10);
	var html = "";
	var x = 1;
	
	if( div > 3  ){
		html+='<div class="inner-pagination" style="float: right;">'
		html += '<span  class="btn" onclick="numberDecrease(\''+key+'\''+','+x+')">'+'&laquo;'+'</span>'
		html += '<span class="btn" id="first" onclick="callApi(\''+key+'\',this.innerHTML)">'+x+'</span>'
		html += '<span class="btn" id="second" onclick="callApi(\''+key+'\',this.innerHTML)">'+(1+x)+'</span>'
		html += '<span class="btn" id="last" onclick="callApi(\''+key+'\',this.innerHTML)">'+(2+x)+'</span>'
		html += '<span  class="btn" onclick="number(\''+total+'\''+','+x+')">'+'&raquo;'+'</span>'
		html += '</div>'
	}
	else if(total>1){
		html+='<div class="inner-pagination" style="float: right;">'
		
		for(var i=1;i<=total;i++)
			html += '<span id="first" class="btn" onclick="callApi(\''+key+'\',this.innerHTML)">'+i+'</span>'
	}
		html += '</div>'
	return html;
}

function numberDecrease(total,a){
	var x = document.getElementById('first').innerHTML;
	var x2 = document.getElementById('second').innerHTML;
	var x3 = document.getElementById('last').innerHTML;
	if(parseInt(x) > 1){
		document.getElementById('first').innerHTML = parseInt(x) - 1;
		document.getElementById('second').innerHTML = (x);
		document.getElementById('last').innerHTML = (x2);
	}
}
function number(total,key){
	var x = document.getElementById('first').innerHTML;
	var x2 = document.getElementById('second').innerHTML;
	var x3 = document.getElementById('last').innerHTML;
	if(parseInt(total) > parseInt(x)){
		document.getElementById('first').innerHTML = (x2);;
		document.getElementById('second').innerHTML = (x3);;
		document.getElementById('last').innerHTML = parseInt(x3)+1;
	}
}
function callApi(key,page){
	globalPage = page;
	api(key, (page),"https://api.github.com/search/users?q="+key+"&page="+page+"&per_page=5");
}
function sortName(name){
	sortType = name;
	renderData(globalJsonData);
}
function sortOrder(sortType,parseJson){
	if(sortType=="Sort By Name")
	return parseJson.sort(function(a,b){
		 if(a.login > b.login)
			 return 1;
		 else if(a.login < b.login)
			 return -1;
		 else
			 return 0;
	 });
	 else 
		 return parseJson.sort(function(a,b){
		 if(a.score > b.score)
			 return -1;
		 else if(a.score < b.score)
			 return 1;
		 else
			 return 0;
	 });
	 
}