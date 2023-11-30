<?php
require_once('db.php');
require_once('website_translation.php');

if (isset($_GET["action"]))
{
	if (($_GET["action"]=="open")||($_GET["action"]=="save")||($_GET["action"]=="open_example")||($_GET["action"]=="save_example"))
	{
		if (isset($_GET["username"])&&isset($_GET["key"]))
		{
			if (session_status() !== PHP_SESSION_ACTIVE)
				session_start();
			$_SESSION["username"]=$_GET["username"];
			$_SESSION["key"]=$_GET["key"];
		}
		else
		{
			include("auth.php");
		}
	}
}
	

if (isset($_GET["action"])&&(($_GET["action"]=="save")||($_GET["action"]=="save_example"))&&isset($_POST['facilino_code'])&&isset($_POST['arduino_code'])&&isset($_POST['project_id']))
{
	//Save project, then open
	//$query = "SELECT facilino_code_id from `projects` where id= ".$_POST['project_id'];
	//$result = mysqli_query($con,$query);
	if ($_GET["action"]=="save")
		$query = "SELECT facilino_code_id from `projects` where id=?";
	else
		$query = "SELECT facilino_code_id from `examples` where id=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("i",$_POST['project_id']);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row=mysqli_fetch_row($result);
		//$query="UPDATE `facilino_code` SET `blockly_code`='".htmlspecialchars_decode($_POST['facilino_code'],ENT_XML1)."',`arduino_code`='".$_POST["arduino_code"]."' WHERE id=".$row[0];
		//$result = mysqli_query($con,$query);
		if ($_GET["action"]=="save")
			$query="UPDATE `facilino_code` SET `blockly_code`=?,`arduino_code`=? WHERE id=?";
		else
			$query="UPDATE `facilino_code_examples` SET `blockly_code`=?,`arduino_code`=? WHERE id=?";
		$statement=mysqli_prepare($con,$query);
		$statement->bind_param("ssi",htmlspecialchars_decode($_POST['facilino_code'],ENT_XML1),$_POST["arduino_code"],$row[0]);
		$statement->execute();
		if (isset($_GET["goto"]))
			header ("Location: ".$_GET["goto"]);
		else
		{
			header("Location: ".str_replace("save","open",basename($_SERVER['REQUEST_URI'])));
		}
	}
	else
	{
		if (isset($_GET["goto"]))
			header ("Location: ".$_GET["goto"]);
		else
		{
			header("Location: dashboard.php");
		}
	}
}
elseif (isset($_GET["id"]))
{
	
	?>
	<!DOCTYPE html>
	<html><?php include "head.php"; ?>
	<body>
	<?php
	//if ((!isset($_GET["embbeded"]))&&(!isset($_GET["no_header"])))
	if (!isset($_GET["embbeded"]))
	{
		?><div id="header"><?php include "inc-header.php" ?></div> <?php
	}
	else
	{
		if (isset($_GET["action"])&&($_GET["action"]=="view_example"))
		{
			?>
			<!-- <section class="menu cid-qAignIVLHL" once="menu" id="menu1-e" data-rv-view="7">
			<nav class="navbar navbar-expand beta-menu align-items-center navbar-fixed-top navbar-toggleable-sm">
			<div>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">;
			<div id="toggle_code" class="navbar-buttons mbr-section-btn"><span class="mbri-arduino mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>
			</div>
			</div>
			
			</div>
			</nav>
			</section>-->
			<?php
		}
	}
	
	//Open facilino project
	$project_id=$_GET["id"];
	//$query = "SELECT proj.name,lang.lang_key,filt.name,version.version,proc.mcu as proc_mcu,code.blockly_code,lang.name,proc.name,proj.share_key,proc.id,proj.server_ip,proj.device_ip from `projects` as proj inner join `facilino_code` as code on  code.id=proj.facilino_code_id inner join `languages` as lang on lang.id=proj.language_id inner join `filters` as filt on filt.id=proj.filter_id inner join `facilino_version` as version on version.id=proj.version_id inner join `processors` as proc on proc.id=proj.processor_id inner join `users` on `users`.id=proj.user_id where proj.`id`= ".$project_id." and `users`.`username`=\"".$_SESSION["username"]."\"";
	//$result = mysqli_query($con,$query);
	if (isset($_GET["action"])&&($_GET["action"]=="view"))
	{
		if (isset($_GET["lang"]))
		{
			$query = "SELECT proj.name as proj_name,filt.name filt_name,version.version,proc.mcu as proc_mcu,code.blockly_code,proc.name as proc_name,proj.share_key,proc.id as proc_id,proj.server_ip,proj.device_ip from `projects` as proj inner join `facilino_code` as code on  code.id=proj.facilino_code_id inner join `filters` as filt on filt.id=proj.filter_id inner join `facilino_version` as version on version.id=proj.version_id inner join `processors` as proc on proc.id=proj.processor_id inner join `users` on `users`.id=proj.user_id where proj.`id`=?";
		}
		else
		{
			$query = "SELECT proj.name as proj_name,lang.lang_key,filt.name as filt_name,version.version,proc.mcu as proc_mcu,code.blockly_code,lang.name as lang_name,proc.name,proj.share_key,proc.id as proc_id,proj.server_ip,proj.device_ip from `projects` as proj inner join `facilino_code` as code on  code.id=proj.facilino_code_id inner join `languages` as lang on lang.id=proj.language_id inner join `filters` as filt on filt.id=proj.filter_id inner join `facilino_version` as version on version.id=proj.version_id inner join `processors` as proc on proc.id=proj.processor_id inner join `users` on `users`.id=proj.user_id where proj.`id`=?";
		}
		$statement=mysqli_prepare($con,$query);
		$statement->bind_param("i",$project_id);
	}
	elseif (isset($_GET["action"])&&($_GET["action"]=="view_example"))
	{
		if (!isset($_GET["lang"]))
		{
			$query = "SELECT proj.name as proj_name,filt.name as filt_name,version.version,proc.mcu as proc_mcu,code.blockly_code,proc.name as proc_name,proj.share_key,proc.id as proc_id,proj.server_ip,proj.device_ip from `examples` as proj inner join `facilino_code_examples` as code on  code.id=proj.facilino_code_id inner join `filters` as filt on filt.id=proj.filter_id inner join `facilino_version` as version on version.id=proj.version_id inner join `processors` as proc on proc.id=proj.processor_id inner join `users` on `users`.id=proj.user_id where proj.`id`=?";
		}
		else
		{
			$query = "SELECT proj.name as proj_name,lang.lang_key,filt.name as filt_name,version.version,proc.mcu as proc_mcu,code.blockly_code,lang.name as lang_name,proc.name as proc_name,proj.share_key,proc.id as proc_id,proj.server_ip,proj.device_ip from `examples` as proj inner join `facilino_code_examples` as code on  code.id=proj.facilino_code_id inner join `languages` as lang on lang.id=proj.language_id inner join `filters` as filt on filt.id=proj.filter_id inner join `facilino_version` as version on version.id=proj.version_id inner join `processors` as proc on proc.id=proj.processor_id inner join `users` on `users`.id=proj.user_id where proj.`id`=?";
		}
		$statement=mysqli_prepare($con,$query);
		$statement->bind_param("i",$project_id);
	}
	elseif (isset($_GET["action"])&&($_GET["action"]=="open_example"))
	{
		if (isset($_GET["lang"]))
		{
			$query = "SELECT proj.name as proj_name,filt.name as filt_name,version.version,proc.mcu as proc_mcu,code.blockly_code,proc.name as proc_name,proj.share_key,proc.id as proc_id,proj.server_ip,proj.device_ip from `examples` as proj inner join `facilino_code_examples` as code on  code.id=proj.facilino_code_id inner join `filters` as filt on filt.id=proj.filter_id inner join `facilino_version` as version on version.id=proj.version_id inner join `processors` as proc on proc.id=proj.processor_id inner join `users` on `users`.id=proj.user_id where proj.`id`=? and `users`.`username`=?";
		}
		else
		{
			$query = "SELECT proj.name as proj_name,lang.lang_key,filt.name as filt_name,version.version,proc.mcu as proc_mcu,code.blockly_code,lang.name as lang_name,proc.name as proc_name,proj.share_key,proc.id as proc_id,proj.server_ip,proj.device_ip from `examples` as proj inner join `facilino_code_examples` as code on  code.id=proj.facilino_code_id inner join `languages` as lang on lang.id=proj.language_id inner join `filters` as filt on filt.id=proj.filter_id inner join `facilino_version` as version on version.id=proj.version_id inner join `processors` as proc on proc.id=proj.processor_id inner join `users` on `users`.id=proj.user_id where proj.`id`=? and `users`.`username`=?";
		}
		$statement=mysqli_prepare($con,$query);
		$statement->bind_param("is",$project_id,$_SESSION["username"]);
	}
	else
	{
		if (isset($_GET["lang"]))
		{
			$query = "SELECT proj.name as proj_name,filt.name as filt_name,version.version,proc.mcu as proc_mcu,code.blockly_code,proc.name as proc_name,proj.share_key,proc.id as proc_id,proj.server_ip,proj.device_ip from `projects` as proj inner join `facilino_code` as code on  code.id=proj.facilino_code_id inner join `filters` as filt on filt.id=proj.filter_id inner join `facilino_version` as version on version.id=proj.version_id inner join `processors` as proc on proc.id=proj.processor_id inner join `users` on `users`.id=proj.user_id where proj.`id`=? and `users`.`username`=?";
		}
		else
		{
			$query = "SELECT proj.name as proj_name,lang.lang_key,filt.name as filt_name,version.version,proc.mcu as proc_mcu,code.blockly_code,lang.name as lang_name,proc.name as proc_name,proj.share_key,proc.id as proc_id,proj.server_ip,proj.device_ip from `projects` as proj inner join `facilino_code` as code on  code.id=proj.facilino_code_id inner join `languages` as lang on lang.id=proj.language_id inner join `filters` as filt on filt.id=proj.filter_id inner join `facilino_version` as version on version.id=proj.version_id inner join `processors` as proc on proc.id=proj.processor_id inner join `users` on `users`.id=proj.user_id where proj.`id`=? and `users`.`username`=?";
		}
		$statement=mysqli_prepare($con,$query);
		$statement->bind_param("is",$project_id,$_SESSION["username"]);
	}
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1||($project_id==0))
	{
		if ($project_id!=0)
		{
			$row = mysqli_fetch_assoc($result);
		}
		else
		{
			$query = "SELECT lang.lang_key,lang.name as lang_name,filt.name as filt_name,version.version,proc.mcu as proc_mcu,code.blockly_code,proc.name as proc_name from `languages` as lang, `filters` as filt, `facilino_version` as version,`processors` as proc,`facilino_code` as code where lang.id=".$_GET["lang_id"]." and filt.id=".$_GET["filt_id"]." and version.id=".$_GET["version_id"]." and proc.id=".$_GET["proc_id"]." and code.id=0";
			/*$query = "SELECT lang.lang_key,lang.name as lang_name,filt.name as filt_name,version.version,proc.mcu as proc_mcu,code.blockly_code,proc.name as proc_name from `languages` as lang, `filters` as filt, `facilino_version` as version,`processors` as proc,`facilino_code` as code where lang.id=? and filt.id=? and version.id=? and proc.id=? and code.id=0";
			$statement=mysqli_prepare($con,$query);
			$lang_id=intval($_GET["lang_id"]);
			$filt_id=intval($_GET["filt_id"]);
			$version_id=intval($_GET["version_id"]);
			$proc_id=intval($_GET["proc_id"]);
			$statement->bind_param("iiii",$lang_id,$filt_id,$version_id,$proc_id);
			var_dump($statement);
			$statement->execute();
			$result=$statement->get_result();*/
			$result=mysqli_query($con,$query);
			$row_tmp=mysqli_fetch_assoc($result);
			$row=array("proj_name"=>$_GET["name"],"lang_key"=>$row_tmp['lang_key'],"filt_name"=>$row_tmp['filt_name'],"version"=>$row_tmp['version'],"proc_mcu"=>$row_tmp['proc_mcu'],"blockly_code"=>$row_tmp['blockly_code'],"lang_name"=>$row_tmp['lang_name'],"proc_name"=>$row_tmp['proc_name'],"proc_id"=>$_GET["proc_id"],"share_key"=>"");
		}
		//$query_meta = "SELECT `meta_value` FROM `projects_meta` WHERE `project_id`=".$project_id." and `meta_key`='TOOLBOX'";
		//$result_meta = mysqli_query($con,$query_meta);
		$query_meta = "SELECT `meta_value` FROM `projects_meta` WHERE `project_id`=? and `meta_key`='TOOLBOX'";
		$statement_meta=mysqli_prepare($con,$query_meta);
		$statement_meta->bind_param("i",$project_id);
		$statement_meta->execute();
		$result_meta=$statement_meta->get_result();
		$rows_meta = mysqli_num_rows($result_meta);
		if ($rows_meta==1)
		{
			$row_meta = mysqli_fetch_row($result_meta);
			echo '<script>window.toolbox ='.$row_meta[0].';</script>';
		}
		//$query_compilation_flags = "SELECT variant,compilation_flags FROM `processors_meta` INNER JOIN `processors` ON `processors`.`id`=`processors_meta`.`processor_id` WHERE `processors_meta`.`processor_id`=".$row[9];
		//$result_compilation_flags = mysqli_query($con,$query_compilation_flags);
		$query_compilation_flags="SELECT variant,compilation_flags FROM `processors_meta` INNER JOIN `processors` ON `processors`.`id`=`processors_meta`.`processor_id` WHERE `processors_meta`.`processor_id`=?";
		$statement_compilation=mysqli_prepare($con,$query_compilation_flags);
		$statement_compilation->bind_param("i",$row["proc_id"]);
		$statement_compilation->execute();
		$result_compilation_flags=$statement_compilation->get_result();
		$compilation_flags = array();
		while ($row_compilation_flags=mysqli_fetch_row($result_compilation_flags))
		{
			$compilation_flags[]=array("variant"=>$row_compilation_flags[0],"compilation_flags"=>$row_compilation_flags[1]);
		}
		echo '<script>window.compilation_flags =[';
		if (count($compilation_flags)>0)
		{
			echo '{\'variant\': \''.$compilation_flags[0]["variant"].'\',\'compilation_flags\': \''.$compilation_flags[0]["compilation_flags"].'\'}';
			for ($i=1;$i<count($compilation_flags);$i++)
			{
				echo ',{\'variant\': \''.$compilation_flags[$i]["variant"].'\',\'compilation_flags\': \''.$compilation_flags[$i]["compilation_flags"].'\'}';
			}
		}
		echo '];</script>';
		require('facilino_scripts.php');
		
		//echo htmlentities($row["blockly_code"]);
		
		?>
		<xml id='startBlocksDefault' style='display: none'><block type='controls_setupLoop' deletable='true' x='20' y='5'></block></xml>
		<xml id='startBlocks' style='display:none'><?php echo htmlspecialchars_decode($row["blockly_code"],ENT_XML1) ?></xml>
		<?php
		
		?>
		<xml id='startBlocksOTA' style='display:none'><block type='controls_setupLoop' deletable='false' x='20' y='5'><statement name='SETUP'><block type='communications_wifi_def'><field name='CONSOLE'>FALSE</field><value name='SSID'><block type='text'><field name='TEXT'>MY_WIFI_SSID</field></block></value><value name='PASSWORD'><block type='text'><field name='TEXT'>MY_WIFI_PASSWORD</field></block></value></statement></block></xml>
		<div id="wrap" style="height: 89%;">
			<div id="blockly" style="float: left; width: 100%;">
			<?php
			if (!isset($_GET["embbeded"]))
			{ 
				?>
					<span id="position"></span>
					<div id="dragbar"></div>
					<?php
			}
			?>
			</div>
			<?php
			if (!isset($_GET["embbeded"]))
			{ 
				?>
				<div id="code" style="float: left; width: 34%; height: 100%; display: none">
				<?php
			}
			?>
			  </div>
		</div>
		<?php
		if (!isset($_GET["embbeded"]))
		{ 
			?>
				<div><input type="file" id="importFile" style="display:none" accept=".png," onchange="imageSelected(this.files)"></input><canvas id="canvas" width="578" height="400" style="display:none"></div> 
		<!-- <div style="display:none">
		<form id="save_form" action="" method="post" name="save">
		<input type="hidden" name="blockly_code" value="" />
		<input type="hidden" name="arduino_code" value="" />
		<?php echo '<input name="project_id" value="'.$project_id.'" type="hidden"/>'; ?>
		<input name="submit" type="submit" value="save" />
		</form>
		</div>-->
		<div id="modal_progress" class="modal" style="display:none;margin-left:3em">
		  <div class="modal-content">
			<span class="close" style="width:0.8em">&times;</span>
			<section>
			<?php
			if ($row["version"]=="FacilinoOTA")
			{
				echo "<div class='navbar-buttons mbr-section-btn'><button class='btn btn-sm btn-primary-outline display-4' title='".$website["VERIFY"]."' onclick='compileOTA();' style='padding:0.3em'><span class='mbri-success mbr-iconfont mbr-iconfont-btn' style='color: rgb(255, 148, 0);  margin-left:0.25em;'></span></button>&nbsp;<button class='btn btn-sm btn-primary-outline display-4' title='".$website["UPLOAD"]."' onclick='uploadOTA();' style='padding:0.3em'><span class='mbri-right mbr-iconfont mbr-iconfont-btn' style='color: rgb(255, 148, 0);  margin-left:0.25em'></span></button>&nbsp;";
				echo "<p class='btn' style='padding:0;font-size:12px'>".$website["SERVER_IP"].":<input id='server_ip_upload' name='server_ip_upload' type='text' value='".$row["server_ip"]."'></input>&nbsp;".$website["DEVICE_IP"].":<input id='device_ip_upload' name='device_ip_upload' type='text' value='".$row["device_ip"]."'></input></p>";
			}
			else
			{
				echo "<div class='navbar-buttons mbr-section-btn'><button class='btn btn-sm btn-primary-outline display-4' title='".$website["VERIFY"]."' onclick='compileUSB();' style='padding:0.3em'><span class='mbri-success mbr-iconfont mbr-iconfont-btn' style='color: rgb(255, 148, 0);  margin-left:0.25em;'></span></button>&nbsp;<button class='btn btn-sm btn-primary-outline display-4' title='".$website["UPLOAD"]."' onclick='uploadUSB();' style='padding:0.3em'><span class='mbri-right mbr-iconfont mbr-iconfont-btn' style='color: rgb(255, 148, 0);  margin-left:0.25em'></span></button>&nbsp;";
				echo "<p class='btn' style='padding:0;font-size:12px'>".$website["PORT"].":</p>";
				echo "<a id='ports' valign=bottom style='font-size:12px;padding:0.3em'></a>";
				//echo "<select  class='btn btn-select resizeselect' id='ports' class='text-black dropdown-toggle display-4 icon-menu' onchange='portChange(this.value)' style='font-size:12px;padding:0.3em'></select>";
				echo "&nbsp;<button class='btn btn-sm btn-primary-outline display-4' title='".$website["REFRESH"]."' onclick='listPorts();' style='padding:0.3em'><span class='mbri-update mbr-iconfont mbr-iconfont-btn' style='color: rgb(255, 148, 0);  margin-left:0.25em;'></span></button>";
			}
			?>
			&nbsp;<br/><p class="btn" style="padding:0;font-size:12px"><?php echo $website["BOARD"];?>:</p>
			<!-- <select  class="btn btn-select resizeselect" id="flags" class="text-black dropdown-toggle display-4 icon-menu" onchange="flagsChange(this.value)" style="font-size:12px;padding:0.3em"></select> -->
			<a id='flags' valign=bottom style='font-size:12px;padding:0.3em'></a>
			</div>
			<div>
				<textarea name="code_textarea" id="code_textarea" rows="15" style="margin-top:0.5em; margin-bottom:0.5em; width:100%; height: 70%; font-family:monospace; font-size: 1em; padding: 0.2rem 0.4rem; background-color: #f8f9fa; line-height: 1em"></textarea>
			</div>
			</section>
			<section class="progress-bars1 cid-rl5597O6Km" id="progress-bar" style="display:none">
				<div class="container">
					<div class="progress_elements">
						<div class="progress1 pb-5">
							<div class="title-wrap">
								<div class="progressbar-title mbr-fonts-style display-7">
									<p id="compile_upload_msg"></p>
								</div>
								<div class="progressbar-title mbr-fonts-style display-7">
									<p><?php echo $website["ESTIMATED_PROGRESS"];?>:</p>
								</div>
								<div class="progress_value mbr-fonts-style display-7">
									<!-- <div class="progressbar-number" ></div> -->
									<span id="progress_number">0%</span>
								</div>
							</div>
							<progress id="progress" class="progress progress-primary" max="100" value="0">
							</progress>
							<!-- <div class="progressbar-title mbr-fonts-style display-7">
									<p>Meanwhile you wait, maybe you learn something new today!</p>
							</div>-->
							
							<!-- <div id="ytplayer"></div>
							<script>
							// Load the IFrame Player API code asynchronously.
							var tag = document.createElement('script');
							tag.src = "https://www.youtube.com/player_api";
							var firstScriptTag = document.getElementsByTagName('script')[0];
							firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
							// Replace the 'ytplayer' element with an <iframe> and
							// YouTube player after the API code downloads.
							var player;
							function onYouTubePlayerAPIReady() {
								player = new YT.Player('ytplayer', {height: '420',width: '560',events: {'onReady': onPlayerReady}});
								
							}
							
							function onPlayerReady(event) {
								//event.target.playVideo();
								//player.loadPlaylist({list:'PLjzuoBhdtaXNT8unZpegZM15qlQA69Cfu',listype: 'playlist'});
								var modal_progress = document.getElementById('modal_progress');
								modal_progress.style.display = "none";
							  }

							</script>-->
						</div>
					</div>
				</div>
			</section>
			<section>
			<div class="container"><p style="padding:0.3em"><b><?php echo $website["COMMAND_OUTPUT"];?>:</b></p><p style="padding:0.3em" id="command_output"></p></div>
			</section>
			<div class="container"><p style="padding:0.3em"><b><?php echo $website["CONSOLE_OUTPUT"];?>:</b></p><p style="padding:0.3em" id="console_output"></p></div>
			</section>
		  </div>
		</div>
		<div id="modal_timeout" class="modal" style="display:none;margin-left:3em;width:100%;height:25%">
		  <div class="modal-content">
			<span class="close" style="width:0.8em">&times;</span>
			<div class="container"><p style="padding:0.2em;" id="msg_timeout"><?php echo $website["TIMEOUT_ERROR"];?></p></p></div>
		  </div>
		</div>
		<?php
		}
		
		$query_keys="SELECT * FROM `lang_keys_".$row["lang_key"]."` WHERE 1";
		
		$result_keys = mysqli_query($con,$query_keys);
		while($row_keys=mysqli_fetch_assoc($result_keys))
		{
			if (!is_null($row_keys["value"]))
				$keys[$row_keys["key"]]=$row_keys["value"];
			elseif (!is_null($row_keys["value_temp"]))
				$keys[$row_keys["key"]]=$row_keys["value_temp"];
		}
		?>
		<script language="JavaScript">
		<?php 
			if (isset($_GET["lang"]))
				echo 'window.FacilinoLanguage ="'.$_GET["lang"].'";';
			else
				echo 'window.FacilinoLanguage ="'.$row["lang_key"].'";';
			echo 'window.FacilinoBlockFilter = "'.$row["filt_name"].'";';
			echo 'window.FacilinoVersion = "'.$row["version"].'";';
			echo 'window.FacilinoProcessor = "'.$row["proc_mcu"].'";';
			//echo 'console.log(window.FacilinoProcessor);';
			if (!isset($_GET["embbeded"]))
			{
				echo 'window.project_id = "'.$project_id.'";';
				echo 'window.share_key = "'.$row["share_key"].'";';
				echo 'window.username = "'.$_SESSION["username"].'";';
				echo 'window.key = "'.$_SESSION["key"].'";';
				echo 'var verify_msg="'.$website["VERIFY_MSG"].'";';
				echo 'var verify_upload_msg="'.$website["VERIFY_UPLOAD_MSG"].'";';
				?> localStorage.setItem('saved',Blockly.Xml.domToText(document.getElementById('startBlocks'))); <?php
			}
									
			echo 'window.langKeys=JSON.parse("'.addslashes(json_encode($keys)).'");';
			
			$query_keys_en="SELECT * FROM `lang_keys_en-GB` WHERE 1";
			$result_keys_en = mysqli_query($con,$query_keys_en);
			while($row_keys_en=mysqli_fetch_assoc($result_keys_en))
			{
				if (!is_null($row_keys_en["value"]))
					$keys_en[$row_keys_en["key"]]=$row_keys_en["value"];
			}
			echo 'window.langKeysEng=JSON.parse("'.addslashes(json_encode($keys_en)).'");';
			?>
			if (window.FacilinoVersion==='FacilinoJunior')
			{
				window.FacilinoAdvanced=false;
				window.FacilinoOTA=false;
			}
			else
			{
				window.FacilinoAdvanced=true;
				if (window.FacilinoVersion==='FacilinoOTA')
					window.FacilinoOTA=true;
				else
					window.FacilinoOTA=false;
			}
			
			<?php
			if (!isset($_GET["embbeded"]))
			{
				?>
				var modal_progress = document.getElementById('modal_progress');
				var span_progress = document.getElementsByClassName("close")[0];
	
				var progress_bar = document.getElementById('progress-bar');
				var progress = document.getElementById('progress');
				var progress_number = document.getElementById('progress_number');
				progress_number.innerHTML='0%';
				progress.setAttribute('value',0);
	
				span_progress.onclick = function() {
				  modal_progress.style.display = "none";
				  var console_output = document.getElementById('console_output');
				  console_output.innerHTML='';
				  var command_output = document.getElementById('command_output');
				  command_output.innerHTML='';
				}
				
				var updateCode=true;
				var justOnce=true;
				
				var modal_timeout = document.getElementById('modal_timeout');
				var span_timeout = document.getElementsByClassName("close")[1];
				
				span_timeout.onclick = function() {
				  modal_timeout.style.display = "none";
				  var msg_timeout = document.getElementById('msg_timeout');
				  msg_timeout.innerHTML='';
				}
				
				
				<?php
			}
			?>
			var ev = document.createEvent('Event');
			ev.initEvent('resize', true, true);
			
			//var file = "doc/"+window.window.FacilinoLanguage+"/index.html";
			//$.ajax({url:file,type:'HEAD',error: function(){file="doc/en-GB/index.html";},success: function(){}});
			//$(function(){$("#doc").load(file);});
			Blockly.Doc = [];
			<?php
			if (!isset($_GET["embbeded"]))
			{
				?>
				if (window.toolbox===undefined)
				{
					if (window.FacilinoBlockFilter==='DYOR')
					{
						window.toolbox = ['LANG_CATEGORY_PROCEDURES','LANG_CATEGORY_CONTROLS','LANG_SUBCATEGORY_CONTROL','LANG_CATEGORY_LOGIC','LANG_CATEGORY_MATH',,'LANG_CATEGORY_TEXT','LANG_CATEGORY_VARIABLES','LANG_CATEGORY_ADVANCED','LANG_SUBCATEGORY_ANALOG','LANG_SUBCATEGORY_DIGITAL','LANG_SUBCATEGORY_PWM','LANG_SUBCATEGORY_BUTTON','LANG_CATEGORY_COMMUNICATION','LANG_SUBCATEGORY_USB','LANG_SUBCATEGORY_BLUETOOTH','LANG_SUBCATEGORY_WIFI','LANG_SUBCATEGORY_BLE','LANG_CATEGORY_DISTANCE','LANG_SUBCATEGORY_MAX7219','LANG_CATEGORY_LIGHT','LANG_SUBCATEGORY_INFRARED','LANG_SUBCATEGORY_COLOR','LANG_SUBCATEGORY_LDR','LANG_CATEGORY_SOUND','LANG_SUBCATEGORY_BUZZER','LANG_SUBCATEGORY_MUSIC','LANG_SUBCATEGORY_MP3','LANG_SUBCATEGORY_MOTORS','LANG_SUBCATEGORY_ROBOT','LANG_SUBCATEGORY_ROBOTBASE','LANG_SUBCATEGORY_ROBOTACC','LANG_SUBCATERGORY_ESPUI','LANG_SUBCATERGORY_WS2812','LANG_SUBCATEGORY_OLED'];
					}
					else if (window.FacilinoBlockFilter==='bPED')
					{
						window.toolbox = ['LANG_CATEGORY_PROCEDURES','LANG_CATEGORY_CONTROLS','LANG_SUBCATEGORY_CONTROL','LANG_CATEGORY_LOGIC','LANG_CATEGORY_MATH','LANG_CATEGORY_TEXT','LANG_CATEGORY_VARIABLES','LANG_CATEGORY_ADVANCED','LANG_SUBCATEGORY_DIGITAL','LANG_CATEGORY_COMMUNICATION','LANG_SUBCATEGORY_USB','LANG_SUBCATEGORY_BLUETOOTH','LANG_SUBCATEGORY_WIFI','LANG_SUBCATEGORY_BLE','LANG_CATEGORY_DISTANCE','LANG_CATEGORY_SOUND','LANG_SUBCATEGORY_BUZZER','LANG_SUBCATEGORY_MUSIC','LANG_SUBCATEGORY_MP3','LANG_SUBCATEGORY_MOTORS','LANG_SUBCATEGORY_WALK','LANG_SUBCATERGORY_ESPUI','LANG_SUBCATERGORY_WS2812','LANG_SUBCATEGORY_OLED'];
					}
					else if (window.FacilinoBlockFilter==='meArm')
					{
						window.toolbox = ['LANG_CATEGORY_PROCEDURES','LANG_CATEGORY_CONTROLS','LANG_SUBCATEGORY_CONTROL','LANG_CATEGORY_LOGIC','LANG_CATEGORY_MATH','LANG_CATEGORY_TEXT','LANG_CATEGORY_VARIABLES','LANG_SUBCATEGORY_ARRAYS','LANG_CATEGORY_ADVANCED','LANG_SUBCATEGORY_DIGITAL','LANG_CATEGORY_COMMUNICATION','LANG_SUBCATEGORY_USB','LANG_SUBCATEGORY_BLUETOOTH','LANG_SUBCATEGORY_WIFI','LANG_SUBCATEGORY_BLE','LANG_SUBCATEGORY_MOTORS','LANG_SUBCATEGORY_ARM','LANG_SUBCATERGORY_ESPUI'];
					}
					else if (window.FacilinoBlockFilter==='Multisensor')
					{
						window.toolbox = ['LANG_CATEGORY_PROCEDURES','LANG_CATEGORY_CONTROLS','LANG_SUBCATEGORY_CONTROL','LANG_CATEGORY_LOGIC','LANG_CATEGORY_MATH','LANG_CATEGORY_TEXT','LANG_CATEGORY_VARIABLES','LANG_CATEGORY_ADVANCED','LANG_SUBCATEGORY_ANALOG','LANG_SUBCATEGORY_DIGITAL','LANG_SUBCATEGORY_PWM','LANG_SUBCATEGORY_DIGITAL','LANG_SUBCATEGORY_PWM','LANG_SUBCATEGORY_BUTTON','LANG_CATEGORY_COMMUNICATION','LANG_SUBCATEGORY_USB','LANG_SUBCATEGORY_BLUETOOTH','LANG_SUBCATEGORY_WIFI','LANG_SUBCATEGORY_IOT','LANG_SUBCATEGORY_IR','LANG_SUBCATEGORY_BLE','LANG_SUBCATEGORY_LCD','LANG_CATEGORY_LIGHT','LANG_SUBCATEGORY_COLOR','LANG_SUBCATEGORY_LDR','LANG_SUBCATEGORY_DIMMER','LANG_CATEGORY_SOUND','LANG_SUBCATEGORY_BUZZER','LANG_SUBCATEGORY_MP3','LANG_SUBCATEGORY_MOTORS','LANG_SUBCATEGORY_TEMPERATURE','LANG_SUBCATEGORY_HUMIDITY','LANG_SUBCATEGORY_RAIN','LANG_SUBCATEGORY_GAS','LANG_SUBCATEGORY_MISC','LANG_SUBCATERGORY_ESPUI'];
					}
					else if (window.FacilinoBlockFilter==='HomeAutomation')
					{
						window.toolbox = ['LANG_CATEGORY_PROCEDURES','LANG_CATEGORY_CONTROLS','LANG_SUBCATEGORY_CONTROL','LANG_CATEGORY_LOGIC','LANG_CATEGORY_MATH','LANG_CATEGORY_TEXT','LANG_CATEGORY_VARIABLES','LANG_CATEGORY_ADVANCED','LANG_SUBCATEGORY_ANALOG','LANG_SUBCATEGORY_DIGITAL','LANG_SUBCATEGORY_PWM','LANG_SUBCATEGORY_BUTTON','LANG_SUBCATEGORY_USB','LANG_SUBCATEGORY_BLUETOOTH','LANG_SUBCATEGORY_WIFI','LANG_SUBCATEGORY_IOT','LANG_SUBCATEGORY_IR','LANG_SUBCATEGORY_BLE','LANG_SUBCATEGORY_LCD','LANG_CATEGORY_LIGHT','LANG_SUBCATEGORY_COLOR','LANG_SUBCATEGORY_LDR','LANG_SUBCATEGORY_DIMMER','LANG_CATEGORY_SOUND','LANG_SUBCATEGORY_BUZZER','LANG_SUBCATEGORY_MP3','LANG_SUBCATEGORY_MOTORS','LANG_SUBCATEGORY_TEMPERATURE','LANG_SUBCATEGORY_HUMIDITY','LANG_SUBCATEGORY_RAIN','LANG_SUBCATEGORY_GAS','LANG_SUBCATEGORY_MISC','LANG_SUBCATERGORY_HTML','LANG_SUBCATERGORY_ESPUI','LANG_SUBCATERGORY_WS2812'];
					}
					else if (window.FacilinoBlockFilter==='LED_RACE')
					{
						window.toolbox = ['LANG_CATEGORY_PROCEDURES','LANG_CATEGORY_CONTROLS','LANG_SUBCATEGORY_CONTROL','LANG_SUBCATEGORY_INTERRUPTS','LANG_CATEGORY_LOGIC','LANG_CATEGORY_MATH','LANG_CATEGORY_TEXT','LANG_CATEGORY_VARIABLES','LANG_CATEGORY_ADVANCED','LANG_SUBCATEGORY_DIGITAL','LANG_SUBCATEGORY_BUTTON','LANG_CATEGORY_COMMUNICATION','LANG_SUBCATEGORY_USB','LANG_SUBCATEGORY_WIFI','LANG_SUBCATEGORY_BLE','LANG_SUBCATERGORY_WS2812'];
					}
					else
					{
						window.toolbox = ['LANG_CATEGORY_PROCEDURES','LANG_CATEGORY_CONTROLS','LANG_SUBCATEGORY_CONTROL','LANG_SUBCATEGORY_PROGRAMMING','LANG_SUBCATEGORY_INTERRUPTS','LANG_SUBCATEGORY_STATEMACHINE','LANG_CATEGORY_LOGIC','LANG_SUBCATEGORY_BITWISE','LANG_CATEGORY_MATH','LANG_CATEGORY_CURVE','LANG_CATEGORY_TEXT','LANG_CATEGORY_VARIABLES','LANG_SUBCATEGORY_ARRAYS','LANG_SUBCATEGORY_OBJECTS','LANG_SUBCATEGORY_EEPROM','LANG_CATEGORY_ADVANCED','LANG_SUBCATEGORY_ANALOG','LANG_SUBCATEGORY_DIGITAL','LANG_SUBCATEGORY_PWM','LANG_SUBCATEGORY_BUTTON','LANG_SUBCATEGORY_BUS','LANG_CATEGORY_COMMUNICATION','LANG_SUBCATEGORY_USB','LANG_SUBCATEGORY_BLUETOOTH','LANG_SUBCATEGORY_WIFI','LANG_SUBCATEGORY_IOT','LANG_SUBCATEGORY_IR','LANG_SUBCATEGORY_BLE','LANG_CATEGORY_DISTANCE','LANG_SUBCATEGORY_LCD','LANG_SUBCATEGORY_MAX7219','LANG_CATEGORY_LIGHT','LANG_SUBCATEGORY_INFRARED','LANG_SUBCATEGORY_COLOR','LANG_SUBCATEGORY_LDR','LANG_SUBCATEGORY_DIMMER','LANG_CATEGORY_SOUND','LANG_SUBCATEGORY_BUZZER','LANG_SUBCATEGORY_MIC','LANG_SUBCATEGORY_MUSIC','LANG_SUBCATEGORY_MP3','LANG_SUBCATEGORY_MOTORS','LANG_SUBCATEGORY_ROBOT','LANG_SUBCATEGORY_ROBOTBASE','LANG_SUBCATEGORY_ROBOTACC','LANG_SUBCATEGORY_WALK','LANG_SUBCATEGORY_ARM','LANG_SUBCATEGORY_SYSTEM_FILTER','LANG_SUBCATEGORY_SYSTEM_CONTROL','LANG_SUBCATEGORY_TEMPERATURE','LANG_SUBCATEGORY_HUMIDITY','LANG_SUBCATEGORY_RAIN','LANG_SUBCATEGORY_GAS','LANG_SUBCATEGORY_MISC','LANG_SUBCATERGORY_HTML','LANG_SUBCATERGORY_ESPUI','LANG_SUBCATERGORY_WS2812','LANG_SUBCATEGORY_OLED','LANG_SUBCATEGORY_TFT'];
					}
				}
				//window.toolbox = ['LANG_CATEGORY_PROCEDURES','LANG_CATEGORY_CONTROLS','LANG_SUBCATEGORY_CONTROL','LANG_SUBCATEGORY_PROGRAMMING','LANG_SUBCATEGORY_INTERRUPTS','LANG_SUBCATEGORY_STATEMACHINE'];
				window.toolboxNames = getToolboxNames(window.toolbox);
				<?php
			}
			
			require_once('facilino_loads.php');
			?>
			window.dispatchEvent(new Event('resize'));
				
			var el = document.getElementById('blockly');

			<?php
			
			if (!isset($_GET["embbeded"]))
			{
				?>
					Blockly.inject(el, {toolbox: Blockly.createToolbox(window.toolboxNames), zoom: {controls: true, wheel: true, startScale: 0.7, maxScale: 2, minScale: 0.3, scaleSpeed: 1.1}});
					$('.blocklySvg, #blockly').height('100%');
					$('.blocklySvg').width('100%');
					disableBtn("undo");
					disableBtn("redo");
					Blockly.getMainWorkspace().clear();
					Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),Blockly.getMainWorkspace());
					
					var History = {};
					History.stack = [];
					History.position=0;
					History.limit=200;
					History.updating=false;
					History.stack[0]=Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
					History.initialState =History.stack[0];
					//console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace())));

					//if (localStorage.getItem("saved")=='')
					//  Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),Blockly.getMainWorkspace());
					$('.blocklySvg, #blockly').height('100%');
					$('.blocklySvg').width('100%');
			
				<?php
			}
			else
			{
				?>
					var mainWorkspace =Blockly.inject(el,{zoom: 1,readOnly:true, collapse: false});
					Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),Blockly.getMainWorkspace());
					var bbox = mainWorkspace.svgBlockCanvas_.getBBox();
					el.style.height = (bbox.height+25)+ 'px';
					el.style.width = (bbox.width+25) + 'px';
					window.dispatchEvent(new Event('resize'));
				<?php
			}
			
			
			
			if (!isset($_GET["embbeded"]))
			{
				?>
				Blockly.getMainWorkspace().addChangeListener(function (event) {
					if (event.type===Blockly.Events.DELETE)
					{
						Facilino.removedBlocks(event.ids);
					}
					if (updateCode)
					{
					  $('#code').html('<code class="c++" style="display:inline-block; width:100%;height:100%"><pre id="pre" style="height:101%">'
					  + escapeCode(Blockly.Arduino.workspaceToCode(Blockly.getMainWorkspace()))
					  + '</pre></code>');
					  //var codeSnipet='void sum(int a,int b){\nint c;\nreturn a+b;\n}\n';
					}
					else
					{
					}
					  // Highlight
					$("#pre").each(function (i, e) {
					  hljs.highlightBlock(e);
					});
					//Save History
					var current = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
					if ((current !== History.stack[History.position])&&(current!==History.initialState))
						History.updating=true;
					//console.log(History.updating);
					if (History.updating)
					{
						while (History.stack.length > History.limit) {
							History.stack.shift();
						}
						History.position = Math.min(History.position,History.stack.length - 1);
						History.stack = History.stack.slice(0, History.position + 1);
						History.stack.push(current);
						History.position++;
						if (History.position > 0)
							enableBtn("undo");
						else
							disableBtn("undo");
						if (History.position<(History.stack.length-1))
							enableBtn("redo");
						else
							disableBtn("redo");
						//console.log('Saving position '+History.position);
						History.updating=false;
						//console.log(History.updating);
					}
					if (justOnce)
					{
						justOnce=false;
						window.dispatchEvent(new Event('resize'));
					}
				});
						
	function doAutoIndent(value, indent) {
	indent || (indent = "\t");
	
	var lastValue='';
	var selectionStart=0,selectionEnd=value.length;
	var caret =selectionStart;
	var change = value.length - lastValue.length;
	
	added = value.substr(caret - change, change) || '',
	removed = lastValue.substr(caret, -change) || '';
	
	function setValue(text) {
		ta.value = text;
		return value;
	}
	
	function str_repeat(str, n) {
		var out = '';
		while (n--) out += str;
		return out;
	}
	
	function isIndented(line) {
		var regex = new RegExp('^(' + indent + '+)', 'g'),
			match = line.match(regex);
		return match && match[0].length / indent.length || 0;
	}
	
	function addIndent(before, after, num) {
		// num = num ? ~~num : 1;
		if ( !num ) return;
		lastValue = setValue(before + str_repeat(indent, num) + after);
		selectionStart = selectionEnd = before.length + indent.length * num;
	}
	
	function removeIndent(before, after) {
		var remove = before.slice(before.length - 1 - indent.length, before.length - 1);
		if ( remove != indent ) {
			return;
		}
		
		lastValue = setValue(before.slice(0, -1-indent.length) + '}' + after);
		selectionStart = selectionEnd = before.length - indent.length;
	}
	
	function getPrevLine(before) {
		var lines = value.split(/\n/g),
			line = before.trimRight().split(/\n/g).length - 1;
		return lines[line] || '';
	}
	
	before = value.substr(0, caret),
	after = value.substr(caret),
	lastChar = before.trim().slice(-1),
	nextChar = after.substr(0, 1);
			
	// ENTER
	if ( code == 13 ) {
		// Immediately after a {
		if ( lastChar == '{' ) {
			var prevLine = getPrevLine(before),
				indents = isIndented(prevLine),
				more = nextChar == '}' ? 0 : 1;
			return addIndent(before, after, indents + more);
		}
		
		// After an indented line
		var prevLine = getPrevLine(before),
			indents = isIndented(prevLine),
			more = nextChar == '}' ? -1 : 0;
		if ( indents + more > 0 ) {
			addIndent(before, after, indents + more);
		}
	}
	else if ( added == '}' ) {
		removeIndent(before, after);
	}
	console.log(value);
}

function escapeCode(code) {
		var str = code;
		str = str.replace(/</g, "&lt;");
		str = str.replace(/>/g, "&gt;");
		return str;
	}

function resetWorkspace() {
		History.stack = [];
		History.initialState ='';
		History.position=0;
		Blockly.mainWorkspace.clear();
		Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),Blockly.getMainWorkspace());
	}
	
function saveAll(newLoc,action)
{
	var current = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
	var text = Blockly.Arduino.workspaceToCode(Blockly.getMainWorkspace());
	localStorage.setItem("saved",current);
	const form = document.createElement('form');
	form.method = "post";
	form.action = "facilino.php?action="+action+"&id="+window.project_id+'&goto='+newLoc;
	const hiddenBlockly = document.createElement('input');
	  hiddenBlockly.type = 'hidden';
	  hiddenBlockly.name = 'facilino_code';
	  var i= current.indexOf('>');
	  current=current.substr(current.indexOf('>')+1);
	  current=current.substr(0,current.lastIndexOf('<'));
	  current=current.replace(/'/g,"&apos;");
	  hiddenBlockly.value = escapeCode(current);
	  form.appendChild(hiddenBlockly);
	const hiddenArduino = document.createElement('input');
	  hiddenArduino.type = 'hidden';
	  hiddenArduino.name = 'arduino_code';
	  text=text.replace(/'/g,"&apos;");
	  hiddenArduino.value = text;
	  form.appendChild(hiddenArduino);
	const hiddenProj = document.createElement('input');
	  hiddenProj.type = 'hidden';
	  hiddenProj.name = 'project_id';
	  hiddenProj.value = window.project_id;
	  form.appendChild(hiddenProj);
	document.body.appendChild(form);
	form.submit();
	//console.log(escapeCode(current));
}

function saveProject(action)
{
	var current = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
	var text = Blockly.Arduino.workspaceToCode(Blockly.getMainWorkspace());
	localStorage.setItem("saved",current);
	const form = document.createElement('form');
	form.method = "post";
	form.action = "facilino.php?action="+action+"&id="+window.project_id+"&username="+window.username+"&key="+window.key+"&alt_header";
	const hiddenBlockly = document.createElement('input');
	  hiddenBlockly.type = 'hidden';
	  hiddenBlockly.name = 'facilino_code';
	  var i= current.indexOf('>');
	  current=current.substr(current.indexOf('>')+1);
	  current=current.substr(0,current.lastIndexOf('<'));
	  current=current.replace(/'/g,"&apos;");
	  hiddenBlockly.value = escapeCode(current);
	  form.appendChild(hiddenBlockly);
	const hiddenArduino = document.createElement('input');
	  hiddenArduino.type = 'hidden';
	  hiddenArduino.name = 'arduino_code';
	  text=text.replace(/'/g,"&apos;");
	  hiddenArduino.value = text;
	  form.appendChild(hiddenArduino);
	const hiddenProj = document.createElement('input');
	  hiddenProj.type = 'hidden';
	  hiddenProj.name = 'project_id';
	  hiddenProj.value = window.project_id;
	  form.appendChild(hiddenProj);
	const hiddenCode = document.createElement('input');
	  hiddenCode.type = 'hidden';
	  hiddenCode.name = 'project_code';
	  hiddenCode.value = current;
	 form.appendChild(hiddenCode);
	document.body.appendChild(form);
	form.submit();
}
	
function saveBeforeExit(action)
{
	saveAll('dashboard.php',action);
}

function saveBeforeExitTutorial()
{
	saveAll('FacilinoTutorial.php','save');
}

function Exit()
{
	window.location="dashboard.php";
}

function ExitTutorial()
{
	window.localtion="FacilinoTutorial.php";
}

function docHelp()
{
	window.location.replace("doc_help.php");
}

function fileSelected(input){
	if (input.length>0)
	{
		var file = input[0];
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function(e){
			var xmlData = $(reader.result);
			Blockly.mainWorkspace.clear();
			Blockly.Xml.domToWorkspace(xmlData[0],Blockly.getMainWorkspace());
		};
	}
}

function imageSelected(input){
	if (input.length>0)
	{
		var file = input[0];
		var reader = new FileReader();
		reader.addEventListener("load", function () {
			var img = new Image();
			img.onload = function(){
			  var height = img.height;
			  var width = img.width;
			  var canvas = document.getElementById('canvas');
				var context = canvas.getContext('2d');
				context.drawImage(img,0,0);
				var imageData = context.getImageData(0,0,width,height);
				var data = imageData.data;
				var row = [];
				var data1 =[];
				var j=0;
				var data_str='';
				for (var i=0;i<data.length;i+=32)
				{
					row[0] = 0.34*data[i]+0.5*data[i+1]+0.16*data[i+2];
					row[1] = 0.34*data[i+4]+0.5*data[i+5]+0.16*data[i+6];
					row[2] = 0.34*data[i+8]+0.5*data[i+9]+0.16*data[i+10];
					row[3] = 0.34*data[i+12]+0.5*data[i+13]+0.16*data[i+14];
					row[4] = 0.34*data[i+16]+0.5*data[i+17]+0.16*data[i+18];
					row[5] = 0.34*data[i+20]+0.5*data[i+21]+0.16*data[i+22];
					row[6] = 0.34*data[i+24]+0.5*data[i+25]+0.16*data[i+26];
					row[7] = 0.34*data[i+28]+0.5*data[i+29]+0.16*data[i+30];
					data1[j]=((row[0]%2)<1? 128: 0) + ((row[1]%2)<1? 64:0) + ((row[2]%2)<1? 32:0) + ((row[3]%2)<1? 16:0) + ((row[4]%2)<1? 8:0) + ((row[5]%2)<1? 4:0) + ((row[6]%2)<1? 2:0) + ((row[7]%2)<1? 1:0);
					j++;
					if (j==8)
					{
						data_str+=  data1[0] + ',' + data1[1] + ','+ data1[2] + ','+ data1[3] + ','+ data1[4] + ','+ data1[5] + ','+ data1[6] + ','+ data1[7]+',';
						j=0;
					}
				}
				//console.log(data_str);
				data_str=data_str.substring(0,data_str.length-1);
				Blockly.currentInterestingBlock.data = JSON.stringify({name: file.name.substring(0,file.name.length-4), width: img.width, height: img.height, data: data_str});
			}

			img.src = reader.result;


		  }, false);

		  if (file) {
			reader.readAsDataURL(file);
		  }
	}
}

function toogleCode() {
	if ($('#code').css('display') == 'none') {
		// Show
		$('#code').show();
		$('#blockly').width('66%');
		$('#code').height('100%');
		$('#copy_clipboard').show();
	} else {
		// Hide
		$('#code').hide();
		$('#copy_clipboard').hide();
		$('#blockly').width('100%');
	}
	// Resize workspace
	//Blockly.fireUiEvent(window,"resize");
	window.dispatchEvent(ev);
	//$('.blocklySvg, #blockly').height('100%');
	//$('.blocklySvg').width('100%');
}


function butSave()
{
	var link = document.createElement('a');
	var text = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
	link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
	link.download = 'filename.bly';
	document.body.appendChild(link);
	link.click();
}

function butExport()
{
	var link = document.createElement('a');
	var text = Blockly.Arduino.workspaceToCode(Blockly.getMainWorkspace());
	link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
	link.download = 'filename.ino';
	document.body.appendChild(link);
	link.click();
}

function butUndo()
{
	//console.log('Undo');
	if (History.position>0){
		var item =  History.stack[--History.position];
		if (History.position > 0)
			enableBtn("undo");
		else
			disableBtn("undo");
		if (History.position<(History.stack.length-1))
			enableBtn("redo");
		else
			disableBtn("redo");
		Blockly.getMainWorkspace().clear();
		Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(item),Blockly.getMainWorkspace());
		//console.log('Undo: '+History.position);
	}
}

function butRedo()
{
	if (History.position<(History.stack.length-1))
	{
		var item = History.stack[++History.position];
		if (History.position > 0)
			enableBtn("undo");
		else
			disableBtn("undo");
		if (History.position<(History.stack.length-1))
			enableBtn("redo");
		else
			disableBtn("redo");
		Blockly.getMainWorkspace().clear();
		Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(item),Blockly.getMainWorkspace());
		//console.log('Redo: '+History.position);
	}
}

function disableBtn(btn)
{
	document.getElementById(btn).classList.add('btn-info-outline');
	document.getElementById(btn).classList.remove('btn-primary-outline');
	document.getElementById(btn).disabled = true;
}

function enableBtn(btn)
{
	document.getElementById(btn).classList.add('btn-primary-outline');
	document.getElementById(btn).classList.remove('btn-info-outline');
	document.getElementById(btn).disabled = false;
}

function copyToClipboard()
{
	var r = document.createRange();
	r.selectNode(document.getElementById("code"));
	window.getSelection().addRange(r);
	document.execCommand("copy");
	r.selectNode(document.body);
	window.getSelection().addRange(r);
	clearSelection();
}

function getToolboxNames(keys)
{
	var toolboxNames = [];
	keys.forEach(function (key){toolboxNames.push(window.langKeys[key]);});
	return toolboxNames;
}

function showHideToolbox()
{
	var cat=document.getElementById('packages');
	if (cat.style.display==='none')
		cat.style.display='initial';
	else
		cat.style.display='none';
}

function showToolbox()
{
	var menu=document.getElementById('toolbox_menu');
	if (menu.style.display==='none')
	{
		menu.style.display='initial';
		$("#toolboxP").attr("class","btn btn-sm btn-primary");
	}
	else
	{
		menu.style.display='none';
		$("#toolboxP").attr("class","btn btn-sm btn-primary-outline");
	}
}

function showHideCategory(id,key)
{
	var found = window.toolbox.find(function(element) {return (element===key);});
	if (found)
	{
		window.toolbox = window.toolbox.filter(function(item) { return item !== key});
		document.getElementById(id).style.textDecoration="line-through";
		
	}
	else
	{
		window.toolbox.push(key);
		document.getElementById(id).style.textDecoration="none";
	}
	window.toolboxNames=getToolboxNames(window.toolbox);
	Blockly.getMainWorkspace().updateToolbox(Blockly.updateToolboxXml(toolboxNames));
	$.ajax({
	type: "POST",
	url: "project_meta.php",
	data: {id: window.project_id, share_key: window.share_key, toolbox: JSON.stringify(window.toolbox)},
	success: function(data) {
		console.log(data);
	},
	error: function(data){
		console.log(data);
	}
	});
}

function changeCategory(cat)
{
	console.log(cat);
	//localStorage.setItem('language',cat);
	//window.location.reload();
}

function clearSelection() {
	if ( document.selection ) {
		document.selection.empty();
	} else if ( window.getSelection ) {
		window.getSelection().removeAllRanges();
	}
}

function removeOptions(selectElement) {
	
   //var i, L = selectElement.options.length - 1;
   //for(i = L; i >= 0; i--) {
   //	  selectElement.remove(i);
   //}
   while (selectElement.firstChild) {
     selectElement.removeChild(selectElement.lastChild);
   }
}

async function listPorts()
{
	select = document.getElementById('ports');
	var serverip = 'localhost';
	var url='http://';
	url=url.concat(serverip,':4000/list_ports');
	try{
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(),5000);
		const response = await fetch(url, {method: 'POST',headers: {'Content-Type': 'application/json'},body: {},timeout: 5000,signal:controller.signal});
		//const response = await fetch(url, {method: 'POST',headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'text/html; charset=ISO-8859-1'},body: {},timeout: 5000,signal:controller.signal});
		clearTimeout(id);
		const r = await response.json();
		//const r = await response.text();
		var option;
		removeOptions(select);
		//result = eval(r);
		result = r['ports'];
		var prev_selected_port=window.selected_port;
		var atLeastOnePortSelected=false;
		if (result.length>0)
		{
			window.selected_port=result[0];
			result.forEach(function (value,idx){
				var lblEl=document.createElement('label');
				lblEl.innerHTML=value;
				lblEl.htmlFor='port'+idx;
				var inpEl=document.createElement('input');
				inpEl.type='radio';
				inpEl.id='port'+idx;
				inpEl.name='ports';
				inpEl.value=value;
				inpEl.setAttribute("onclick", "portChange(this.value)");
				if (prev_selected_port===value)
				{
					inpEl.checked=true;
					atLeastOnePortSelected=true;
					window.selected_port=prev_selected_port;
				}
				else if (prev_selected_port===undefined)
				{
					if (idx==0)
					{
						inpEl.checked=true;
						atLeastOnePortSelected=true;
						window.selected_port=value;
					}
				}
				select.appendChild(inpEl);
				select.appendChild(lblEl);
			});
		}
		if (atLeastOnePortSelected==false)
		{
			p0 = document.getElementById('port0');
			if (p0!==undefined)
			{
				p0.setAttribute('checked',true);
				window.selected_port=p0.value;
			}
		}
		listCompilationFlags();
		window.selected_compilation_flags=compilation_flags[0].compilation_flags;
		window.OTAServerVersion='1.1.0';
		modal_progress.style.display = "block";
	}
	catch(error)
	{
		try{
			const XHR = new XMLHttpRequest();
			XHR.overrideMimeType("application/json");  
			XHR.open('GET', url,true);
			XHR.timeout = 2000;
			XHR.ontimeout = (e) => {
			  // XMLHttpRequest timed out. Do something here.
			  console.log('Timeout');
			  modal_timeout.style.display = "block";
			};
			XHR.onload = () => {
				if (XHR.status==200) {
					var option;
					removeOptions(select);
					try {
						r=JSON.parse(XHR.responseText);
						result = r['ports'];
					} catch (e) {
						result = eval(XHR.responseText);
					}
					var prev_selected_port=window.selected_port;
					window.selected_port=result[0];
					result.forEach(function (value,idx){
						var lblEl=document.createElement('label');
						lblEl.innerHTML=value;
						lblEl.htmlFor='port'+idx;
						var inpEl=document.createElement('input');
						inpEl.type='radio';
						inpEl.id='port'+idx;
						inpEl.name='ports';
						inpEl.value=value;
						inpEl.setAttribute("onclick", "portChange(this.value)");
						if (prev_selected_port===value)
						{
							inpEl.checked=true;
							window.selected_port=prev_selected_port;
						}
						select.appendChild(inpEl);
						select.appendChild(lblEl);
					});
					listCompilationFlags();
					window.selected_compilation_flags=compilation_flags[0].compilation_flags;
					window.OTAServerVersion='1.0.0';
					modal_progress.style.display = "block";
				}

			}
			XHR.send();	
		}
		catch(error)
		{
			modal_timeout.style.display = "block";
			console.log(error);
		}
	}
}

function listIPPorts()
{
	
}

function listCompilationFlags()
{
	select = document.getElementById('flags');
	removeOptions(select);
	var prev_selected_flag=window.selected_compilation_flags;
	if (compilation_flags.length>0)
	{
		var atLeastOneFlagSelected=false;
		window.selected_compilation_flags=compilation_flags[0].compilation_flags;
		compilation_flags.forEach(function (value,idx){
			//option = document.createElement('option');
			//option.value = value.compilation_flags;
			//option.textContent = value.variant;
			//select.appendChild(option);
			var lblEl=document.createElement('label');
			lblEl.innerHTML=value.variant+'&nbsp;&nbsp;';
			lblEl.htmlFor='flag'+idx;
			var inpEl=document.createElement('input');
			inpEl.type='radio';
			inpEl.id='flag'+idx;
			inpEl.name='flags';
			inpEl.value=value.compilation_flags;
			inpEl.setAttribute("onclick", "flagsChange(this.value)");
			if (prev_selected_flag===value.compilation_flags)
			{
				inpEl.checked=true;
				atLeastOneFlagSelected=true;
				window.selected_compilation_flags=prev_selected_flag;
			}
			if (prev_selected_flag===undefined)
			{
				if (idx==0)
				{
					inpEl.checked=true;
					atLeastOneFlagSelected=true;
					window.selected_compilation_flags=value;
				}
			}
			select.appendChild(inpEl);
			select.appendChild(lblEl);
		});
		if (atLeastOneFlagSelected==false)
		{
			f0=document.getElementById('flag0');
			if (f0!==undefined)
			{
				f0.setAttribute('checked',true);
				window.selected_compilation_flags=f0.value;
			}
		}
	}
	else
	{
		window.selected_compilation_flags='arduino:avr:uno';
	}
}

function portChange(a)
{
	window.selected_port=a;
}

function flagsChange(a)
{
	window.selected_compilation_flags=a;
}

function compile_upload()
{
	var modal_progress = document.getElementById('modal_progress');
	var code = Blockly.Arduino.workspaceToCode(Blockly.getMainWorkspace());
	var code_textarea = document.getElementById('code_textarea');
	code_textarea.value=code;
	
	if (window.FacilinoOTA)
		listIPPorts();
	else
		listPorts();
	
}

function compile()
{
	var msg = document.getElementById('compile_upload_msg');
	msg.innerHTML=verify_msg;
	if (window.FacilinoOTA)
		compileOTA();
	else
		compileUSB();
}

function upload()
{
	compile();
	var msg = document.getElementById('compile_upload_msg');
	msg.innerHTML=verify_upload_msg;
	if (window.FacilinoOTA)
		uploadOTA();
	else
		uploadUSB();
}

function compileOTA()
{
	//var code = Blockly.Arduino.workspaceToCode(Blockly.getMainWorkspace());
	var code_textarea = document.getElementById('code_textarea');
	var code = code_textarea.value;
	
	var user = window.username;
	
	//if (ValidateIPaddress(hostip))
		var data={action: 'compile', code: code, user: window.username, compilation_flags: window.selected_compilation_flags};
	//else
	//	var data={action: 'compile', code: code, hostip: hostip+'.local', processor: processor};
	
	//var modal_progress = document.getElementById('modal_progress');
	//modal_progress.style.display = "block";
	uploadOTAData(data,false);
	//console.log(data);
}

function compileUSB()
{
	//var code = Blockly.Arduino.workspaceToCode(Blockly.getMainWorkspace());
	var code_textarea = document.getElementById('code_textarea');
	var code = code_textarea.value;
	
	var user = window.username;
	
	//if (ValidateIPaddress(hostip))
		var data={action: 'compile', code: code, user: window.username, compilation_flags: window.selected_compilation_flags};
	//else
	//	var data={action: 'compile', code: code, hostip: hostip+'.local', processor: processor};
	
	//var modal_progress = document.getElementById('modal_progress');
	//modal_progress.style.display = "block";
	uploadUSBData(data);
	//console.log(data);
}


function uploadOTA()
{
	var code_textarea = document.getElementById('code_textarea');
	var code = code_textarea.value;
	
	var user = window.username;
	
	var deviceip=document.getElementById('device_ip_upload').value;
	
	//if (ValidateIPaddress(hostip))
	var data={action: 'upload', code: code, user: window.username, deviceip: deviceip, compilation_flags: window.selected_compilation_flags};
	//else
	//	var data={action: 'compile', code: code, hostip: hostip+'.local', processor: processor};
	
	//var modal_progress = document.getElementById('modal_progress');
	//modal_progress.style.display = "block";
	uploadOTAData(data,true);
}

function uploadUSB()
{
	//var code = Blockly.Arduino.workspaceToCode(Blockly.getMainWorkspace());
	var code_textarea = document.getElementById('code_textarea');
	var code = code_textarea.value;
	
	var user = window.username;
	
	//if (ValidateIPaddress(hostip))
		var data={action: 'upload', code: code, user: window.username, port: window.selected_port, compilation_flags: window.selected_compilation_flags};
	//else
	//	var data={action: 'compile', code: code, hostip: hostip+'.local', processor: processor};
	
	//var modal_progress = document.getElementById('modal_progress');
	//modal_progress.style.display = "block";
	uploadUSBData(data);
	//console.log(data);
}

async function uploadUSBData(data)
{
	var console_output = document.getElementById('console_output');
	if (window.OTAServerVersion==='1.1.0')
	{
		var serverip = 'localhost';
		var url='http://';
		url=url.concat(serverip,':4000/usb_upload');
		try{   
		console_output.innerHTML='';
		command_output.innerHTML='';
		//var progress_bar = document.getElementById('progress-bar');
		//progress_bar.style.display = "block";
		const response = await fetch(url, {method: 'POST',headers: {'Content-Type': 'application/json; charset=ISO-8859-1'},body: JSON.stringify(data)});
		const r = await response.json();
		console_output.innerHTML=r['result'];
		command_output.innerHTML=r['command'];
		}
		catch(error)
		{
			console.log(error);
		}
	}
	else if (window.OTAServerVersion==='1.0.0')
	{
		const XHR = new XMLHttpRequest(),FD  = new FormData();
		for( name in data ) {
			FD.append( name, data[ name ] );
		}
		var progress_bar = document.getElementById('progress-bar');
		progress_bar.style.display = "block";
		//var progress_lbl=$("progress_lbl");
		// Define what happens on successful data submission
		XHR.addEventListener( 'load', function( event ) {
					//console.log(XHR.readyState);
				  if (XHR.readyState === XHR.DONE) {
						if (XHR.status === 200) {
							if (parseInt(localStorage.getItem('upload_progress') || 100 )<1)
								localStorage.setItem('upload_size',100);
							else
								localStorage.setItem('upload_size',parseInt(localStorage.getItem('upload_progress') || 100));
							//modal_progress.style.display = "none";
							progress_bar.style.display = "none";
							//console_output.innerHTML=XHR.response;
						}
					}
			  } );
		  XHR.addEventListener('loadstart',function(event){
			if (event.lengthComputable)
				localStorage.setItem('upload_size',event.total);
			localStorage.setItem('upload_progress',0);
			progress_number.innerHTML='0%';
			progress.setAttribute('value',0);
			console_output.innerHTML='';
			//player.loadPlaylist({list:'PLjzuoBhdtaXNT8unZpegZM15qlQA69Cfu',listype: 'playlist'});
			//player.setShuffle({shufflePlaylist:true});
		  }
		  );
	  
		  XHR.addEventListener('loadend',function(event){
			localStorage.setItem('upload_size',parseInt(localStorage.getItem('upload_progress') || 100 ));
			//player.stopVideo();
			}
		  );
	  
		  XHR.addEventListener('progress',function (event){
			console_output.innerHTML=XHR.response;
			if (event.lengthComputable)
			{
				var percentComplete = event.loaded / event.total * 100;
				console.log(percentComplete);
				progress_number.innerHTML=percentComplete+'%';
				progress.setAttribute('value',percentComplete);
			}
			else
			{
				localStorage.setItem('upload_progress',parseInt(localStorage.getItem('upload_progress') || 100 )+1);
				var percentComplete = parseInt(parseInt(localStorage.getItem('upload_progress') || 100 )/parseInt(localStorage.getItem('upload_size') || 100 )*100);
				if (percentComplete>100)
					percentComplete=100;
				progress_number.innerHTML=percentComplete+'%';
				progress.setAttribute('value',percentComplete);
			}
		  }
		  );
		  XHR.addEventListener('timeout',function(event){
			alert( 'I could not get a response!');
			//player.stopVideo();
		  }
		  );

		  // Define what happens in case of error
		  XHR.addEventListener(' error', function( event ) {
			alert( 'Oops! Something went wrong.' );
			//player.stopVideo();
		  } );
		

	  // Set up our request
	  //var serverip = $("#serverip").val();
	  var serverip = 'localhost';
	  //if (ValidateIPaddress(serverip))
	  {
		var url='http://';
		url=url.concat(serverip,':4000/usb_upload');
		console.log(url);
		XHR.open( 'POST', url,true);
		//XHR.setRequestHeader('Access-Control-Allow-Headers', '*');
		// Send our FormData object; HTTP headers are set automatically
		XHR.send( FD );
	  }
	}
  
}


function uploadOTAData(data,upload_code)
{
	var XHR = new XMLHttpRequest(),FD  = new FormData();
	for( name in data ) {
		FD.append( name, data[ name ] );
	}
	var progress_bar = document.getElementById('progress-bar');
	progress_bar.style.display = "block";
	var console_output = document.getElementById('console_output');
	//var progress_lbl=$("progress_lbl");
	// Define what happens on successful data submission
	XHR.addEventListener( 'load', function( event ) {
				//console.log(XHR.readyState);
			  if (XHR.readyState === XHR.DONE) {
					if (XHR.status === 200) {
						if (upload_code)
						{
						}
						console_output.innerHTML=XHR.response;
					}
				}
		  } );
		
	  XHR.addEventListener('loadstart',function(event){
		if (event.lengthComputable)
			localStorage.setItem('upload_size',event.total);
		localStorage.setItem('upload_progress',0);
		progress_number.innerHTML='0%';
		progress.setAttribute('value',0);
		console_output.innerHTML='';
		//player.loadPlaylist({list:'PLjzuoBhdtaXNT8unZpegZM15qlQA69Cfu',listype: 'playlist'});
		//player.setShuffle({shufflePlaylist:true});
	  }
	  );
	  
	  var saveByteArray = (function () {
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		return function (data, name) {
			var blob = new Blob(data, {type: "octet/stream"}),
				url = window.URL.createObjectURL(blob);
			a.href = url;
			a.download = name;
			a.click();
			window.URL.revokeObjectURL(url);
		};
	}());
  
	  XHR.addEventListener('loadend',function(event){
		localStorage.setItem('upload_size',parseInt(localStorage.getItem('upload_progress') || 100 ));
		//player.stopVideo();
		//var binDataFile = XHR.response.substring(XHR.response.indexOf("Hex file:")+9,XHR.response.indexOf(".bin")+4);
		//var binData=XHR.response.substring(XHR.response.indexOf(".bin")+7);
		//var binData = XHR.response;
		//console.log(binData.length);
		//var data = [];
		//for (var i = 0; i < binData.length; i++){  
		//	data.push(binData.charCodeAt(i));
		//}
		console.log(XHR.response.length);
		//saveByteArray(XHR.response,'firmware.bin');
		//console.log('Trying to get the file!');
		//const XHR_upload = new XMLHttpRequest();
		//
		//XHR_upload.open("GET",binDataFile,true);
		//XHR_upload.responseType = "blob";
		//
		//XHR_upload.onload = function(oEvent) {
		//  var blob = XHR_upload.response;
		//  console.log('File received!');
		//  console.log(blob);
		//};
		//
		//XHR_upload.send();
		
		// var data = new FormData();
		// data.append("firmware",binData);
		
		// XHR_upload.addEventListener( 'load', function( event ) {
			// if (XHR_upload.readyState === XHR_upload.DONE) {
				// if (parseInt(localStorage.getItem('upload_progress') || 100 )<1)
					// localStorage.setItem('upload_size',100);
				// else
					// localStorage.setItem('upload_size',parseInt(localStorage.getItem('upload_progress') || 100));
				// //modal_progress.style.display = "none";
				// progress_bar.style.display = "none";
			// }
		// });
		
		// XHR_upload.addEventListener('loadstart',function(event){
			// if (event.lengthComputable)
				// localStorage.setItem('upload_size',event.total);
			// localStorage.setItem('upload_progress',0);
			// progress_number.innerHTML='0%';
			// progress.setAttribute('value',0);
			// console_output.innerHTML='';
			// //player.loadPlaylist({list:'PLjzuoBhdtaXNT8unZpegZM15qlQA69Cfu',listype: 'playlist'});
			// //player.setShuffle({shufflePlaylist:true});
		  // }
		  // );
	  
		  // XHR_upload.addEventListener('loadend',function(event){
			// localStorage.setItem('upload_size',parseInt(localStorage.getItem('upload_progress') || 100 ));
			// }
		  // );
	  
		  // XHR_upload.addEventListener('progress',function (event){
			// console_output.innerHTML=XHR_upload.response;
			// if (event.lengthComputable)
			// {
				// var percentComplete = event.loaded / event.total * 100;
				// console.log(percentComplete);
				// progress_number.innerHTML=percentComplete+'%';
				// progress.setAttribute('value',percentComplete);
			// }
			// else
			// {
				// localStorage.setItem('upload_progress',parseInt(localStorage.getItem('upload_progress') || 100 )+1);
				// var percentComplete = parseInt(parseInt(localStorage.getItem('upload_progress') || 100 )/parseInt(localStorage.getItem('upload_size') || 100 )*100);
				// if (percentComplete>100)
					// percentComplete=100;
				// progress_number.innerHTML=percentComplete+'%';
				// progress.setAttribute('value',percentComplete);
			// }
		  // }
		  // );
		  // XHR_upload.addEventListener('timeout',function(event){
			// alert( 'I could not get a response!');
			// //player.stopVideo();
		  // }
		  // );

		  // // Define what happens in case of error
		  // XHR_upload.addEventListener(' error', function( event ) {
			// alert( 'Oops! Something went wrong.' );
			// //player.stopVideo();
		  // } );
		  
		  // var deviceip=document.getElementById('device_ip_upload').value;;
		  // var url='http://';
		  // url=url.concat(deviceip,'/update');
		  // console.log(url);
		  // XHR_upload.open( 'POST', url,true);

		  // // Send our FormData object; HTTP headers are set automatically
		  // XHR_upload.send(data);
		}
	  );
  
	  XHR.addEventListener('progress',function (event){
		console_output.innerHTML=XHR.response;
		if (event.lengthComputable)
		{
			var percentComplete = event.loaded / event.total * 100;
			console.log(percentComplete);
			progress_number.innerHTML=percentComplete+'%';
			progress.setAttribute('value',percentComplete);
		}
		else
		{
			localStorage.setItem('upload_progress',parseInt(localStorage.getItem('upload_progress') || 100 )+1);
			var percentComplete = parseInt(parseInt(localStorage.getItem('upload_progress') || 100 )/parseInt(localStorage.getItem('upload_size') || 100 )*100);
			if (percentComplete>100)
				percentComplete=100;
			progress_number.innerHTML=percentComplete+'%';
			progress.setAttribute('value',percentComplete);
		}
	  }
	  );
	  
	  XHR.addEventListener('timeout',function(event){
		alert( 'I could not get a response!');
		//player.stopVideo();
	  }
	  );

	  // Define what happens in case of error
	  XHR.addEventListener(' error', function( event ) {
		alert( 'Oops! Something went wrong.' );
		//player.stopVideo();
	  } );

  // Set up our request
  //var serverip = $("#serverip").val();
  //var serverip = 'localhost';
  var serverip=document.getElementById('server_ip_upload').value;
  
  //if (ValidateIPaddress(serverip))
  {
	var url='http://';
	url=url.concat(serverip,':4000/ota_upload');
	console.log(url);
	//console.log(FD);
	XHR.open('POST', url,true);
	//console.log('uploadOTAData');
	//XHR.setRequestHeader('Access-Control-Allow-Headers', '*');
	//XHR.setRequestHeader('Access-Control-Allow-Origin', '*');
	
	// Send our FormData object; HTTP headers are set automatically
	XHR.send(FD);
  }
}
	<?php
		}  //Closing bracket for "if (!isset($_GET["embbeded"]))"
	?>
		</script>
		<?php
		
	}  //closing bracket for "if ($rows==1)"
	else
	{
		?>
		<script>
			window.location.replace("dashboard.php");
		</script>
		<?php
	}
	?>
	</body>
</html>
<?php

} //closing bracket for "elseif (isset($_GET["id"])&&!isset($_POST["action"]))"