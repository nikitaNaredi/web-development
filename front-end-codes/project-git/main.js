 
 function detail(){
	 document.getElementsByClassName("right-content")[0].style.display = "none";
	 	 document.getElementsByClassName("detail-data")[0].style.display = "block";
		 document.getElementsByClassName("right-content-collapse")[0].style.display = "block";
		  
 }
  function collapse(){
	 	 document.getElementsByClassName("detail-data")[0].style.display = "none";
		 document.getElementsByClassName("right-content-collapse")[0].style.display = "none";
		  document.getElementsByClassName("right-content")[0].style.display = "block";
 }
 function api(key){
	 if(key.trim()){
	 console.log("key::"+key);
	 var xhttp = new  XMLHttpRequest();
	 xhttp.onreadystatechange= function(){
		 if(xhttp.readyState == 4 && xhttp.status == 200){
			 console.log("successfull::"+key+"::"+xhttp.responseText);
			 var JsonData = '';
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