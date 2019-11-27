var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

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
		if (event.target.matches('#submitButton')) {
		
		var hr = new XMLHttpRequest();
   
   	var fn =document.getElementById("firstName").value;
    var ln =document.getElementById("lastName").value;
    var pw =document.getElementById("password").value;
    var ma =document.getElementById("emailAddress").value;
    
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
	}, false);
	
