<?php
header("Access-Control-Allow-Origin: *");
session_start();
$host = getenv('IP');
$username = 'TC';
$password = 'Spartan!117';
$dbname = 'AppDatabase';
$options = [
        'cost' => 12,
         ];
$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else{
    if(isset($_POST['admin'])){
    $stmt = $conn->prepare("SELECT count(*) FROM Users WHERE email =  'admin@bugme.com'");
     echo "adding admin";
    
   // $stmt->bindParam(':word', "admin@bugme.com", PDO::PARAM_STR); 
    
    $stmt->execute();
    
    $admin_num = $stmt->fetchColumn();
    if($admin_num<1){
    $sql = $conn->prepare('INSERT INTO Users (email,password) VALUES (?,?)');
    // $conn->exec($sql);
    $sql->execute(['admin@bugme.com',password_hash('password123', PASSWORD_BCRYPT, $options)]);
    }
    }
    }


    ?>
    <?php if(isset($_POST['email']) && isset($_POST['password'])): ?>
    <?php
    //session_start();
    $_SESSION['UserEmail']= $_POST['email'];
    /*$_SESSION['UserPassword'] =$_POST['password'];*/
    
  
    $stmt2 = $conn->prepare('SELECT id,password FROM Users WHERE email =  :word');
    $ma = $_POST['email']; 
    
    $stmt2->bindParam(':word', $ma, PDO::PARAM_STR); 
    
    $stmt2->execute();
    
    $locale = $stmt2->fetch(PDO::FETCH_ASSOC);
    /*$password = "code";
        $salt = "k*jJlrsH:cY]0^Z^/J2)Pz{)qz";
        $md5 = md5($salt.$password);*/
    if($locale['id']==0){
        $result= "User not Found!";
        
    }
    else{
        if (password_verify($_POST['password'], $locale['password'])|| (password_hash($_POST['password'],PASSWORD_DEFAULT)==$locale['password'])) {
            
            if (password_needs_rehash($locale['password'], PASSWORD_DEFAULT, $options)) {
            $_SESSION['UserPassword'] = password_hash($_POST['password'], PASSWORD_DEFAULT, $options);
              }
              $_SESSION["ID"] = $locale['id'];
        $cr=$locale['id'];
        //$result= "Welcome ID#" . $_SESSION['ID'];
        $result ="Welcome";
        $stmt2 = $conn->query("SELECT * FROM Issues");
        
        $_SESSION['contents'] = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        //header("Location: dashboard.html"); exit();
        
        //header("location: dashboard.html",  true,  301 );  exit;
           
         } 
        
        else{
        $result ="Incorrect Password". password_hash($_POST['password'],PASSWORD_DEFAULT);
    }
    }
    
    
    
    ?>
   
    <?=$result ?>
    
    
    <?php endif ?>
    <?php if(isset($_POST['newLName']) && isset($_POST['newFName'])): ?>
    <?php
    $userAdd = "";
    if(strcmp($_SESSION['UserEmail'],"admin@bugme.com")==0){
        
        $_SESSION['newLname']=$_POST['newLName'];
        $_SESSION['newFname']=$_POST['newFName'];
        
        
            $_SESSION['newPassword']= password_hash($_POST['newWord'], PASSWORD_BCRYPT, $options);
        
        $_SESSION['Date_joined']=$_POST['dateU'];
        $_SESSION['newMail'] = $_POST['newMail'];
    $stmt = $conn->prepare('SELECT count(*) FROM Users WHERE email =  :word');
     
    
    $stmt->bindParam(':word', $_SESSION['newMail'], PDO::PARAM_STR); 
    
    $stmt->execute();
    
    $number_of_rows = $stmt->fetchColumn();
    if($number_of_rows!=0){
       $userAdd = "Email already in use - User likely already exists" ;
    }
    elseif (!filter_input(INPUT_POST, "newMail", FILTER_VALIDATE_EMAIL)){
        $userAdd="Email is not valid";
    }
     else{
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = $conn->prepare('INSERT INTO Users (firstname, lastname, email,password,date_joined) VALUES (?,?,?,?,?)');
    // $conn->exec($sql);
    $sql->execute([$_SESSION['newFname'],$_SESSION['newLname'],$_SESSION['newMail'], $_SESSION['newPassword'],$_SESSION['Date_joined']]);
    $userAdd =" New User created successfully";
     }
    }
    else{
        $userAdd = "Must be logged in as Admin to add new Users";
    }
    ?>
    <?= $userAdd?>;
    <?php endif ?>
    
    <?php if(isset($_POST['off']) && !empty($_POST['off'])): ?>
        <?php
        session_unset();
        session_destroy();?>
         <p><?= "Now logging Off..."?></p>;
    <?php endif ?>
    
    <?php if(isset($_POST['title']) && isset($_POST['description'])): ?>
    <?php
    //session_start();
        $_SESSION['Title']= $_POST['title'];
        $_SESSION['Description'] =$_POST['description'];
        $_SESSION['Type']=$_POST['type'];
       
        $_SESSION['Assigned']=$_POST['assignedTo'];
        $_SESSION['Created']=$_POST['dateI'];
        $_SESSION['Updated']= $_POST['dateI'];
        $_SESSION['Priority'] = $_POST['priority'];
        $_SESSION['CreatedBy']=$_SESSION['ID'];// should store id of current user
        
     
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //$sql = "INSERT INTO Users (firstname, lastname, email,password) VALUES (".$_SESSION['newFname'].",".$_SESSION['newLname'].",".$_SESSION['newMail'].",".$_SESSION['newPassword'].")";
    $sql = $conn->prepare('INSERT INTO Issues (title, description, type,priority, status,assigned_to,created_by,created,updated) VALUES (?,?,?,?,?,?,?,?,?)');
    // $conn->exec($sql);
    $sql->execute([$_SESSION['Title'],$_SESSION['Description'], $_SESSION['Type'],$_SESSION['Priority'],'Open',$_SESSION['Assigned'],$_SESSION["ID"],$_SESSION['Created'],$_SESSION['Updated']]);
   
   
    ?>
    <p><?= "New Issue created successfully" .$cr?></p>;
    <?php endif ?>
    
    <?php 
    $stmt2 = $conn->query("SELECT * FROM Users ");

    $contents = $stmt2->fetchAll(PDO::FETCH_ASSOC);
    
    ?>
    <?php if(isset($_POST['members'])): ?>
  
    <select name="assignedTo" id="assignedTo"> 
         <?php foreach ($contents as $row): ?>
         <?php if (strlen($row['firstname'])!=0): ?>
         <option value = <?=$row['id']?>><?= $row['firstname']." ".$row['lastname']?></option><br>;
         <?php endif ?>
         <?php endforeach; ?>
    </select>
    <?"YOU got them"?>
    <?php endif ?>
   
    <?php if(isset($_POST['Issues'])): ?>
        <?php if( strcmp($_POST['Issues'],"total")==0): ?>
      <?php
      $stmt2 = $conn->query("SELECT * FROM Issues");
        echo "ALL of it";
        $_SESSION['contents'] = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        ?>
        
          
        <?php elseif( strcmp($_POST['Issues'],"OPEN")==0): ?>
      <?php
      
      $stmt2 = $conn->query("SELECT * FROM Issues WHERE status =  'Open'");

        $_SESSION['contents'] = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        ?>
         
          
        <?php elseif( strcmp($_POST['Issues'],"MY TICKETS")==0): ?>
      <?php
      $stmt2 = $conn-> prepare('SELECT * FROM Issues WHERE assigned_to = :id');
                       
        
        $stmt2->bindParam(':id', $_SESSION["ID"], PDO::PARAM_STR); 
        
        $stmt2->execute();
        
        $_SESSION['contents'] = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        ?>
        <?php else: ?>
      <?php
      $stmt2 = $conn->query("SELECT * FROM Issues");
        echo "Everything";
        $_SESSION['contents'] = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        ?>
         <?php endif ?>
         
    <table style="width:100%">
          <tr>
            <!--thead-->
                
                <th>Title</th>
                
                
                <th>Type</th>
                <th>Priority</th>
                <th>status</th>
                <th>Assigned to</th>
                <th>Created By</th>
                <th>Created</th>
                <th>Updated</th>
                <!--/thead-->
            
          </tr>
          <?php foreach ($_SESSION['contents'] as $row): ?> 
          <?php
          $stmt2 = $conn->prepare('SELECT firstname,lastname FROM Users WHERE id =  :id');
        
        
        $stmt2->bindParam(':id', $row['assigned_to'], PDO::PARAM_STR); 
        
        $stmt2->execute();
        
        $locale = $stmt2->fetch(PDO::FETCH_ASSOC);
        ?>
            <tr>
              
              <td><?="#".$row['id']?><a href="details-page.html" class ="Details"><?=$row['title']?></a></td>
              
              <td><?=$row['type']?></td>
              <td><?=$row['priority']?></td>
              <td class = "OS"><?=$row['status']?></td>
              
              <td><?= $locale['firstname']." ". $locale['lastname']?></td>
              <td><?=$row['created_by']?></td>
              <td><?=$row['created']?></td>
              <td><?=$row['updated']?></td>
            </tr>
          <?php endforeach; ?>
          
        </table>
    <?php endif ?>
    
    <?php if(isset($_POST['Ticket']) && !empty($_POST['Ticket'])): ?>
    <?php
        $_SESSION['ticket']= $_POST['Ticket'];
        ?>
        
    <?php endif ?>
     <?php if(isset($_POST['Details'])): ?>
     <?php
        $stmt2 = $conn->prepare('SELECT * FROM Issues WHERE title =  :name');
        
        
        $stmt2->bindParam(':name', $_SESSION['ticket'], PDO::PARAM_STR); 
        
        $stmt2->execute();
        
        $locale = $stmt2->fetch(PDO::FETCH_ASSOC);
        $stmt3 = $conn->prepare('SELECT * FROM Users  WHERE id =  :name');
        
        
        $stmt3->bindParam(':name', $locale['assigned_to'], PDO::PARAM_STR); 
        
        $stmt3->execute();
        
        $person = $stmt3->fetch(PDO::FETCH_ASSOC);
        $dets = $locale['description'];
        ?>
        <?=$locale['id']."|". $locale['title']."|".$dets."|".$locale['type']."|".$locale['created']."|".$locale['priority']."|".$locale['status']."|".$person['firstname']."|".$person['lastname']."|".$locale['updated']?>
        
        
      <?php endif ?>
      
       <?php if(isset($_POST['closed']) && isset($_POST['update'])): ?>
          <?php 
          $sql = "UPDATE Issues SET updated=?, status=? WHERE id=?";
            $conn->prepare($sql)->execute([$_POST['update'], "Closed", number_format($_POST['closed'])]);
       ?>
       <?= "Updated Successfully"?>
       <?php endif ?>
       
        
      
       <?php if(isset($_POST['progress']) && isset($_POST['update'])): ?>
          <?php 
          $sql = "UPDATE Issues SET updated=?, status=? WHERE id=?";
            $conn->prepare($sql)->execute([$_POST['update'], "InProgress", number_format($_POST['progress'])]);
           // $conn ->prepare($sql);
           // $conn->execute(array($_POST['update'], "In_Progress", 2));
       ?>
       <?= "Updated Progress Successfully"?>
       <?php endif ?>
       
       
       
       
       
       
       
