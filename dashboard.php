<?php
require_once('db.php');

function sanitizeInput($inputP)
{
    $spaceDelimiter = "#BLANKSPACE#";
    $newLineDelimiter = "#NEWLNE#";
                                
    $inputArray = [];
    $minifiedSanitized = '';
    $unMinifiedSanitized = '';
    $sanitizedInput = [];
    $returnData = [];
    $returnType = "string";

    if($inputP === null) return null;
    if($inputP === false) return false;
    if(is_array($inputP) && sizeof($inputP) <= 0) return [];

    if(is_array($inputP))
    {
        $inputArray = $inputP;
        $returnType = "array";
    }
    else
    {
        $inputArray[] = $inputP;
        $returnType = "string";
    }

    foreach($inputArray as $input)
    {
        $minified = str_replace(" ",$spaceDelimiter,$input);
        $minified = str_replace("\n",$newLineDelimiter,$minified);

        //removing <script> tags
        $minifiedSanitized = preg_replace("/[<][^<]*script.*[>].*[<].*[\/].*script*[>]/i","",$minified);

        $unMinifiedSanitized = str_replace($spaceDelimiter," ",$minifiedSanitized);
        $unMinifiedSanitized = str_replace($newLineDelimiter,"\n",$unMinifiedSanitized);

        //removing inline js events
        $unMinifiedSanitized = preg_replace("/([ ]on[a-zA-Z0-9_-]{1,}=\".*\")|([ ]on[a-zA-Z0-9_-]{1,}='.*')|([ ]on[a-zA-Z0-9_-]{1,}=.*[.].*)/","",$unMinifiedSanitized);

        //removing inline js
        $unMinifiedSanitized = preg_replace("/([ ]href.*=\".*javascript:.*\")|([ ]href.*='.*javascript:.*')|([ ]href.*=.*javascript:.*)/i","",$unMinifiedSanitized);

                                    
        $sanitizedInput[] = $unMinifiedSanitized;
    }

    if($returnType == "string" && sizeof($sanitizedInput) > 0)
    {
        $returnData = $sanitizedInput[0];
    }
    else
    {
        $returnData = $sanitizedInput;
    }
                                
    return $returnData;
}

function getUserIdAndRole($con,$username,$key)
{
	$query = "SELECT `id`,`user_role_id`,`email` from `users` WHERE username=\"".$username."\" and `users`.`key`=\"".$key."\" and active=1";
	$result = mysqli_query($con,$query);
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		return mysqli_fetch_assoc($result);
	}
	else
	{
		return array();
	}
}

function getProjectData($con,$user_id,$table='')
{
	//List all user projects
	$query = "SELECT proj.id,proj.name,proc.name,facil.name,filt.name,lang.name,proj.modified_date,proj.share_key,proc.id,facil.id,filt.id,lang.id from `projects".$table."` as proj inner join `processors` as proc on proc.id=proj.processor_id inner join `filters` as filt on filt.id=proj.filter_id inner join `facilino_version` as facil on facil.id=proj.version_id inner join `languages` as lang on lang.id=proj.language_id where proj.`user_id` = ".$user_id." order by proj.`modified_date` desc";
	$result = mysqli_query($con,$query);
	$projects = array();
	while ($row = mysqli_fetch_row($result)) {
		$projects[]=array('id'=>$row[0],'name'=>$row[1],'proc'=>$row[2],'facil'=>$row[3],'filt'=>$row[4],'lang'=>$row[5],'date'=>$row[5],'proc_id'=>$row[8],'version_id'=>$row[9],'filter_id'=>$row[10],'lang_id'=>$row[11]);
	}
	return $projects;
}

function deleteProject($con,$project_id,$action,$table='')
{
	if ($action=="delete")
		$query = "SELECT facilino_code_id FROM `projects".$table."` WHERE `projects".$table."`.`id`=?";
	else
		$query = "SELECT facilino_code_id FROM `examples` WHERE `examples`.`id`=?";
	//echo $query;
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("i",$project_id);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row = mysqli_fetch_assoc($result);
		if ($action=="delete")
			$query = "DELETE FROM `facilino_code".$table."` WHERE `id`=?";
		else
			$query = "DELETE FROM `facilino_code_examples` WHERE `id`=?";
		//echo $query;
		$statement=mysqli_prepare($con,$query);
		$statement->bind_param("i",$row['facilino_code_id']);
		$statement->execute();
		if ($action=="delete")
			$query = "DELETE FROM `projects".$table."` WHERE `projects".$table."`.`id`=?";
		else
			$query = "DELETE FROM `examples` WHERE `examples`.`id`=?";
		//echo $query;
		$statement=mysqli_prepare($con,$query);
		$statement->bind_param("i",$project_id);
		$statement->execute();
		//return 0;
	}
	//return -1;
}	
	

function duplicateProject($con,$project_id,$action,$table='')
{
	if ($action=="duplicate")
		$query = "SELECT * from `projects".$table."` as proj where proj.`id`=?";
	else
		$query = "SELECT * from `examples` as proj where proj.`id`=?";
	
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("i",$project_id);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row_project = mysqli_fetch_assoc($result);
		$row_project['name'] = $row_project['name']. ' - Copy';
		$curDate = date("Y-m-d H:i:s");
		$row_project['create_date'] = $curDate;
		$row_project['modified_date'] = $curDate;
		
		$query_user = "SELECT email from `users".$table."` WHERE id=? and active=1";
		$statement_user=mysqli_prepare($con,$query_user);
		$statement_user->bind_param("i",$row_project['user_id']);
		$statement_user->execute();
		$result_user=$statement_user->get_result();
		$rows_user = mysqli_num_rows($result_user);
		if ($rows_user==1)
		{
			$row_user=mysqli_fetch_assoc($result_user);
			$email = stripslashes($row_user['email']);
			$email = mysqli_real_escape_string($con,$email);
			$key = md5($email);
			$addKey = substr(md5(uniqid(rand(),1)),3,10);
			$key = $key . $addKey;
			if ($action=="duplicate")
				$query ="SELECT * from `facilino_code".$table."` where `facilino_code".$table."`.id=?";
			else
				$query ="SELECT * from `facilino_code_examples` where `facilino_code_examples`.id=?";
			$statement=mysqli_prepare($con,$query);
			$statement->bind_param("i",$row_project['facilino_code_id']);
			$statement->execute();
			$result=$statement->get_result();
			$rows = mysqli_num_rows($result);
			if ($rows==1)
			{
				$row_code = mysqli_fetch_assoc($result);
				if ($action=="duplicate")
					$query="INSERT INTO `facilino_code".$table."`(`blockly_code`,`arduino_code`) VALUES (?,?)";
				else
					$query="INSERT INTO `facilino_code_examples`(`blockly_code`,`arduino_code`) VALUES (?,?)";
				$statement=mysqli_prepare($con,$query);
				$statement->bind_param("ss",$row_code['blockly_code'],$row_code['arduino_code']);
				$statement->execute();
				$facilino_code_id=$con->insert_id;
				if ($action=="duplicate")
					$query="INSERT INTO `projects".$table."`(`name`,`user_id`,`processor_id`,`filter_id`,`facilino_code_id`,`version_id`,`language_id`,`create_date`,`modified_date`,`share_key`,`server_ip`,`device_ip`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
				else
					$query="INSERT INTO `examples`(`name`,`user_id`,`processor_id`,`filter_id`,`facilino_code_id`,`version_id`,`language_id`,`create_date`,`modified_date`,`share_key`,`server_ip`,`device_ip`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
				$statement=mysqli_prepare($con,$query);
				$statement->bind_param("siiiiiisssss",$row_project['name'],$row_project['user_id'],$row_project['processor_id'],$row_project['filter_id'],$facilino_code_id,$row_project['version_id'],$row_project['language_id'],$row_project['create_date'],$row_project['modified_date'],$key,$row_project['server_ip'],$row_project['device_ip']);
				$statement->execute();
			}
		}
	}
}

function updateProject($con,$project_id,$action,$name,$proc_id,$version_id,$filter_id,$language_id,$server,$device,$table='')
{
	//Update project modifications
	if ($action=="update")
	{
		$query="UPDATE `projects".$table."` SET `name`=\"".$name."\",`processor_id`=".$proc_id.",`filter_id`=".$filter_id.",`version_id`=".$version_id.",`language_id`=".$language_id.",`server_ip`=\"".$server."\",`device_ip`=\"".$device."\" WHERE `projects".$table."`.id=".$project_id;
	}
	else
	{
		$query="UPDATE `examples` SET `name`=\"".$name."\",`processor_id`=".$proc_id.",`filter_id`=".$filter_id.",`version_id`=".$version_id.",`language_id`=".$language_id.",`server_ip`=\"".$server."\",`device_ip`=\"".$device."\" WHERE `examples`.id=".$project_id;
	}
	if ($result = mysqli_query($con,$query))
	{
		return array('result' => 'OK');
	}
	else
	{
		return array('result' => 'Error');
	}
}

function newProject($con,$user,$action,$name,$proc_id,$version_id,$filter_id,$language_id,$server,$device,$table='')
{
		$email = stripslashes($user['email']);
		$email = mysqli_real_escape_string($con,$email);
		$key = md5($email);
		$addKey = substr(md5(uniqid(rand(),1)),3,10);
		$key = $key . $addKey;
		
		$default_arduino_code="void setup()\\n{\\n}\\nvoid loop()\\n{\\n}";
		//TODO: Cuando seleccionamos Facilino OTA el código debería ser diferente
		if ($version_id==3)
			$default_facilino_code="<block type='controls_setupLoop' deletable='false' x='20' y='5'><statement name='SETUP'><block type='communications_wifi_def'><field name='CONSOLE'>FALSE</field><value name='SSID'><block type='text'><field name='TEXT'>MY_WIFI_SSID</field></block></value><value name='PASSWORD'><block type='text'><field name='TEXT'>MY_WIFI_PASSWORD</field></block></value></statement></block>";
		else
			$default_facilino_code="<block type='controls_setupLoop' id='=:lA^uU=`^l!D9y!TLNi' deletable='false' x='10' y='10'></block>";
		
		//echo $default_facilino_code;
		if ($action=="new")
			$query_code="INSERT INTO `facilino_code".$table."` (`blockly_code`,`arduino_code`) VALUE (\"".$default_facilino_code."\",\"".$default_arduino_code."\")";
		else
			$query_code="INSERT INTO `facilino_code_examples` (`blockly_code`,`arduino_code`) VALUE (\"".$default_facilino_code."\",\"".$default_arduino_code."\")";
		//echo $query_code;
		
		$result_code = mysqli_query($con,$query_code);
		
		if (!($result_code = mysqli_query($con,$query_code)))
		{
			return array('result' => 'Error generating code');
		}
		
		if ($version_id==3)
		{
			//Arduino OTA
			if ($action=="new")
				$query_project="INSERT INTO `projects".$table."` (`name`,`user_id`,`processor_id`,`filter_id`,`facilino_code_id`,`version_id`,`language_id`,`create_date`,`modified_date`,`share_key`,`server_ip`,`device_ip`) VALUES (\"".$name."\",".$user['id'].",".$proc_id.",".$filter_ir.",".$con->insert_id.",".$version_id.",".$language_id.",\"".date("Y-m-d H:i:s")."\",\"".date("Y-m-d H:i:s")."\",\"".$key."\",\"".$server."\",\"".$device."\")";
			else
				$query_project="INSERT INTO `examples`(`name`,`user_id`,`processor_id`,`filter_id`,`facilino_code_id`,`version_id`,`language_id`,`create_date`,`modified_date`,`share_key`,`server_ip`,`device_ip`) VALUES (\"".$name."\",".$user['id'].",".$proc_id.",".$filter_id.",".$con->insert_id.",".$version_id.",".$language_id.",\"".date("Y-m-d H:i:s")."\",\"".date("Y-m-d H:i:s")."\",\"".$key."\",\"".$_POST["inp_facil_server"]."\",\"".$_POST["inp_facil_device"]."\")";
		}
		else
		{
			if ($action=="new")
				$query_project="INSERT INTO `projects".$table."` (`name`,`user_id`,`processor_id`,`filter_id`,`facilino_code_id`,`version_id`,`language_id`,`create_date`,`modified_date`,`share_key`) VALUES (\"".$name."\",".$user['id'].",".$proc_id.",".$filter_id.",".$con->insert_id.",".$version_id.",".$language_id.",\"".date("Y-m-d H:i:s")."\",\"".date("Y-m-d H:i:s")."\",\"".$key."\")";
			else
				$query_project="INSERT INTO `examples`(`name`,`user_id`,`processor_id`,`filter_id`,`facilino_code_id`,`version_id`,`language_id`,`create_date`,`modified_date`,`share_key`) VALUES (\"".$name."\",".$user['id'].",".$proc_id.",".$filter_id.",".$con->insert_id.",".$version_id.",".$language_id.",\"".date("Y-m-d H:i:s")."\",\"".date("Y-m-d H:i:s")."\",\"".$key."\")";
		}
		//echo $query_project;
		if ($result_project = mysqli_query($con,$query_project))
		{
			return array('result' => 'OK');
		}
		else
		{
			return array('result' => 'Error generating project');
		}
}

if (isset($_GET["id"])&&isset($_GET["action"])&&(($_GET["action"]=="duplicate")||($_GET["action"]=="duplicate_example"))&&!isset($_POST["action"])){
	include("auth.php");
	if (!isset($_GET["invited"]))
	{
		duplicateProject($con,$_GET["id"],$_GET["action"]);
	}
	else
	{
		duplicateProject($con,$_GET["id"],$_GET["action"],"_tmp");
	}
	header("Location: dashboard.php");
}
elseif (isset($_POST["action"])&&(($_POST["action"]=="duplicate")||($_POST["action"]=="duplicate_example"))&&isset($_POST["id"])&&isset($_POST["username"])&&isset($_POST["key"]))
{
	header("Content-type: application/json; charset=utf-8");
	$row_user=getUserIdAndRole($con,$_POST["username"],$_POST["key"]);
	if (!empty($row_user))
	{
		duplicateProject($con,$_POST["id"],$_POST["action"]);
		echo json_encode(getProjectData($con,$row_user["id"]));
	}
	else
		echo json_encode(array());
}
elseif (isset($_POST["action"])&&($_POST["action"]=="duplicate")&&isset($_POST["id"])&&isset($_POST["user_id"])&&isset($_POST["invited"]))
{
	header("Content-type: application/json; charset=utf-8");
	duplicateProject($con,$_POST["id"],$_POST["action"],"_tmp");
	echo json_encode(getProjectData($con,$_POST["user_id"],"_tmp"));
}
elseif (isset($_GET["id"])&&isset($_GET["action"])&&(($_GET["action"]=="delete")||($_GET["action"]=="delete_example"))&&!isset($_POST["action"])){
	include("auth.php");
	if (!isset($_GET["invited"]))
	{
		deleteProject($con,$_GET["id"],$_GET["action"]);
	}
	else
	{
		deleteProject($con,$_GET["id"],$_GET["action"],"_tmp");
	}
	header("Location: dashboard.php");
}
elseif (isset($_POST["action"])&&(($_POST["action"]=="delete")||($_POST["action"]=="delete_example"))&&isset($_POST["id"])&&isset($_POST["username"])&&isset($_POST["key"]))
{
	header("Content-type: application/json; charset=utf-8");
	$row_user=getUserIdAndRole($con,$_POST["username"],$_POST["key"]);
	if (!empty($row_user))
	{
		deleteProject($con,$_POST["id"],$_POST["action"]);
		echo json_encode(getProjectData($con,$row_user["id"]));
	}
	else
		echo json_encode(array());
}
elseif (isset($_POST["action"])&&($_POST["action"]=="delete")&&isset($_POST["id"])&&isset($_POST["user_id"])&&isset($_POST["invited"]))
{
	header("Content-type: application/json; charset=utf-8");
	deleteProject($con,$_POST["id"],$_POST["action"],"_tmp");
	echo json_encode(getProjectData($con,$_POST["user_id"],"_tmp"));
}
elseif  (isset($_GET["action"])&&(($_GET["action"]=="new")||($_GET["action"]=="new_example"))&&!isset($_POST["action"])&&isset($_POST["cancel_button"])){
	//Exit from create new project
	header("Location: dashboard.php");
}
elseif (isset($_POST["action"])&&(($_POST["action"]=="new")||($_POST["action"]=="new_example"))&&isset($_POST["username"])&&isset($_POST["key"])&&isset($_POST["name"])&&isset($_POST["proc_id"])&&isset($_POST["version_id"])&&isset($_POST["filter_id"])&&isset($_POST["lang_id"]))
{
	header("Content-type: application/json; charset=utf-8");
	$row_user=getUserIdAndRole($con,$_POST['username'],$_POST['key']);
	if (!empty($row_user))
	{
		if (isset($_POST["server"]))
		{
			echo json_encode(newProject($con,$row_user,$_POST["action"],$_POST["name"],$_POST["proc_id"],$_POST["version_id"],$_POST["filter_id"],$_POST["lang_id"],$_POST["server"],$_POST["device"]));
		}
		else
		{
			echo json_encode(newProject($con,$row_user,$_POST["action"],$_POST["name"],$_POST["proc_id"],$_POST["version_id"],$_POST["filter_id"],$_POST["lang_id"],"",""));
		}
	}
	else
	{
		echo json_encode(array());
	}	
}
elseif (isset($_POST["action"])&&($_POST["action"]=="new")&&isset($_POST["user_id"])&&isset($_POST["user_email"])&&isset($_POST["invited"])&&isset($_POST["name"])&&isset($_POST["proc_id"])&&isset($_POST["version_id"])&&isset($_POST["filter_id"])&&isset($_POST["lang_id"]))
{
	header("Content-type: application/json; charset=utf-8");
	if (isset($_POST["server"]))
	{
		echo json_encode(newProject($con,array('id'=>$_POST["user_id"],'email'=>$_POST["user_email"]),$_POST["action"],$_POST["name"],$_POST["proc_id"],$_POST["version_id"],$_POST["filter_id"],$_POST["lang_id"],$_POST["server"],$_POST["device"],"_tmp"));
	}
	else
	{
		echo json_encode(newProject($con,array('id'=>$_POST["user_id"],'email'=>$_POST["user_email"]),$_POST["action"],$_POST["name"],$_POST["proc_id"],$_POST["version_id"],$_POST["filter_id"],$_POST["lang_id"],"","","_tmp"));
	}
}
elseif  (isset($_GET["action"])&&(($_GET["action"]=="new")||($_GET["action"]=="new_example"))&&!isset($_POST["action"])&&isset($_POST["create_button"])){
	include("auth.php");
	//Create new project
	$query_user ="SELECT email from `users` WHERE id=".$_POST["user_id"]." and active=1";
	$result_user = mysqli_query($con,$query_user);
	$rows_user = mysqli_num_rows($result_user);
	if ($rows_user==1)
	{
		$row_user=mysqli_fetch_row($result_user);
		if ($_POST["inp_facil_id"]==3)
		{
			newProject($con,array('id'=>$_POST["user_id"],'email'=>$row_user[0]),$_GET["action"],$_POST["edited_project_name"],$_POST["inp_processor_id"],$_POST["inp_facil_id"],$_POST["inp_filter_id"],$_POST["edited_language_id"],$_POST["inp_facil_server"],$_POST["inp_facil_device"]);
		}
		else
		{
			newProject($con,array('id'=>$_POST["user_id"],'email'=>$row_user[0]),$_GET["action"],$_POST["edited_project_name"],$_POST["inp_processor_id"],$_POST["inp_facil_id"],$_POST["inp_filter_id"],$_POST["edited_language_id"],"","");
		}
		header("Location: facilino.php?id=".$con->insert_id);
	}
	else
		header("Location: dashboard.php");
}
elseif (isset($_GET["action"])&&(($_GET["action"]=="new")||($_GET["action"]=="new_example"))&&!isset($_POST["action"])){
	//Form with a new project to be created
	include("auth.php");
	require_once('website_translation.php');
	$query_user ="SELECT default_lang_id from `users` WHERE username=\"".$_SESSION["username"]."\"";
	$result_user = mysqli_query($con,$query_user);
	$rows_user = mysqli_num_rows($result_user);
	if ($rows_user==1)
	{
		$row_user=mysqli_fetch_row($result_user);
		
	?>
	<!DOCTYPE html>
	<html><?php include "head.php"; ?>
		<body>
			<div id="header"><?php include "inc-header.php" ?></div>
			<div id="content" style="margin-top:2em; margin-left: 0.5em; margin-right: 0.5em">
	<h3>
	<?php
		if ($_GET["action"]=="new")
			echo $website["PROJECT"];
		else
			echo $website["EXAMPLE"];
	?></h3>
	<?php
		if ($_GET["action"]=="new")
		{
			?>
				<form action="dashboard.php?action=new" method="POST" style="margin-bottom:0.5em">
			<?php
		}
		else
		{
			?>
				<form action="dashboard.php?action=new_example" method="POST" style="margin-bottom:0.5em">
			<?php
		}
	?>
	<h4><?php echo $website["SETTINGS"]?></h4>
	<div class="datagrid">
	<table width="100%">
	<tr><th style="width:35%"><?php echo $website["NAME"]?></th><th style="width:20%"><?php echo $website["BOARD"]?></th><th style="width:15%"><?php echo $website["FACILINO_VERSION"]?></th><th style="width:20%"><?php echo $website["BLOCK_INSTRUCTION_SET"]?></th><th style="width:10%"><?php echo $website["LANGUAGE"]?></th></tr>
	<tr>
	<?php
	if (isset($_COOKIE['cookieProjectName'])){
		?>
		<td><input id="edited_project_name" type="text" maxlength="250" size="250" name="edited_project_name" value="<?php echo $_COOKIE['cookieProjectName']?>" style="margin-top: 0px; padding: 0px; padding-left: 10px; font-size: 12px; width: 100%"/></td>
		<?php
	}
	else
	{
		?>
		<td><input id="edited_project_name" type="text" maxlength="250" size="250" name="edited_project_name" value="Project" style="margin-top: 0px; padding: 0px; padding-left: 10px; font-size: 12px; width: 100%"/></td>
		<?php
	}
	if (isset($_COOKIE['cookieProcessorName'])&&isset($_COOKIE['cookieProcessorId']))
	{
		?>
		<td><label id="lbl_processor_id"><?php echo $_COOKIE['cookieProcessorName']?></label><input id="inp_processor_id" name="inp_processor_id" type="hidden" value="<?php echo $_COOKIE['cookieProcessorId']?>"></td>
		<?php
	}
	else
	{
		?>
		<td><label id="lbl_processor_id">Arduino Nano</label><input id="inp_processor_id" name="inp_processor_id" type="hidden" value="1"></td>
		<?php
	}
	if (isset($_COOKIE['cookieFacilinoVersionName'])&&isset($_COOKIE['cookieFacilinoVersionId']))
	{
		?>
		<td><label id="lbl_facil_id"><?php echo $_COOKIE['cookieFacilinoVersionName']?></label><input id="inp_facil_id" name="inp_facil_id" type="hidden" value="<?php echo $_COOKIE['cookieFacilinoVersionId']?>"></td>
		<?php
	}
	else
	{
		?>
		<td><label id="lbl_facil_id">Facilino</label><input id="inp_facil_id" name="inp_facil_id" type="hidden" value="1"></td>
		<?php
	}
	if (isset($_COOKIE['cookieFacilinoFilterName'])&&isset($_COOKIE['cookieFacilinoFilterId']))
	{
		?>
		<td><label id="lbl_filter_id"><?php echo $_COOKIE['cookieFacilinoFilterName']?></label><input id="inp_filter_id" name="inp_filter_id" type="hidden" value="<?php echo $_COOKIE['cookieFacilinoFilterId']?>"></td>
		<?php
	}
	else
	{
		?>
		<td><label id="lbl_filter_id"><?php echo $website["GENERIC_PROJECT"]?></label><input id="inp_filter_id" name="inp_filter_id" type="hidden" value="1"></td>
		<?php
	}
	$query_lang = "SELECT id,name from `languages` where 1";
	$result_lang = mysqli_query($con,$query_lang);
	$rows_lang = mysqli_num_rows($result_lang);
	if ($rows_lang>0)
	{
		?>
		<td><select id="edited_language_id" name="edited_language_id" type="text"/>
		<?php
		for ($j = 0; $j < $rows_lang; $j++)
		{
			$row_lang = mysqli_fetch_row($result_lang);
			if ($row_lang[0]==$row_user[0])
			{
				?><option value="<?php echo $row_lang[0]?>" selected="selected"><?php echo $row_lang[1]?></option><?php
			}
			else
			{
				?><option value="<?php echo $row_lang[0]?>"><?php echo $row_lang[1]?></option><?php
			}
		}
		?></select></td><?php
	}
	else
	{
		?><td/><?php
	}
	?>
	</tr>
	</table><?php
	if (isset($_COOKIE['cookieFacilinoVersionId']))
	{
		if ($_COOKIE['cookieFacilinoVersionId']==3)
		{
			?>
			<div id="OTA_settings" style="margin-top: 10px; padding: 0px; padding-left: 10px">
			<?php
		}
		else
		{
			?>
			<div id="OTA_settings" style="display:none; margin-top: 10px; padding: 0px; padding-left: 10px; ">
			<?php
		}
	}
	else
	{
		?><div id="OTA_settings" style="display:none; margin-top: 10px; padding: 0px; padding-left: 10px; ">
		<?php
	}
	?>
	<h5><?php echo $website["OTA_SETTINGS"]?></h5>
	<table width="40%" >
	<tr><th style="width:20%"><?php echo $website["SERVER_IP"]?></th><th style="width:20%"><?php echo $website["DEVICE_IP"]?></th></tr>
	<tr>
	<td><input name="inp_facil_server" type="text" minlength="7" maxlength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" style="font-size: 12px; padding: 0px;" value="192.168.1.1"></input></td><td><input name="inp_facil_device" type="text" minlength="7" maxlength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" style="font-size: 12px; padding: 0px;" value="192.168.1.100"></input></td>
	</td>
	</tr>
	</table>
	</div>
	<!-- <script>document.getElementById("edited_language_id").value = "4";</script>-->
	</div>
	<?php
	$query_proc = "SELECT * from `processors` where 1";
	$result_proc = mysqli_query($con,$query_proc);
	$rows_proc = mysqli_num_rows($result_proc);
	if ($rows_proc>0)
	{
		?>
		</br>
		<h4><?php echo $website["BOARDS"]?>&nbsp;&nbsp;<a onclick="if (document.getElementById('boards').style.display==='block') document.getElementById('boards').style.display='none'; else document.getElementById('boards').style.display='block';" title="<?php echo $website["SHOW_HIDE"]?>" style="text-decoration: none;"><span class="mbri-preview mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a></h4><?php
		if (isset($_COOKIE['cookieProcessorId']))
		{
			?><div class="datagrid" id="boards" style='display:none'><?php
		}
		else
		{
			?><div class="datagrid" id="boards" style='display:block'><?php
		}
		?><section class="features18 popup-btn-cards cid-qYa5rQWOty" id="features">
		<div class="container">
		<div class="row pt-5 ">
		<?php
		for ($j = 0; $j < $rows_proc; $j++)
		{
			$row_proc = mysqli_fetch_row($result_proc);
			?>
			<div class="card p-3 col-12 col-md-6 col-lg-4">
			<div class="card-wrapper ">
			<div class="card-img">
			<div class="mbr-section-btn text-center"><a onclick="selectProcessor('<?php echo $row_proc[1]?>',<?php echo $row_proc[0]?>);" class="btn btn-primary display-4"><?php echo $website["SELECT"]?></a></div><?php
			echo '<a onclick="selectProcessor(\''.$row_proc[1].'\','.$row_proc[0].');"><img src="assets/images/'.$row_proc[5].'"></a>';?>
			</div>
			<div class="card-box">
			<h4 class="card-title mbr-fonts-style display-7" style="margin-top:10px">
			<?php 
			if ($lang==='en-GB')
			 echo $row_proc[1];
			elseif ($lang==='es-ES')
			 echo $row_proc[7];
			?></h4>
			<p class="mbr-text mbr-fonts-style align-left display-7">
			<?php 
			if ($lang==='en-GB')
			 echo $row_proc[4];
			elseif ($lang==='es-ES')
			 echo $row_proc[8];
			?></p>
			</div>
			</div>
			</div>
			<?php
		}
		?>
		</div>
		</div>
		</section>
		</div>
		<?php
		if ($_GET["action"]=="new")
		{
			?>
			<script>
			function selectProcessor(el,id){
			document.getElementById('lbl_processor_id').innerHTML=el;
			document.getElementById('inp_processor_id').value=id;
			document.getElementById('boards').style.display="none";
			document.cookie = "cookieProcessorName="+el;
			document.cookie = "cookieProcessorId="+id;
			document.cookie = "cookieProjectName="+document.getElementById('edited_project_name').value;
			window.location.href="dashboard.php?action=new";
			}
			</script>
			<?php
		}
		else
		{
			?>
			<script>
			function selectProcessor(el,id){
			document.getElementById('lbl_processor_id').innerHTML=el;
			document.getElementById('inp_processor_id').value=id;
			document.getElementById('boards').style.display="none";
			document.cookie = "cookieProcessorName="+el;
			document.cookie = "cookieProcessorId="+id;
			document.cookie = "cookieProjectName="+document.getElementById('edited_project_name').value;
			window.location.href="dashboard.php?action=new_example";
			}
			</script>
			<?php
		}
	}
	else
	{
		?>
		<td><label id="lbl_filter_id">Arduino Nano</label></td>
		<?php
	}
	$query_version = "SELECT * from `facilino_version` where 1";
	$result_version = mysqli_query($con,$query_version);
	$rows_version = mysqli_num_rows($result_version);
	if ($rows_version>0)
	{
		?>
		</br>
		<?php 
		echo '<h4>'.$website["FACILINO_VERSION"].'&nbsp;&nbsp;<a onclick="if (document.getElementById(\'version\').style.display===\'block\') document.getElementById(\'version\').style.display=\'none\'; else document.getElementById(\'version\').style.display=\'block\';" title="'.$website["SHOW_HIDE"].'" style="text-decoration: none;"><span class="mbri-preview mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a></h4>';
		if (isset($_COOKIE["cookieFacilinoVersionId"]))
		{
			?><div class="datagrid" id="version" style='display:none'><?php
		}
		else
		{
			?><div class="datagrid" id="version" style='display:block'><?php
		}
		?><section class="features18 popup-btn-cards cid-qYa5rQWOty" id="features">
		<div class="container">
		<div class="row pt-5 ">
		<?php
		for ($j = 0; $j < $rows_version; $j++)
		{
			$row_version = mysqli_fetch_row($result_version);
			?>
			<div class="card p-3 col-12 col-md-6 col-lg-4">
			<div class="card-wrapper ">
			<div class="card-img">
			<div class="mbr-section-btn text-center"><a onclick="selectVersion('<?php echo $row_version[2]?>',<?php echo $row_version[0]?>);" class="btn btn-primary display-4"><?php echo $website["SELECT"]?></a></div>
			<a onclick="selectVersion('<?php echo $row_version[2]?>',<?php echo $row_version[0]?>);"><img src="assets/images/<?php echo $row_version[4]?>"></a>
			</div>
			<div class="card-box">
			<h4 class="card-title mbr-fonts-style display-7" style="margin-top:10px"><?php echo $row_version[2]?></h4>
			<?php
			if ($lang==='en-GB')
			{?>
				<p class="mbr-text mbr-fonts-style align-left display-7"><?php echo $row_version[3]?></p><?php
			}
			elseif ($lang==='es-ES')
			{?>
				<p class="mbr-text mbr-fonts-style align-left display-7"><?php echo $row_version[5]?></p><?php
			}?>
			</div>
			</div>
			</div>
			<?php
		}
		?>
		</div>
		</div>
		</section>
		</div>
		<script>
		function selectVersion(el,id){
			document.getElementById('lbl_facil_id').innerHTML=el;
			document.getElementById('inp_facil_id').value=id;
			document.cookie = "cookieFacilinoVersionName="+document.getElementById('lbl_facil_id').innerHTML;
			document.cookie = "cookieFacilinoVersionId="+document.getElementById('inp_facil_id').value;
			if (id===3){
				document.getElementById('OTA_settings').style.display="block";
			}else{
				document.getElementById('OTA_settings').style.display="none";
			}
			document.getElementById('version').style.display="none";
		}
		</script>
		<?php
	}
	else
	{
		?>
		<td><label id="lbl_facil_id">Facilino</label></td>
		<?php
	}
	if (isset($_COOKIE['cookieProcessorId']))
		$query_filt="SELECT * from `filters` inner join `filters_meta` on (`filters_meta`.`processor_id`=".$_COOKIE['cookieProcessorId']." and `filters`.`id`=`filters_meta`.`filter_id`) where 1";
	else
		$query_filt = "SELECT * from `filters` where 1";
	$result_filt = mysqli_query($con,$query_filt);
	$rows_filt = mysqli_num_rows($result_filt);
	if ($rows_filt>0)
	{
		?>
		</br>
		<?php echo '<h4>'.$website["BLOCK_INSTRUCTION_SET"].'&nbsp;&nbsp;<a onclick="if (document.getElementById(\'filters\').style.display===\'block\') document.getElementById(\'filters\').style.display=\'none\'; else document.getElementById(\'filters\').style.display=\'block\';" title="'.$website["SHOW_HIDE"].'" style="text-decoration: none;"><span class="mbri-preview mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a></h4>';
		if (isset($_COOKIE["cookieFacilinoVersionId"]))
		{
			?><div class="datagrid" id='filters' style='display:none'><?php
		}
		else
		{
			?><div class="datagrid" id='filters' style='display:block'><?php
		}
		?><section class="features18 popup-btn-cards cid-qYa5rQWOty" id="features">
		<div class="container">
		<div class="row pt-5 ">
		<?php
		for ($j = 0; $j < $rows_filt; $j++)
		{
			$row_filt = mysqli_fetch_row($result_filt);
			?>
			<div class="card p-3 col-12 col-md-6 col-lg-4">
			<div class="card-wrapper ">
			<div class="card-img">
			<div class="mbr-section-btn text-center"><a onclick="selectBlocks('<?php echo $row_filt[2]?>',<?php echo $row_filt[0]?>);" class="btn btn-primary display-4"><?php echo $website["SELECT"]?></a></div>
			<a onclick="selectBlocks('<?php echo $row_filt[2]?>',<?php echo $row_filt[0]?>);"><img src="assets/images/<?php echo $row_filt[4]?>"></a>
			</div>
			<div class="card-box">
			<h4 class="card-title mbr-fonts-style display-7" style="margin-top:10px"><?php 
			if ($lang==='en-GB')
			 echo $row_filt[2];
			elseif ($lang==='es-ES')
			 echo $row_filt[5];
			?></h4>
			<?php
			if ($lang==='en-GB')
			{?>
				<p class="mbr-text mbr-fonts-style align-left display-7"><?php echo $row_filt[3]?></p><?php
			}
			elseif ($lang==='es-ES')
			{?>
				<p class="mbr-text mbr-fonts-style align-left display-7"><?php echo $row_filt[6]?></p><?php
			}?>
			</div>
			</div>
			</div>
			<?php
		}
		?>
		</div>
		</div>
		</section>
		</div>
		<script>
		function selectBlocks(el,id){
			document.getElementById('lbl_filter_id').innerHTML=el;
			document.getElementById('inp_filter_id').value=id;
			document.cookie = "cookieFacilinoFilterName="+document.getElementById('lbl_filter_id').innerHTML;
			document.cookie = "cookieFacilinoFilterId="+document.getElementById('inp_filter_id').value;
			document.getElementById('filters').style.display="none";
		}
		</script>
		<?php
	}
	else
	{
		?>
		<td><label id="lbl_filter_id"><?php echo $website["GENERIC_PROJECT"]?></label></td>
		<?php
	}
	echo '<input name="create_button" type="submit" value="'.$website["CREATE"].'" />&nbsp;&nbsp;';
	echo '<input name="cancel_button" type="submit" value="'.$website["CANCEL"].'"/>';
	$query_user="SELECT id FROM `users` WHERE `users`.username=\"".$_SESSION["username"]."\" and active=1";
	$result_user=mysqli_query($con,$query_user);
	$rows_user = mysqli_num_rows($result_user);
	if ($rows_user==1)
	{
		$row_user=mysqli_fetch_row($result_user);
		?>
		<input name="user_id" value="<?php echo $row_user[0]?>" type="hidden"/>
		<?php
	}
	?></form><?php
	}
	//END HTML DOC
	?>
	</div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
</html>
	<?php
	
}
elseif  (isset($_GET["action"])&&($_GET["action"]=="import")&&isset($_POST["share_link"])&&!isset($_POST["action"])&&isset($_POST["cancel_button"])){
	//Exit from import project
	header("Location: dashboard.php");
}
elseif  (isset($_GET["action"])&&($_GET["action"]=="import")&&!isset($_POST["action"])&&isset($_POST["import_button"])&&isset($_FILES["filename"])){
	//Import project
	include("auth.php");
	$meta_data=simplexml_load_file($_FILES["filename"]["tmp_name"]);
	$name=(string)$meta_data->name;
	$processor_id=(int)$meta_data->processor_id;
	$filter_id=(int)$meta_data->filter_id;
	$version_id=(int)$meta_data->version_id;
	$language_id=(int)$meta_data->language_id;
	$share_key=(string)$meta_data->share_key;
	$server_ip=(string)$meta_data->server_ip;
	$device_ip=(string)$meta_data->device_ip;
	$attribution_proj_id=(int)$meta_data->attribution_proj_id;
	$attribution_id=(int)$meta_data->attribution_id;
	$attribution=(string)$meta_data->attribution;
	
	$num_blocks=0;
	//var_dump($meta_data->count());
	$meta_data->rewind();
	$code="";
	foreach ($meta_data->children() as $key=>$block)
	{
		if (strcmp($key,"block")==0)
		{
			//$xml=htmlentities(sanitizeInput($block->saveXML()),ENT_XML1);
			$dom_sxe = dom_import_simplexml($block);  // Returns a DomElement object
			$dom_output = new DOMDocument('1.0');
			$dom_output->formatOutput = false;
			$dom_sxe = $dom_output->importNode($dom_sxe, true);
			$dom_sxe = $dom_output->appendChild($dom_sxe);
			$text=$dom_output->saveXML($dom_output, LIBXML_NOEMPTYTAG);
			$code=$code.substr($text,strpos($text,"\n")+1);
		}
	}	
	
	$query_user="SELECT id FROM `users` WHERE `users`.username=\"".$_SESSION["username"]."\" and active=1";
	$result_user=mysqli_query($con,$query_user);
	$rows_user = mysqli_num_rows($result_user);
	if ($rows_user==1)
	{
		$row_user=mysqli_fetch_row($result_user);
		
		$query_facilino="INSERT INTO `facilino_code`(`blockly_code`,`arduino_code`) VALUES (?,\"\")";
		$statement_facilino=mysqli_prepare($con,$query_facilino);
		$statement_facilino->bind_param("s",htmlspecialchars_decode($code,ENT_XML1));
		$statement_facilino->execute();
		$facilino_code_id=$con->insert_id;
		
		$query_project="INSERT INTO `projects`(`name`,`user_id`,`processor_id`,`filter_id`,`facilino_code_id`,`version_id`,`language_id`,`create_date`,`modified_date`,`share_key`,`server_ip`,`device_ip`) VALUES (?,?,?,?,?,?,?,'".date("Y-m-d H:i:s")."','".date("Y-m-d H:i:s")."',?,?,?)";
		$statement_project=mysqli_prepare($con,$query_project);
		$statement_project->bind_param("siiiiiisss",$name,$row_user[0],$processor_id,$filter_id,$facilino_code_id,$version_id,$language_id,$share_key,$server_ip,$device_ip);
		$statement_project->execute();
		
	}
	header("Location: dashboard.php");
}
elseif  (isset($_GET["action"])&&($_GET["action"]=="import")&&isset($_POST["name"])&&isset($_POST["processor"])&&!isset($_POST["action"])&&isset($_POST["import_example"])){
	//Import project
	include("auth.php");
	$query ="SELECT `examples`.`id` from `examples` inner join `processors` on (`processors`.`id`=`examples`.`processors_id`) WHERE `examples`.`name`=\"".$_POST["name"]."\" and `processors`.`mcu_family`=\"".$_POST["processor"]."\"";
	$result = mysqli_query($con,$query);
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row = mysqli_fetch_row($result);
		header("Location: share.php?id=".$row[0]."&share_key=".$key);
	}
	else
	{
		header("Location: dashboard.php");
	}
}
elseif (isset($_GET["action"])&&($_GET["action"]=="import")&&!isset($_POST["action"])){
	//Form with a new project to be imported
	include("auth.php");
	require_once('website_translation.php');
?>
<!DOCTYPE html>
<html><?php include "head.php"; ?>
	<body>
		<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:2em; margin-left: 0.5em; margin-right: 0.5em">
	<h3><?php echo $website["IMPORT_PROJECT"]?></h3>
	<h4><?php echo $website["SHARE_LINK"]?></h4>
	<form action="dashboard.php?action=import" method="POST" style="margin-bottom:0.5em" enctype="multipart/form-data">
	<!-- <label>Project name:</label><input type="text" maxlength="250" size="250" name="projectname" value="" style="margin-top: 0px; padding: 0px; padding-left: 10px; font-size: 16px; width:80%"/>-->
	<label>Facilino file:</label><input type="file" id="myFile" name="filename" accept="*.bly">
	</br><?php
	echo '<input name="import_button" type="submit" value="'.$website["IMPORT"].'" />&nbsp;&nbsp;';
	echo '<input name="cancel_button" type="submit" value="'.$website["CANCEL"].'"/>';
	$query_user="SELECT id FROM `users` WHERE `users`.username=\"".$_SESSION["username"]."\" and active=1";
	$result_user=mysqli_query($con,$query_user);
	$rows_user = mysqli_num_rows($result_user);
	if ($rows_user==1)
	{
		$row_user=mysqli_fetch_row($result_user);
		?><input name="user_id" value="<?php echo $row_user[0]?>" type="hidden"/><?php
	}
	?></form><?php
	
	//END HTML DOC
	?>
	</div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
</html>
	<?php
}
elseif  (isset($_GET["action"])&&(($_GET["action"]=="edit")||($_GET["action"]=="edit_example"))&&!isset($_POST["action"])){
	include("auth.php");
	require_once('website_translation.php');
	?>
<!DOCTYPE html>
<html><?php include "head.php"; ?>
	<body>
		<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:2em; margin-left: 0.5em; margin-right: 0.5em">
		<?php
	//Form with the projected to be modified
	if ($_GET["action"]=="edit")
		$query = "SELECT * from `projects` as proj where proj.`id`= ".$_GET["id"];
	else
		$query = "SELECT * from `examples` as proj where proj.`id`= ".$_GET["id"];
	$result = mysqli_query($con,$query);
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row = mysqli_fetch_row($result);
		?>
		<h3>
		<?php 
			if ($_GET["action"]=="edit")
				echo $website["PROJECT"];
			else
				echo $website["EXAMPLE"];
		?></h3>
		<h4><?php echo $website["SETTINGS"]?></h4>
		<?php
			if ($_GET["action"]=="edit")
			{
				?>
				<form action="dashboard.php?action=update&id=<?php echo $row[0]?>" method="POST" style="margin-bottom:0.5em">
				<?php
			}
			else
			{
				?>
				<form action="dashboard.php?action=update_example&id=<?php echo $row[0]?>" method="POST" style="margin-bottom:0.5em">
				<?php
			}
		?>
		<div class="datagrid">
		<table width="100%">
		<tr><th style="width:35%"><?php echo $website["NAME"]?></th><th style="width:15%"><?php echo $website["BOARD"]?></th><th style="width:15%"><?php echo $website["FACILINO_VERSION"]?></th><th style="width:15%"><?php echo $website["BLOCK_INSTRUCTION_SET"]?></th><th style="width:15%"><?php echo $website["LANGUAGE"]?></th></tr>
		<tr>
		<td valign=top><input type="text" maxlength="50" size="50" name="edited_project_name" value="<?php echo $row[1]?>" style="margin-top: 0px; padding: 0px; padding-left: 10px; font-size: 12px; width: 100%"/></td>
		<?php
		$query_proc = "SELECT id,name from `processors` where 1";
		$result_proc = mysqli_query($con,$query_proc);
		$rows_proc = mysqli_num_rows($result_proc);
		if ($rows_proc>0)
		{
			/*
			?>
			<td><select id="edited_processor_id" name="edited_processor_id" type="text" value="<?php echo $row[3]?>"/>
			<?php
			for ($j = 0; $j < $rows_proc; $j++)
			{
				$row_proc = mysqli_fetch_row($result_proc);
				?><option value="<?php echo $row_proc[0]?>"><?php echo $row_proc[1]?></option>
				<?php
			}
			?></select></td><?php
			*/
			?>
			<td valign=top>
			<?php
			for ($j=0;$j<$rows_proc;$j++)
			{
				$row_proc = mysqli_fetch_row($result_proc);
				if ($row[3]==$row_proc[0])
				{
					?><div><input type="radio" id="proc_<?php echo $row_proc[0]?>" name="edited_processor_id" value="<?php echo $row_proc[0]?>" checked="checked"><label for="proc_<?php echo $row_proc[0]?>" ><?php echo $row_proc[1]?></label></input></div><?php
				}
				else
				{
					?><div><input type="radio" id="proc_<?php echo $row_proc[0]?>" name="edited_processor_id" value="<?php echo $row_proc[0]?>"><label for="proc_<?php echo $row_proc[0]?>" ><?php echo $row_proc[1]?></label></input></div><?php
				}
			}
			?>
			</td>
			<?php
		}
		else
		{
			?><td/><?php
		}
		$query_facil = "SELECT id,name from `facilino_version` where 1";
		$result_facil = mysqli_query($con,$query_facil);
		$rows_facil = mysqli_num_rows($result_facil);
		if ($rows_facil>0)
		{
			/*
			?>
			<td><select id="edited_facilino_version_id" name="edited_facilino_version_id" type="text" value="<?php echo $row[6]?>"/>
			<?php
			for ($j = 0; $j < $rows_facil; $j++)
			{
				$row_facil = mysqli_fetch_row($result_facil);
				?>
				<option value="<?php echo $row_facil[0]?>"><?php echo $row_facil[1]?></option>
				<?php
			}
			?></select></td><?php
			*/
			?>
			<td valign=top>
			<?php
			for ($j=0;$j<$rows_facil;$j++)
			{
				$row_facil = mysqli_fetch_row($result_facil);
				if ($row[6]==$row_facil[0])
				{
					?><div><input type="radio" id="version_<?php echo $row_facil[0]?>" name="edited_facilino_version_id" value="<?php echo $row_facil[0]?>" checked="checked"><label for="version_<?php echo $row_facil[0]?>" ><?php echo $row_facil[1]?></label></input></div><?php
				}
				else
				{
					?><div><input type="radio" id="version_<?php echo $row_facil[0]?>" name="edited_facilino_version_id" value="<?php echo $row_facil[0]?>"><label for="version_<?php echo $row_facil[0]?>" ><?php echo $row_facil[1]?></label></input></div><?php
				}
			}
			?>
			</td>
			<?php
		}
		else
		{
			?><td/><?php
		}
		$query_filt = "SELECT id,name from `filters` where 1";
		$result_filt = mysqli_query($con,$query_filt);
		$rows_filt = mysqli_num_rows($result_filt);
		if ($rows_filt>0)
		{
			/*
			?><td valign=top><select id="edited_filter_id" name="edited_filter_id" type="text" value="<?php echo $row[4]?>"/>
			<?php
			for ($j = 0; $j < $rows_filt; $j++)
			{
				$row_filt = mysqli_fetch_row($result_filt);
				?><option value="<?php echo $row_filt[0]?>"><?php echo $row_filt[1]?></option>
				<?php
			}
			?></select></td><?php
			*/
			?>
			<td valign=top>
			<?php
			for ($j=0;$j<$rows_filt;$j++)
			{
				$row_filt = mysqli_fetch_row($result_filt);
				if ($row[4]==$row_filt[0])
				{
					?><div><input type="radio" id="filt_<?php echo $row_filt[0]?>" name="edited_filter_id" value="<?php echo $row_filt[0]?>" checked="checked"><label for="filt_<?php echo $row_filt[0]?>" ><?php echo $row_filt[1]?></label></input></div><?php
				}
				else
				{
					?><div><input type="radio" id="filt_<?php echo $row_filt[0]?>" name="edited_filter_id" value="<?php echo $row_filt[0]?>"><label for="filt_<?php echo $row_filt[0]?>" ><?php echo $row_filt[1]?></label></input></div><?php
				}
			}
			?>
			</td>
			<?php
		}
		else
		{
			?><td/><?php
		}
		$query_lang = "SELECT id,name from `languages` where 1";
		$result_lang = mysqli_query($con,$query_lang);
		$rows_lang = mysqli_num_rows($result_lang);
		if ($rows_lang>0)
		{
			/*?><td valign=top><select id="edited_language_id" name="edited_language_id" type="text" value="<?php echo $row[7]?>"/>
			<?php
			for ($j = 0; $j < $rows_lang; $j++)
			{
				$row_lang = mysqli_fetch_row($result_lang);
				?><option value="<?php echo $row_lang[0]?>"><?php echo $row_lang[1]?></option><?php
			}
			?></select></td><?php
			*/
			?>
			<td valign=top>
			<?php
			for ($j=0;$j<$rows_lang;$j++)
			{
				$row_lang = mysqli_fetch_row($result_lang);
				if ($row[7]==$row_lang[0])
				{
					?><div><input type="radio" id="lang_<?php echo $row_lang[0]?>" name="edited_language_id" value="<?php echo $row_lang[0]?>" checked="checked"><label for="lang_<?php echo $row_lang[0]?>" ><?php echo $row_lang[1]?></label></input></div><?php
				}
				else
				{
					?><div><input type="radio" id="lang_<?php echo $row_lang[0]?>" name="edited_language_id" value="<?php echo $row_lang[0]?>"><label for="lang_<?php echo $row_lang[0]?>" ><?php echo $row_lang[1]?></label></input></div><?php
				}
			}
			?>
			</td>
			<?php
		}
		else
		{
			?><td/><?php
		}
		?>
		</tr>
		</table>
		<div id="OTA_settings" style="display:block; margin-top: 10px; padding: 0px; padding-left: 10px">
		<h5><?php echo $website["OTA_SETTINGS"]?></h5>
		<table width="40%" >
		<tr><th style="width:20%"><?php echo $website["SERVER_IP"]?></th><th style="width:20%"><?php echo $website["DEVICE_IP"]?></th></tr>
		<tr>
		<td><input name="edited_facil_server" type="text" minlength="7" maxlength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" style="font-size: 12px; padding: 0px;" value="<?php echo $row[11];?>"></input></td><td><input name="edited_facil_device" type="text" minlength="7" maxlength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" style="font-size: 12px; padding: 0px;" value="<?php echo $row[12];?>"></input></td>
		</td>
		</tr>
		</table>
		<?php
		/*
		?>
		<script>document.getElementById("edited_processor_id").value =<?php echo '"'.$row[3].'"'?></script>
		<script>document.getElementById("edited_facilino_version_id").value =<?php echo '"'.$row[6].'"'?></script>
		<script>document.getElementById("edited_filter_id").value =<?php echo '"'.$row[4].'"'?></script>
		<script>document.getElementById("edited_language_id").value =<?php echo '"'.$row[7].'"'?></script>
		<?php
		*/
		?>
		</div>
		<label style="color:red;"><?php echo $website["WARNING_BOARD_CHANGE"]?></label><br/>
		<?php
		echo '<input name="update_button" type="submit" value="'.$website["UPDATE"].'" />&nbsp;&nbsp;';
		echo '<input name="cancel_button" type="submit" value="'.$website["CANCEL"].'"/>';
		?>
		<input name="project_id" value="<?php echo $row[0]?>" type="hidden"/>
		</form>
		<?php
	}
	//END HTML DOC
	?>
	</div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
</html>
	<?php
}
elseif (isset($_POST["action"])&&(($_POST["action"]=="update")||($_POST["action"]=="update_example"))&&isset($_POST["username"])&&isset($_POST["key"])&&isset($_POST["proj_id"])&&isset($_POST["name"])&&isset($_POST["proc_id"])&&isset($_POST["version_id"])&&isset($_POST["filter_id"])&&isset($_POST["lang_id"]))
{
	header("Content-type: application/json; charset=utf-8");
	$row_user=getUserIdAndRole($con,$_POST['username'],$_POST['key']);
	if (!empty($row_user))
	{
		if (isset($_POST["server"]))
			echo json_encode(updateProject($con,$_POST["proj_id"],$_POST["action"],$_POST["name"],$_POST["proc_id"],$_POST["version_id"],$_POST["filter_id"],$_POST["lang_id"],$_POST["server"],$_POST["device"]));
		else
			echo json_encode(updateProject($con,$_POST["proj_id"],$_POST["action"],$_POST["name"],$_POST["proc_id"],$_POST["version_id"],$_POST["filter_id"],$_POST["lang_id"],"",""));
	}
	else
	{
		echo json_encode(array());
	}	
}
elseif (isset($_POST["action"])&&($_POST["action"]=="update")&&isset($_POST["invited"])&&isset($_POST["user_id"])&&isset($_POST["proj_id"])&&isset($_POST["name"])&&isset($_POST["proc_id"])&&isset($_POST["version_id"])&&isset($_POST["filter_id"])&&isset($_POST["lang_id"]))
{
	header("Content-type: application/json; charset=utf-8");
	if (isset($_POST["server"]))
		echo json_encode(updateProject($con,$_POST["proj_id"],$_POST["action"],$_POST["name"],$_POST["proc_id"],$_POST["version_id"],$_POST["filter_id"],$_POST["lang_id"],$_POST["server"],$_POST["device"],"_tmp"));
	else
		echo json_encode(updateProject($con,$_POST["proj_id"],$_POST["action"],$_POST["name"],$_POST["proc_id"],$_POST["version_id"],$_POST["filter_id"],$_POST["lang_id"],"","","_tmp"));
}
elseif  (isset($_GET["action"])&&(($_GET["action"]=="update")||($_GET["action"]=="update_example"))&&!isset($_POST["action"])&&isset($_POST["cancel_button"])){
	//Cancel project modifications
	header("Location: dashboard.php");
}
elseif  (isset($_GET["action"])&&(($_GET["action"]=="update")||($_GET["action"]=="update_example"))&&!isset($_POST["action"])&&isset($_POST["update_button"])){
	include("auth.php");
	updateProject($con,$_POST["project_id"],$_GET["action"],$_POST["edited_project_name"],$_POST["edited_processor_id"],$_POST["edited_facilino_version_id"],$_POST["edited_filter_id"],$_POST["edited_language_id"],$_POST["edited_facil_server"],$_POST["edited_facil_device"]);
	//Update project modifications
	/*if ($_GET["action"]=="update")
		$query="UPDATE `projects` SET `name`=\"".$_POST["edited_project_name"]."\",`processor_id`=".$_POST["edited_processor_id"].",`filter_id`=".$_POST["edited_filter_id"].",`version_id`=".$_POST["edited_facilino_version_id"].",`language_id`=".$_POST["edited_language_id"].",`server_ip`=\"".$_POST["edited_facil_server"]."\",`device_ip`=\"".$_POST["edited_facil_device"]."\" WHERE `projects`.id=".$_POST["project_id"];
	else
		$query="UPDATE `examples` SET `name`=\"".$_POST["edited_project_name"]."\",`processor_id`=".$_POST["edited_processor_id"].",`filter_id`=".$_POST["edited_filter_id"].",`version_id`=".$_POST["edited_facilino_version_id"].",`language_id`=".$_POST["edited_language_id"].",`server_ip`=\"".$_POST["edited_facil_server"]."\",`device_ip`=\"".$_POST["edited_facil_device"]."\" WHERE `examples`.id=".$_POST["project_id"];
	$result = mysqli_query($con,$query);*/
	header("Location: dashboard.php");
}
elseif (isset($_POST['username'])&&isset($_POST['key']))
{
	header("Content-type: application/json; charset=utf-8");
	$row_user=getUserIdAndRole($con,$_POST['username'],$_POST['key']);
	if (!empty($row_user))
	{
		echo json_encode(getProjectData($con,$row_user['id']));
	}
	else
	{
		echo json_encode(array());
	}
}
elseif (isset($_POST['invited'])&&(isset($_POST['user_id'])))
{
	header("Content-type: application/json; charset=utf-8");
	echo json_encode(getProjectData($con,$_POST['user_id'],"_tmp"));
}
else
{
	include("auth.php");
	require_once('website_translation.php');
?>
<!DOCTYPE html>
<html><?php include "head.php"; ?>
	<body>
		<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:2em; margin-left: 0.5em; margin-right: 0.5em">
		<?php
?>
<script type='text/javascript'>
	document.cookie = "cookieProcessorName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	//document.cookie = "cookieProcessorId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "cookieProjectName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
</script>
<?php
$row_user=getUserIdAndRole($con,$_SESSION['username'],$_SESSION['key']);
$projects=getProjectData($con,$row_user['id']);
?>
	<h3><?php echo $website["PROJECTS"]?></h3>
	<h4>&nbsp;<a href="dashboard.php?action=new" title="<?php echo $website["NEW_PROJECT"]?>" style="text-decoration: none;"><?php echo $website["NEW_PROJECT"]?>&nbsp;<span class="mbri-plus mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;&nbsp;<a href="dashboard.php?action=import" title="<?php echo $website["IMPORT"]?>" style="text-decoration: none;"><?php echo $website["IMPORT"]?>&nbsp;<span class="mbri-upload mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a></h4>
	<div class="datagrid">
	<table width="100%">
	<col style="width:20%">
	<col style="width:12%">
	<col style="width:12%">
	<col style="width:12%">
	<col style="width:12%">
	<col style="width:15%">
	<col style="width:20%">
	<tr><th><?php echo $website["NAME"]?></th><th><?php echo $website["BOARD"]?></th><th><?php echo $website["FACILINO_VERSION"]?></th><th><?php echo $website["BLOCKS"]?></th><th><?php echo $website["LANGUAGE"]?></th><th><?php echo $website["MODIFIED_DATE"]?></th><th><?php echo $website["ACTIONS"]?></th></tr>
	<?php
	$row_count=0;
	foreach ($projects as $project)
	{
		if ($row_count%2==0)
		 {
		 ?><tr><?php
		 }
		 else
		 {
			 ?><tr style="background-color:#ECF0F1"><?php
		 }
		 ?><td><a href="facilino.php?action=open&id=<?php echo $project['id']?>" title="<?php echo $website["OPEN"]?>" style="text-decoration: none;"><?php echo $project['name'];?></a></td>
		 <td><?php echo $project['proc']?></td>
		 <td><?php echo $project['facil']?></td>
		 <td><?php echo $project['filt']?></td>
		 <td><?php echo $project['lang']?></td>
		 <td><?php echo $project['date']?></td>
		 <td>
		 <a href="dashboard.php?action=edit&id=<?php echo $project['id']?>" title="<?php echo $website["EDIT"]?>" style="text-decoration: none;"><span class="mbri-edit mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
		 <a href="dashboard.php?action=duplicate&id=<?php echo $project['id']?>" title="<?php echo $website["DUPLICATE"]?>" style="text-decoration: none;"><span class="mbri-pages mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
		 <a title="<?php echo $website["DELETE"]?>" onclick="javascript: return confirm('<?php echo $website["DELETE_QUESTION"]?>');" href="dashboard.php?action=delete&id=<?php echo $project['id']?>" style="text-decoration: none;"><span class="mbri-trash mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
		 <?php
		 //
		 
		 $dir = $_SERVER['HTTP_HOST'];
		 if (in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1']))
			$share='http://'.$dir.'/facilino_ota/facilino.php';
		 else
		 {
			$url = $_SERVER['REQUEST_URI']; //returns the current URL
			$parts = explode('/',$url);
			for ($i = 0; $i < count($parts)- 1; $i++) {
				$dir .= $parts[$i] . "/";
			}
			$share='https://'.$dir.'facilino.php';
		 }
		 ?><a onClick="shareLink('<?php echo $share?>?action=view&id=<?php echo $project['id']?>');" title="<?php echo $website["SHARE"]?>" style="text-decoration: none;"><span class="mbri-preview mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
		 <a href="download.php?action=arduino&id=<?php echo $project['id']?>" title="<?php echo $website["DOWNLOAD_ARDUINO_CODE"]?>" style="text-decoration: none;">
		 <!-- <span class="mbri-download mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span>-->
		 <span class="mbri-arduino mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span>
		 </a>&nbsp;
		 <a href="download.php?action=facilino&id=<?php echo $project['id']?>" title="<?php echo $website["DOWNLOAD_FACILINO_CODE"]?>" style="text-decoration: none;"><span class="mbri-to-local-drive mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
		 </td>
		 </tr>
		 <?php
		 $row_count=$row_count+1;
	}
	?>
	</table>
	</div>
	<br/>
	
	<?php
	//List all examples (only Administrator)
	if ($row_user["user_role_id"]==1)
	{
		$query = "SELECT proj.id,proj.name,proc.name,facil.name,filt.name,lang.name,proj.modified_date,proj.share_key from `examples` as proj inner join `processors` as proc on proc.id=proj.processor_id inner join `filters` as filt on filt.id=proj.filter_id inner join `facilino_version` as facil on facil.id=proj.version_id inner join `languages` as lang on lang.id=proj.language_id where proj.`user_id` = ".$row_user["id"]." order by proj.`modified_date` desc";
		$result = mysqli_query($con,$query);
		?>
		<h3><?php echo $website["EXAMPLES"]?></h3>
		<h4>&nbsp;<a href="dashboard.php?action=new_example" title="<?php echo $website["NEW_EXAMPLE"]?>" style="text-decoration: none;"><?php echo $website["NEW_EXAMPLE"]?>&nbsp;<span class="mbri-plus mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a></h4>
		<div class="datagrid">
		<table width="100%">
		<col style="width:20%">
		<col style="width:12%">
		<col style="width:12%">
		<col style="width:12%">
		<col style="width:12%">
		<col style="width:15%">
		<col style="width:20%">
		<tr><th><?php echo $website["NAME"]?></th><th><?php echo $website["BOARD"]?></th><th><?php echo $website["FACILINO_VERSION"]?></th><th><?php echo $website["BLOCKS"]?></th><th><?php echo $website["LANGUAGE"]?></th><th><?php echo $website["MODIFIED_DATE"]?></th><th><?php echo $website["ACTIONS"]?></th></tr>
		<?php
		$row_count=0;
		while ($row = mysqli_fetch_row($result)) {
			 if ($row_count%2==0)
			 {
			 ?><tr><?php
			 }
			 else
			 {
				 ?><tr style="background-color:#ECF0F1"><?php
			 }
			 ?><td><a href="facilino.php?action=open_example&id=<?php echo $row[0]?>" title="<?php echo $website["OPEN"]?>" style="text-decoration: none;"><?php echo $row[1];?></a></td><?php
			 for ($j = 2; $j < 7; $j++) {
				  ?><td><?php echo $row[$j]?></td><?php
			 }
			 ?>
			 <td>
			 <a href="dashboard.php?action=edit_example&id=<?php echo $row[0]?>" title="<?php echo $website["EDIT"]?>" style="text-decoration: none;"><span class="mbri-edit mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
			 <a href="dashboard.php?action=duplicate_example&id=<?php echo $row[0]?>" title="<?php echo $website["DUPLICATE"]?>" style="text-decoration: none;"><span class="mbri-pages mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
			 <a title="<?php echo $website["DELETE"]?>" onclick="javascript: return confirm('<?php echo $website["DELETE_QUESTION"]?>');" href="dashboard.php?action=delete_example&id=<?php echo $row[0]?>" style="text-decoration: none;"><span class="mbri-trash mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
			 <?php
			 //
			 
			 $dir = $_SERVER['HTTP_HOST'];
			 if (in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1']))
				$share='http://'.$dir.'/facilino_ota/facilino.php';
			 else
			 {
				$url = $_SERVER['REQUEST_URI']; //returns the current URL
				$parts = explode('/',$url);
				for ($i = 0; $i < count($parts)- 1; $i++) {
					$dir .= $parts[$i] . "/";
				}
				$share='https://'.$dir.'facilino.php';
			 }
			 ?>
			 <a href="download.php?action=arduino_example&id=<?php echo $row[0]?>" title="<?php echo $website["DOWNLOAD_ARDUINO_CODE"]?>" style="text-decoration: none;">
			 <!-- <span class="mbri-download mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span>-->
			 <span class="mbri-arduino mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span>
			 </a>&nbsp;
			 <a href="download.php?action=facilino_example&id=<?php echo $row[0]?>" title="<?php echo $website["DOWNLOAD_FACILINO_CODE"]?>" style="text-decoration: none;"><span class="mbri-to-local-drive mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
			 </td>
			 </tr>
			 <?php
			 $row_count=$row_count+1;
		}
		?>
		</table>
		</div>
		<?php
	}
?>
<div id="modal1" class="modal">
<div class="modal-content" style="width: 50%">
<span class="close">&times;</span>
<p><?php echo $website["USE_LINK"]?></p>
<p style="color:red"><?php echo $website["USE_LINK_INFO"]?></p>
<p><a href="" id="share_link" target="_blank"></a></p>
</div>
</div>
</br>
<script>
var modal1 = document.getElementById("modal1");
var span1 = document.getElementsByClassName("close")[0];
window.onclick = function(event) { if (event.target == modal1) { modal1.style.display = "none"; } };
span1.onclick = function() {modal1.style.display = "none";};
function shareLink(link){ var modal1 = document.getElementById("modal1"); var link_a = document.getElementById("share_link"); link_a.href=link; link_a.innerHTML=link; modal1.style.display = "block";};
</script>
<!-- END HTML DOC-->
</div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
</html>
<?php
}
?>