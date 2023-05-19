<?php
// Enter your Host, username, password, database below.
// I left password empty because i do not set password on localhost.
$con = mysqli_connect("localhost:3306","leoaran_facilino","Hs8^5l4b9","leoaran_facilino");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  
  date_default_timezone_set('Europe/Madrid');
  $con->query("SET NAMES utf8mb4");
?>