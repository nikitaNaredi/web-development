 
 function detail(i){
	 document.getElementsByClassName("right-content")[i].style.display = "none";
	 	 document.getElementsByClassName("detail-data")[i].style.display = "block";
		 document.getElementsByClassName("right-content-collapse")[i].style.display = "block";
		  
 }
  function collapse(i){
	 	 document.getElementsByClassName("detail-data")[i].style.display = "none";
		 document.getElementsByClassName("right-content-collapse")[i].style.display = "none";
		  document.getElementsByClassName("right-content")[i].style.display = "block";
 }
 
 function getname(){
	 var xhttp = new  XMLHttpRequest();
	 xhttp.onreadystatechange= function(){
		 if(xhttp.readyState == 4 && xhttp.status == 200){
			 console.log("successfull::"+key+"::"+xhttp.responseText);
			 var htmlData = "",JsonData=[];
			 var parseJson = JSON.parse(xhttp.responseText);
			 var detail = getname();
			 for(var x in parseJson){
				 JsonData[x] = {};
				// JsonData[x].name = getname();
				// JsonData[x].name = getname();
			 }
		 }
	 }
	xhttp.open('GET','https://api.github.com/search/users?q='+key,true);
	xhttp.setRequestHeader('Origin',"https://api.github.com");
	xhttp.setRequestHeader('Accept','application/json');
	xhttp.setRequestHeader('Content-Type','application/json');
	xhttp.send();
 }
 
 function api(key){
	 if(key.trim()){
	 console.log("key::"+key);
	 var xhttp = new  XMLHttpRequest();
	 xhttp.onreadystatechange= function(){
		 if(xhttp.readyState == 4 && xhttp.status == 200){
			 console.log("successfull::"+key+"::"+xhttp.responseText);
			 var htmlData = "",JsonData=[];
			 var parseJson = JSON.parse(xhttp.responseText);
			 
			 for(var x in parseJson){
				// var detail = this.getname();
				 JsonData[x] = {};
				// JsonData[x].name = getname();
				// JsonData[x].name = getname();
			 }
			 var JsonData = [{
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
			 ];
			 for(var i in JsonData){
				 htmlData += '<div class="row"><div class="first-row"><div class="left-content"><img src="niki.jpg" id="profile-icon"></img></div><div class="mid-content"><p class="name">'+JsonData[i].name+'</p><p>Profile URL:'+JsonData[i].profile_url+' </p><p>Location:'+JsonData[i].location+' </p><p>Public Repos:'+JsonData[i].public_repos+
				 ' </p></div><div class="right-content"><button id = "btn-detatil"'+i+' onclick="detail('+i+')">Details</button></div><div class="right-content-collapse"><button id = "btn-detatil"'+i+' onclick="collapse('+i+')">Collapse</button></div></div><div class="detail-data"'+i+'><div class="detail-data-row"><p>Location</p><p>'+JsonData[i].location+'</p></div><div class="detail-data-row"> <p>Public Repos</p><p>'+JsonData[i].public_repos+'</p></div><div class="detail-data-row"> <p>Public Gists</p><p>'+JsonData[i].public_gists+'</p></div><div class="detail-data-row"> <p>Followers</p><p>'+JsonData[i].followers+'</p></div><div class="detail-data-row"> <p>Public Gists</p><p>'+JsonData[i].following+'</p></div></div></div>';
			 }
			 document.getElementsByClassName('row-container')[0].innerHTML =  htmlData;
			 //function getName();
			 //function getIcon();
			 
		 }
	 }
	
	xhttp.open('GET','https://api.github.com/search/users?q='+key,true);
	xhttp.setRequestHeader('Origin',"https://api.github.com");
	xhttp.setRequestHeader('Accept','application/json');
	xhttp.setRequestHeader('Content-Type','application/json');
	xhttp.send();
	 }
 }
 //https://medium.com/@abderrahman.hamila/cors-is-not-your-nightmare-but-6cbc749400cf