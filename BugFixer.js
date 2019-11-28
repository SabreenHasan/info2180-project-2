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
    if(mail.length!=0 && checkPassword(word)){
    var vars = "email="+mail + "&password="+word;
    hr.open("POST", url, true);
    
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    hr.onreadystatechange = function() {
     //console.log(hr.readyState);
	    if(hr.readyState == 4 && hr.status == 200) {
		   /* var return_data = hr.responseText;
			document.getElementById("userName").placeholder = return_data;
			*/
			alert("Login successfull!");
	    }
    }
    
    hr.send(vars); 
    //location.href = "dashboard.html";
    window.location.href="dashboard.html";
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
    
    var ma = sanitizeHTML(document.getElementById("emailAddress").value);
    if(ma.length!=0 && pw.length!=0  && ln.length!=0 && fn.length!=0){
    if(checkPassword(pw)==true && checkNames(fn)==true &&checkNames(ln)==true){
    var vars = "newMail="+ma + "&newWord="+pw +"&newFName="+fn+"&newLName="+ln;
    hr.open("POST", url, true);
    
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		   /* var return_data = hr.responseText;
		   
			document.getElementById("userName").placeholder = return_data;
			*/
			
			alert("User added successfully");
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
    var duty = sanitizeHTML(document.getElementById("assignedTo").value);
    var type =sanitizeHTML(document.getElementById("type").value);
    var priority = sanitizeHTML(document.getElementById("priority").value);
    if(title.length!=0 && des.length!=0  && duty.length!=0 && type.length!=0 && priority!=null){
    
    
    var vars = "title="+title + "&description="+des +"&assignedTo="+duty+"&type="+type +"&priority=" + priority;
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
    // Send the data to PHP now... and wait for response to update the status div
    hr.send(vars); // Actually execute the request
    //document.getElementById("status").innerHTML = "processing...";
	
    
    }
    else{
     alert("ERROR: EMPTY/NULL FIELD DETECTED");
    }
    }
		
		
		
	}, false);
	
