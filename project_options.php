<?php
require_once('db.php');
header('Content-Type: application/json');

$query_boards= "SELECT `id`,`name`,`image` FROM `processors` WHERE 1";
$result_boards=mysqli_query($con,$query_boards);
while ($row_boards = mysqli_fetch_assoc($result_boards)) {
  $boards[]=array('id'=>$row_boards['id'],'name'=>$row_boards['name'],'image'=>$row_boards['image']);
}
	
$query_versions= "SELECT `id`,`name`,`image` FROM `facilino_version` WHERE 1";
$result_versions=mysqli_query($con,$query_versions);
while ($row_versions = mysqli_fetch_assoc($result_versions)) {
  $versions[]=array('id'=>$row_versions['id'],'name'=>$row_versions['name'],'image'=>$row_versions['image']);
}

$query_filters= "SELECT `id`,`title`,`image` FROM `filters` WHERE 1";
$result_filters=mysqli_query($con,$query_filters);
while ($row_filters = mysqli_fetch_assoc($result_filters)) {
  $filters[]=array('id'=>$row_filters['id'],'name'=>$row_filters['title'],'image'=>$row_filters['image']);
}

$query_languages= "SELECT `id`,`name`,`image` FROM `languages` WHERE 1";
$result_languages=mysqli_query($con,$query_languages);
while ($row_languages = mysqli_fetch_assoc($result_languages)) {
  $languages[]=array('id'=>$row_languages['id'],'name'=>$row_languages['name'],'image'=>$row_languages['image']);
}
$data=array('boards' => $boards,'versions' => $versions,'filters' => $filters, 'languages'=>$languages);
echo json_encode($data);
?>