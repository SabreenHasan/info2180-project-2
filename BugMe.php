<?php
header("Access-Control-Allow-Origin: *");
/*
$host = getenv('IP');
$username = 'TC';
$password = 'Spartan!117';
$dbname = 'AppDatabase';*/

$host = getenv('IP');
$username = $_POST['username'];
$password = $_POST['password'];
$dbname = 'AppDatabase';

$hash = mt_rand();
$options = array('cost' => 11);

if (password_verify($password, $hash)) {
    if (password_needs_rehash($hash, PASSWORD_DEFAULT, $options)) {
        $newHash = password_hash($password, PASSWORD_DEFAULT, $options);
    }
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
}


$_Session['Created']=$_POST['newFName'];// should store id of current user

}




    ?>
    <?php if(isset($_POST['email']) && isset($_POST['password'])): ?>
    <?php
    session_start();
    $_Session['UserEmail']= $_POST['email'];
    $_Session['UserPassword'] =$_POST['password'];
    
    /*$result = mysql_query("SELECT id FROM mytable WHERE city = 'c7'");
    if(mysql_num_rows($result) == 0) {
         // row not found, do stuff...
    } else {
        // do other stuff...
    }*/
    $stmt2 = $conn->prepare('SELECT id,password FROM Users WHERE email =  :word');
    $ma = filter_input(INPUT_POST, 'email',
    FILTER_SANITIZE_SPECIAL_CHARS); 
    
    $stmt2->bindParam(':word', $ma, PDO::PARAM_STR); 
    
    $stmt2->execute();
    
    $locale = $stmt2->fetch(PDO::FETCH_ASSOC);
    if($locale['id']==0){
        $result= "User not Found!";
        
    }
    else{
        if($_Session['UserPassword']!= $locale['password']){
            $result = "ERROR: Incorrect Password";
        }
        else{
        $_Session['ID'] = $locale['id'];
        $result= "Welcome ID#" . $_Session['ID'];
    }
    }
    
    
    
    ?>
    <?= $result ?>;
    <?php endif ?>
    <?php if(isset($_POST['newLName']) && isset($_POST['newFName'])): ?>
    <?php
        $_Session['newLname']=$_POST['newLName'];
        $_Session['newFname']=$_POST['newFName'];
        $_Session['newPassword']=$_POST['newWord'];
        $_Session['Date_joined']=$_POST['dateU'];
        $_Session['newMail'] = $_POST['newMail'];
        try {
     
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = $conn->prepare('INSERT INTO Users (firstname, lastname, email,password,date_joined) VALUES (?,?,?,?,?)');
    // $conn->exec($sql);
    $sql->execute([$_Session['newFname'],$_Session['newLname'],$_Session['newMail'], $_Session['newPassword'],$_Session['Date_joined']]);
    
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }   
    ?>
    <?= "New record created successfully"?>;
    <?php endif ?>
    
    <?php if(isset($_POST['logoff']) && !empty($_POST['logoff'])): ?>
        <?php
        session_destroy();?>
         <p><?= "Now Logging Off..."?></p>;
    <?php endif ?>
    
    <?php if(isset($_POST['title']) && isset($_POST['description'])): ?>
    <?php
        $_Session['Title']= $_POST['title'];
        $_Session['Description'] =$_POST['description'];
        $_Session['Type']=$_POST['type'];
        $_Session['Assigned']=$_POST['assignedTo'];
        $_Session['Created']=$_POST['dateI'];
        $_Session['Updated']= $_POST['dateI'];
        $_Session['Priority'] = $_POST['priority'];
        $_Session['CreatedBy']=$_Session['ID'];// should store id of current user
        try {
     
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //$sql = "INSERT INTO Users (firstname, lastname, email,password) VALUES (".$_Session['newFname'].",".$_Session['newLname'].",".$_Session['newMail'].",".$_Session['newPassword'].")";
    $sql = $conn->prepare('INSERT INTO Issues (title, description, type,priority, status,assigned_to,created_by,created,updated) VALUES (?,?,?,?,?,?,?,?,?)');
    // $conn->exec($sql);
    $sql->execute([$_Session['Title'],$_Session['Description'], $_Session['Type'],$_Session['Priority'],'Open',$_Session['Assigned'],$_Session['CreatedBy'],$_Session['Created'],$_Session['Updated']]);
    
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }   
    ?>
    <p><?= "New Issue created successfully"?></p>;
    <?php endif ?>
    
