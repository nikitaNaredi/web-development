 
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
			 //console.log("successfull::"+key+"::"+xhttp.responseText);
			 var htmlData = "",JsonData=[];
			 var parseJson = JSON.parse(xhttp.responseText);
			
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
				console.log("JsonData 1 :: "+JSON.stringify(JsonData));
				
				var htmlCont = '<div class="detail-data-row"><p>Location</p><p>'+JsonData.location+'</p></div><div class="detail-data-row"> <p>Public Repos</p><p>'+JsonData.public_repos+'</p></div><div class="detail-data-row"> <p>Public Gists</p><p>'+JsonData.public_gists+'</p></div><div class="detail-data-row"> <p>Followers</p><p>'+JsonData.followers+'</p></div><div class="detail-data-row"> <p>Public Gists</p><p>'+JsonData.following+'</p></div>'
				document.getElementsByClassName('detail-data')[i].innerHTML = htmlCont;
				//return JsonData;
			 
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
 
 function api(key,pages,pageUrl){
	 if(key.trim()){
	 console.log("key::"+key);
	 var xhttp = new  XMLHttpRequest();
	 xhttp.onreadystatechange= function(){
		 if(xhttp.readyState == 4 && xhttp.status == 200){
			 console.log("successfull::"+key+"::"+xhttp.responseText);
			 var htmlData = "";
			 var JsonData=[];
			 var parseJson = (JSON.parse(xhttp.responseText)).items;
			 var total = (JSON.parse(xhttp.responseText)).total_count;
			 document.getElementById('total').innerHTML = "Total Counts: "+total;
			 for(var x in parseJson){
				JsonData[x] = {};
				JsonData[x].login = parseJson[x].login   //getname(parseJson[x].url) ;
				JsonData[x].html_url = parseJson[x].html_url
				//JsonData[x].location = parseJson[x].location
				JsonData[x].score = parseJson[x].score;
				JsonData[x].url = parseJson[x].url;
				console.log("JsonData -- :: "+x+"::"+JSON.stringify(JsonData));
				
			 }
			 console.log("JsonData :: "+JSON.stringify(JsonData));
			 /* var JsonData = [{
						"name" : "nikita",
						"profile_url" : "www.google.com",
						"blog" : "http://tonsky.me/",
						"location": "Moscow, Russia",
						"email": null,
						"hireable": null,
						"bio": "Chief Burnout Officer",
						"public_repos": 91,
						"public_gists": 24,
						"followers": 1865,
						"following": 39	},	
						{
						"name" : "nikita",
						"profile_url" : "www.google.com",
						"blog" : "http://tonsky.me/",
						"location": "Moscow, Russia",
						"email": null,
						"hireable": null,
						"bio": "Chief Burnout Officer",
						"public_repos": 91,
						"public_gists": 24,
						"followers": 1865,
						"following": 39	}
			 ]; */
			 for(var i in JsonData){
				/* htmlData += '<div class="row"><div class="first-row"><div class="left-content"><img src="niki.jpg" id="profile-icon"></img></div><div class="mid-content"><p class="name">'+JsonData[i].login+'</p><p>Profile URL:'+JsonData[i].html_url+' </p><p>Score:'+JsonData[i].score+' </p>'+
				 ' </div><div class="right-content"><button id = "btn-detatil"'+i+' onclick="detail('+i+','+JsonData[i].url+')">Details</button></div><div class="right-content-collapse"><button id = "btn-detatil"'+i+' onclick="collapse('+i+')">Collapse</button></div></div><div class="detail-data"'+i+'><div class="detail-data-row"><p>Location</p><p>'+JsonData[i].location+'</p></div><div class="detail-data-row"> <p>Public Repos</p><p>'+JsonData[i].public_repos+'</p></div><div class="detail-data-row"> <p>Public Gists</p><p>'+JsonData[i].public_gists+'</p></div><div class="detail-data-row"> <p>Followers</p><p>'+JsonData[i].followers+'</p></div><div class="detail-data-row"> <p>Public Gists</p><p>'+JsonData[i].following+'</p></div></div></div>';*/
				 
				 htmlData += '<div class="row"><div class="first-row"><div class="left-content"><img src="niki.jpg" id="profile-icon"></img></div><div class="mid-content"><p class="name">'+JsonData[i].login+'</p><p>Profile URL:'+JsonData[i].html_url+' </p><p>Score:'+JsonData[i].score+' </p>'+
				 ' </div><div class="right-content"><button id = "btn-detatil"'+i+' onclick="detail('+i+',\''+JsonData[i].url+'\')">Details</button></div><div class="right-content-collapse"><button id = "btn-detatil"'+i+' onclick="collapse('+i+')">Collapse</button></div></div><div class="detail-data"'+i+'></div></div>';
			 }
			 document.getElementsByClassName('row-container')[0].innerHTML =  htmlData;
			 if(!pages)
			 document.getElementsByClassName('pagination')[0].innerHTML =  pagination(total,key);
			 
			 
			 
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
 
 function pagination(total,key){
	 
	var div =  Math.ceil(total/10);
	var rem = total%10;
	var html = "";
	var x = 1;
	
	if( div > 3  ){
		html += '<span onclick="callApi(\''+key+'\''+','+x+')">'+'<'+'</span>'
		//for(var k=1;k<=3;k++)
		html += '<span id="first" onclick="callApi(\''+key+'\','+x+')">'+x+'</span>'
	html += '<span id="second" onclick="callApi(\''+key+'\','+x+')">'+(1+x)+'</span>'
	html += '<span id="last" onclick="callApi(\''+key+'\','+x+')">'+(2+x)+'</span>'
	html += '<span onclick="number(\''+total+'\''+','+x+')">'+'>'+'</span>'
	}
		
	return html;
}
function number(total,key){
	var x = document.getElementById('first').innerHTML;
	var x2 = document.getElementById('second').innerHTML;
	var x3 = document.getElementById('last').innerHTML;
	console.log(x+" "+x2+" "+x3);
	if(total>x){
		document.getElementById('first').innerHTML = x2;
		document.getElementById('second').innerHTML = x3;
		document.getElementById('last').innerHTML = (1+x3);
}}
function callApi(key,page){
	debugger;
	api(key,page,"https://api.github.com/search/users?q="+key+"&page="+page+"&per_page=5");
	debugger;
}