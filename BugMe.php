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
$_Session['email']= $_POST['email'];
$_Session['password'] =$_POST['password'];
$_Session['newLname']=$_POST['newLName'];
$_Session['newFname']=$_POST['newFName'];
$_Session['password']=$_POST['newWord'];
$_Session['newMail'] = $_POST['newMail'];
