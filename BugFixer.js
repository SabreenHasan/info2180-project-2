var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

var checkNames = function(str){
 if(str.match("^[a-zA-Z]+$")){
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
 if(str.length>=8 && hasUpper==true && (!str.match("^[a-zA-Z]+$"))){
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
document.addEventListener('click', function (event) {
    
	if (event.target.matches('#logInButton')) {
		if(document.getElementById('userName').value === 'admin@bugme.com' && document.getElementById('password').value =='password123' ){
			
		}
		var hr = new XMLHttpRequest();
   
   	var mail =document.getElementById("userName").value;
    var word =document.getElementById("password").value;
    
    var vars = "email="+mail + "&password="+word;
    hr.open("POST", url, true);
    
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		   /* var return_data = hr.responseText;
			document.getElementById("userName").placeholder = return_data;
			*/
			alert("Data added successfully");
	    }
    }
    // Send the data to PHP now... and wait for response to update the status div
    hr.send(vars); // Actually execute the request
    //document.getElementById("status").innerHTML = "processing...";
	}
	// for new users
		if (event.target.matches('#submitButton')) {
		
		var hr = new XMLHttpRequest();
   
   	var fn =document.getElementById("firstName").value;
   	
    var ln =document.getElementById("lastName").value;
    var pw =document.getElementById("PW").value;
    
    var ma =document.getElementById("emailAddress").value;
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
			alert("Data added successfully");
	    }
    }
    // Send the data to PHP now... and wait for response to update the status div
    hr.send(vars); // Actually execute the request
    //document.getElementById("status").innerHTML = "processing...";
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
   
   	var fn =document.getElementById("FName").value;
    var ln =document.getElementById("LName").value;
    var pw =document.getElementById("Pass").value;
    var ma =document.getElementById("emailAdd").value;
    var priority =document.getElementById("order").value;
    if(ma.length!=0 && pw.length!=0  && ln.length!=0 && fn.length!=0 && priority!=null){
    
    if(checkNames(fn) &&checkPassword(pw)&&checkNames(ln)){
    var vars = "newMail="+ma + "&newWord="+pw +"&newFName="+fn+"&newLName="+ln;
    hr.open("POST", url, true);
    
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		   /* var return_data = hr.responseText;
			document.getElementById("userName").placeholder = return_data;
			*/
			alert("Data added successfully");
	    }
    }
    // Send the data to PHP now... and wait for response to update the status div
    hr.send(vars); // Actually execute the request
    //document.getElementById("status").innerHTML = "processing...";
	
    }
    else{
     alert("INVALID DATA ENTRY");
    }
    }
    else{
     alert("ERROR: EMPTY/NULL FIELD DETECTED");
    }
    }
		
		
		
	}, false);
	
