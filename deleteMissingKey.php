<?php
require_once('db.php');
$key=$_GET["key"];

$query_lang="SELECT * FROM `languages` WHERE 1";
$result_lang=mysqli_query($con,$query_lang);
while($row_lang=mysqli_fetch_assoc($result_lang))
{
	$query_key="SELECT id FROM `lang_keys_".$row_lang["lang_key"]."` WHERE `key`=?";
	$statement_key=mysqli_prepare($con,$query_key);
	$statement_key->bind_param("s",$key);
	$statement_key->execute();
	$result_key=$statement_key->get_result();
	while($row=mysqli_fetch_assoc($result_key))
	{
		$query_del="DELETE FROM `lang_keys_".$row_lang["lang_key"]."` WHERE `id`=".$row["id"];
		mysqli_query($con,$query_del);
		echo $query_del.PHP_EOL;
	}
}
?>