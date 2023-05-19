<?php
require_once('db.php');
$lang1=$_GET["lang1"];
$lang2=$_GET["lang2"];

$query_keys="SELECT * FROM `lang_keys_".$lang1."` WHERE 1";
$result_keys = mysqli_query($con,$query_keys);

while($row_keys=mysqli_fetch_assoc($result_keys))
{
	if (!is_null($row_keys["value"]))
		$keys[$row_keys["key"]]=$row_keys["value"];
	elseif (!is_null($row_keys["value_temp"]))
		$keys[$row_keys["key"]]=$row_keys["value_temp"];
}

$query_keys_en="SELECT * FROM `lang_keys_".$lang2."` WHERE 1";
$result_keys_en = mysqli_query($con,$query_keys_en);
while($row_keys_en=mysqli_fetch_assoc($result_keys_en))
{
	if (!is_null($row_keys_en["value"]))
		$keys_en[$row_keys_en["key"]]=$row_keys_en["value"];
}

foreach ($keys as $key => $value)
{
	if (!isset($keys_en[$key]))
	{
		echo '<pre>'.$key.'</pre>'.PHP_EOL;
	}
}
							
?>