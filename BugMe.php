<?php
header("Access-Control-Allow-Origin: *");

$host = getenv('IP');
$username = 'TC';
$password = 'Spartan!117';
$dbname = 'AppDatabase';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
session_start();
//User Attributes
$_Session['UserEmail']= $_POST['email'];
$_Session['UserPassword'] =$_POST['password'];
$_Session['newLname']=$_POST['newLName'];
$_Session['newFname']=$_POST['newFName'];
$_Session['newPassword']=$_POST['newWord'];
$_Session['newMail'] = $_POST['newMail'];

//Issue Attributes
$_Session['UserEmail']= $_POST['email'];
$_Session['UserPassword'] =$_POST['password'];
$_Session['Type']=$_POST['newLName'];
$_Session['Assigned']=$_POST['newFName'];
$_Session['Created']=$_POST['newFName'];// should store id of current user
$_Session['newPassword']=$_POST['newWord'];
$_Session['Priority'] = $_POST['newMail'];

try {
    
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO Users (firstname, lastname, email,password)
    VALUES (".$_Session['newFname'].",".$_Session['newLname'].",". $_Session['newMail'].",".$_Session['newPassword'].")";
    // use exec() because no results are returned
    $conn->exec($sql);
    //echo "New record created successfully";
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }   