

var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

var checkNames = function(str){
 /*if(str.match("^[a-zA-Z]+$")){
  return true;
 }
 else{
  return false;
 }*/
 if(str.match(/^[a-zA-Z]*$/)){
  return true;
 }
 else{
  return false;
 }
}
var checkPassword = function(str){
 var hasUpper = false;
 for (var i = 0; i < str.length; i++) {
  if(str.charAt(i)==str.charAt(i).toUpperCase()){
   hasUpper = true;
  }
}
 if(str.length>=8 && hasUpper==true && (!str.match(/^[a-zA-Z]*$/))){
  return true;
 }
/* else{
  alert("Invalid Password format");
 }*/
 else{
  return false;
 }
 }


 var url = "https://2418ec375db34633b1640c22a8084048.vfs.cloud9.us-east-1.amazonaws.com/BugMe.php";
 //var url = "BugMe.php";
document.addEventListener('click', function (event) {
    
	if (event.target.matches('#logInButton')) {
		/*if(document.getElementById('userName').value === 'admin@bugme.com' && document.getElementById('password').value =='password123' ){
			
		}*/
		var hr = new XMLHttpRequest();
    
   	var mail = sanitizeHTML(document.getElementById("userName").value);
    var word = sanitizeHTML(document.getElementById("PW").value);
    if(mail.length!=0 && word.length!=0){
    var vars = "email="+mail + "&password="+word;
    hr.open("POST", url, true);
    
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    hr.onreadystatechange = function() {
     //console.log(hr.readyState);
	    if(hr.readyState == 4 && hr.status == 200) {
		   /* var return_data = hr.responseText;
			document.getElementById("userName").placeholder = return_data;
			*/
			//alert("Login successfull!");
			//var result = hr.responseText.split("|");
			var result = hr.responseText.trim();;

			alert(result);
			if(result == "Welcome"){
			 	window.location = "dashboard.html";
			}
		
			 
			
			//window.location.href="dashboard.html";
			
	    }
    }
    
    hr.send(vars); 
    
    }
    else{
     alert("INVALID LOGIN DATA");
    }
	}
	// for new users
		if (event.target.matches('#submitButton')) {
		
		var hr = new XMLHttpRequest();
   
   	var fn =sanitizeHTML(document.getElementById("firstName").value);
   	
    var ln =sanitizeHTML(document.getElementById("lastName").value);
    var pw =sanitizeHTML(document.getElementById("password").value);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
    var ma = sanitizeHTML(document.getElementById("emailAddress").value);
    if(ma.length!=0 && pw.length!=0  && ln.length!=0 && fn.length!=0){
    if(checkPassword(pw)==true && checkNames(fn)==true &&checkNames(ln)==true){
    var vars = "newMail="+ma + "&newWord="+pw +"&newFName="+fn+"&newLName="+ln+ "&dateU=" + today;
    hr.open("POST", url, true);
    
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		   /* var return_data = hr.responseText;
		   
			document.getElementById("userName").placeholder = return_data;
			*/
			var return_data = hr.responseText;
			alert(return_data);
			
	    }
    }
    // Send the data to PHP now... and wait for response to update the status div
    hr.send(vars); // Actually execute the request
    document.getElementById("lastName").value="";
    document.getElementById("firstName").value="";
    document.getElementById("password").value="";
    document.getElementById("emailAddress").value="";
    
    }
    else{
     alert("INVALID DATA ENTRY \n Ensure that names contain no digits and that Password: \n contains at least one number, one letter,one Capital letter and must be at least 8 characters long");
    }
	}
	else{
		 alert("ERROR: EMPTY/NULL FIELD DETECTED");
		}
		}
	// for new issues
	if (event.target.matches('#submission')) {
		
		var hr = new XMLHttpRequest();
   
   	var title = sanitizeHTML(document.getElementById("title").value);
    var des = sanitizeHTML(document.getElementById("description").value);
    var d = document.getElementById("assignedTo");
    var t =document.getElementById("type");
    var type = t.options[t.selectedIndex].text;
    //alert(type);
    
    
   var p = document.getElementById("priority");
    var priority = p.options[p.selectedIndex].text;
   
   var duty = d.options[d.selectedIndex].value;
  // alert(duty);
    // causing problems
  // var priority = "";
    if(title.length !=0 && des.length!=0  && duty.length!=0){
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
    
    var vars = "title="+title + "&description="+des +"&assignedTo="+duty+"&type="+type +"&priority=" + priority  +"&dateI="+today;
    hr.open("POST", url, true);
    
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		   /* var return_data = hr.responseText;
			document.getElementById("userName").placeholder = return_data;
			*/
			alert("Issue added successfully");
	    }
    }
   
    hr.send(vars); 
    document.getElementById("title").value="";
    document.getElementById("description").value="";
    
    //document.getElementById("status").innerHTML = "processing...";
	
    
    }
    else{
     alert("ERROR: EMPTY/NULL FIELD DETECTED");
    }
    }
		
		
		
	}, false);
	
document.addEventListener('click', function (event) {
 
 
 if(event.target.matches('#cancelLogoutButton')) {
    window.location.href="dashboard.html";
 }
 if(event.target.matches('#logoutButton')) {
    var lg = new XMLHttpRequest();
     lg.open("POST", url, true);
    
    lg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    lg.onreadystatechange = function() {
	    if(lg.readyState == 4 && lg.status == 200) {
		    /*alert("Logging Off...");
		    alert(lg.responseText);*/
		    
	    }
    }

    lg.send("logoff=yes"); // Actually execute the request
    window.location.href="login-page.html";
 }
  

 if(event.target.matches('.Details')){
  var tit  = event.target.innerHTML;
  //alert(tit);
  var lg = new XMLHttpRequest();
     lg.open("POST", url, true);
    
    lg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    lg.onreadystatechange = function() {
	    if(lg.readyState == 4 && lg.status == 200) {
	    
	    
	    }
    }

    lg.send("Ticket="+tit);
 }
  if(event.target.matches('.filter')){
   
   var lg = new XMLHttpRequest();
     lg.open("POST", url, true);
     var criteria = event.target.innerHTML;
    lg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    lg.onreadystatechange = function() {
	    if(lg.readyState == 4 && lg.status == 200) {
	     //alert(lg.responseText);
	    alert(criteria);
	    document.getElementById("Issues").innerHTML=lg.responseText;
	    
	    }
    }

    lg.send("Issues="+ criteria);
  }
  if(event.target.matches('#closed')){
   alert("closing");
   var lg = new XMLHttpRequest();
     lg.open("POST", url, true);
     var patient = document.getElementById("issueNum").innerHTML;
    lg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
    lg.onreadystatechange = function() {
	    if(lg.readyState == 4 && lg.status == 200) {
	     alert(lg.responseText);
	    //alert(criteria);
	    
	    
	    }
    }

    lg.send("closed="+patient +"&update="+today);
  }
  if(event.target.matches('#inProgress')){
   
   var lg = new XMLHttpRequest();
     lg.open("POST", url, true);
     var patient = document.getElementById("issueNum").innerHTML;
    lg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
    lg.onreadystatechange = function() {
	    if(lg.readyState == 4 && lg.status == 200) {
	     alert(lg.responseText);
	    //alert(criteria);
	    
	    
	    }
    }

    lg.send("progress="+patient +"&update="+today);
  }
 if(event.target.matches('#CIB')){
  window.location = "new-issue.html";
 }
}, false);

window.onload = (event) => {
   var lg = new XMLHttpRequest();
     lg.open("POST", url, true);
   
    lg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    lg.onreadystatechange = function() {
	    if(lg.readyState == 4 && lg.status == 200) {
	    document.getElementById("Issues").innerHTML=lg.responseText;
	    alert("Loading Issues...");
	    }
    }

    lg.send("Issues=ALL"); 
    
  
}; // use this to enter table with help of session variables and maybe ajax request



var loadinfo= function(){
 var lg = new XMLHttpRequest();
 
     lg.open("POST", url, true);
   
    lg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    lg.onreadystatechange = function() {
	    if(lg.readyState == 4 && lg.status == 200) {
	     var info = lg.responseText.split("|");
	     alert("Loading Details");
	     
	    document.getElementById("fullDescription").innerHTML=info[2];
	     document.getElementById("dateCreated").innerHTML+= ": "+info[4];
	     document.getElementById("assignment").innerHTML+= info[7]+ " " +info[8];
	     document.getElementById("typeInfo").innerHTML+=  info[3];
	     document.getElementById("issueNum").innerHTML+=  info[0];
	     document.getElementById("detailsTitle").innerHTML=  info[1];
	     document.getElementById("priInfo").innerHTML+=  info[5];
	     document.getElementById("statInfo").innerHTML+=  info[6];
	     document.getElementById("dateUpdated").innerHTML+=  info[9];
	    
	    }
    }

    lg.send("Details=show"); 

}

var loadMembers = function(){
 var lg = new XMLHttpRequest();
     lg.open("POST", url, true);
    
    lg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    lg.onreadystatechange = function() {
	    if(lg.readyState == 4 && lg.status == 200) {
	     
	     document.getElementById("members").innerHTML=lg.responseText;
	     
		    /*alert("Logging Off...");
		    alert(lg.responseText);
		    */
	    }
    }

    lg.send("members=show");
}
