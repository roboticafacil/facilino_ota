<!DOCTYPE HTML> 
<html>
<?php include "head.php"; ?>
<body>
<?php
require_once('db.php');
include('functions.php');
session_start();
?>
	<div id="header"><?php include "inc-header.php" ?></div>
	<div id="content" style="margin-top:3em; margin-left:0.5em">
<?php
if  (isset($_GET["action"])&&(($_GET["action"]=="new")||($_GET["action"]=="edit"))&&!isset($_POST["action"])&&isset($_POST["cancel_button"])){
			//Exit from create new circuit
			header("Location: circuits.php");
		}
		elseif  (isset($_GET["action"])&&($_GET["action"]=="new")&&!isset($_POST["action"])&&isset($_POST["create_button"])){
			//Create new circuit
			$query_users = "SELECT user_role_id FROM `users` WHERE `username`=\"".$_SESSION["username"]."\"";
			$result_users = mysqli_query($con,$query_users);
			$rows_users = mysqli_num_rows($result_users);
			if ($rows_users==1)
			{
				$row_role=mysqli_fetch_row($result_users);
				if ($row_role[0]==1)
				{
					$circuit_name=$_POST["circuit_name"];
					$processor_id=$_POST["processor_id"];
					$query = "SELECT `circuits`.`id`,`circuits`.`key` FROM `circuits` inner join `processors` on (`circuits`.`processor_id`=".$processor_id." and `processors`.`id`=`circuits`.`processor_id`) WHERE `key`=\"".$circuit_name."\"";
					$result = mysqli_query($con,$query);
					//print_r($query);
					$rows = mysqli_num_rows($result);
					if ($rows==1)
					{
						//Circuit already exists
						$row= mysqli_fetch_row($result);
						$id=$row[0];
						//print_r("Circuit exists ");
					}
					else
					{
						//Create new circuit
						$query="INSERT INTO `circuits`(`key`,`processor_id`) VALUES (\"".$circuit_name."\",".$processor_id.")";
						mysqli_query($con,$query);
						$id=$con->insert_id;
						//print_r("new_circuit ");
					}
					//print_r($id);
					$query="INSERT INTO `circuits_meta`(`circuit_id`,`meta_key`,`meta_value`) VALUES (\"".$id."\",\"image\",\"".$_POST["circuit_image"]."\")";
					mysqli_query($con,$query);
					$components=array();
					$i=1;
					while (isset($_POST["comp".$i]))
					{
						$components[$i]=$_POST["comp".$i];
						$i=$i+1;
					}
					foreach ($components as $component)
					{
						$query = "INSERT INTO `circuits_meta`(`circuit_id`,`meta_key`,`meta_value`) VALUES (\"".$id."\",\"component\",\"".$component."\")";
						mysqli_query($con,$query);
					}
					$connections=array();
					$i=1;
					while (isset($_POST["conn".$i]))
					{
						$connections[$i]=$_POST["conn".$i];
						$i=$i+1;
					}
					foreach ($connections as $connection)
					{
						$query = "INSERT INTO `circuits_meta`(`circuit_id`,`meta_key`,`meta_value`) VALUES (\"".$id."\",\"connection\",\"".$connection."\")";
						mysqli_query($con,$query);
					}
					if (isset($_POST["code_modifier"])&&(strcmp($_POST["code_modifier"],"")!=0))
					{
						$query = "INSERT INTO `circuits_meta`(`circuit_id`,`meta_key`,`meta_value`) VALUES (\"".$id."\",\"modifier\",\"".$_POST["code_modifier"]."\")";
						mysqli_query($con,$query);
					}
					header("Location: circuits.php");
				}
				else
					header("Location: circuits.php");
			}
			else
				header("Location: circuits.php");
		}
		elseif (isset($_GET["action"])&&(($_GET["action"]=="new")||($_GET["action"]=="edit"))&&!isset($_POST["action"]))
		{
			$query_users = "SELECT user_role_id FROM `users` WHERE `username`=\"".$_SESSION["username"]."\"";
			$result_users = mysqli_query($con,$query_users);
			$rows_users = mysqli_num_rows($result_users);
			if ($rows_users==1)
			{
				$row_role=mysqli_fetch_row($result_users);
				if ($row_role[0]==1)
				{
					?>
					  <script src="assets/web/assets/jquery/jquery.min.js"></script>
					  <script src="assets/popper/popper.min.js"></script>
					  <script src="assets/smooth-scroll/smooth-scroll.js"></script>
					  <script src="assets/theme/js/script.js"></script>
					  <script src="assets/formoid/formoid.min.js"></script>
					<?php
						if ($_GET["action"]=="new")
						{
							?>
							<form action="circuits.php?action=new" method="POST">
							<h4>New circuit</h4>
							<?php
						}
						else
						{
							?>
							<form action="circuits.php?action=edit" method="POST">
							<h4>Edit circuit</h4>
							<?php
							$query_circuit = "SELECT `circuits`.`key`,`circuits`.`processor_id`,`circuits_meta`.`id`,`circuits_meta`.`meta_key`,`circuits_meta`.`meta_value` FROM `circuits` inner join `circuits_meta` on (`circuits_meta`.`circuit_id`=`circuits`.`id`) WHERE `circuits`.`id`=".$_GET["id"];
							$result_circuit = mysqli_query($con,$query_circuit);
							$rows_circuit = mysqli_num_rows($result_circuit);
							if ($rows_circuit==0)
							{
								
								?><h5>Upps! something went wrong!</h5><?php
							}
							$circuit=array("name"=>"","processor_id"=>0,"image"=>"","image_id"=>0,"components"=>array(),"connections"=>array(),"code_modifier"=>"","code_modifier_id"=>0);
							while($row_circuit=mysqli_fetch_row($result_circuit))
							{
								if (strcmp($row_circuit[3],"image")==0)
								{
									$circuit["image"]=$row_circuit[4];
									$circuit["image_id"]=$row_circuit[2];
								}
								elseif (strcmp($row_circuit[3],"component")==0)
								{
									$circuit["components"][]=array("id"=>$row_circuit[2],"component"=>$row_circuit[4]);
								}
								elseif (strcmp($row_circuit[3],"connection")==0)
								{
									$circuit["connections"][]=array("id"=>$row_circuit[2],"connection"=>$row_circuit[4]);
								}
								elseif (strcmp($row_circuit[3],"code_modifier")==0)
								{
									$circuit["code_modifier"]=$row_circuit[4];
									$circuit["code_modifier_id"]=$row_circuit[2];
								}
								$circuit["name"]=$row_circuit[0];
								$circuit["processor_id"]=$row_circuit[1];
							}
						}
					?>
						<div class="datagrid">
						<table width="100%">
						<tr><th style="width:20%">Circuit name</th><th style="width:20%">Image file (inside 'doc/circuits/')</th><th style="width:15%">Board</th><th style="width:15%">Components&nbsp;<button type="button" onclick="addCompField()" title="Add component">+</button>&nbsp;<button type="button" onclick="removeCompField()" title="Remove component">-</button></th><th style="width:20%">Connections&nbsp;<button type="button" onclick="addConnField()" title="Add connection">+</button>&nbsp;<button type="button" onclick="removeConnField()" title="Remove connection">-</button></th><th style="width:10%">Code modifier</th></tr>
						<tr>
						<td><input type="text" name="circuit_name" maxlength="250" size="250" id="circuit_name" style="margin-top: 0px; padding: 0px; padding-left: 10px; font-size: 12px; width: 100%"<?php if ($_GET["action"]=="edit"){ echo 'value="'.$circuit["name"].'"';}?> ></td>
						<td><input type="text" name="circuit_image" maxlength="250" size="250" id="circuit_image" style="margin-top: 0px; padding: 0px; padding-left: 10px; font-size: 12px; width: 100%" <?php if ($_GET["action"]=="edit"){ echo 'value="'.$circuit["image"].'"';}?> onchange="imageChange(this.value)"  ></td>
						<td>
						<select id="processor_id" name="processor_id" type="text"/>
						<?php
						$query = "SELECT DISTINCT id,name FROM `processors` WHERE 1";
						$result = mysqli_query($con,$query);
						$rows = mysqli_num_rows($result);
						if ($rows>0)
						{
							$row = mysqli_fetch_row($result);
							?><option value="<?php echo $row[0]; ?>"<?php if ($_GET["action"]=="new"){echo 'selected="selected"';}elseif ($circuit["processor_id"]==$row[0]) { echo 'selected="selected"'; } ?> ><?php echo $row[1] ?></option><?php
							while ($row = mysqli_fetch_row($result))
							{
								?><option value="<?php echo $row[0] ?>" <?php if (($_GET["action"]=="edit")&&($circuit["processor_id"]==$row[0])){echo 'selected="selected"';} ?> ><?php echo $row[1] ?></option><?php
							}
						}
						?>
						</select>
						</td>
						<td>
						<div id="comp1_div">
						<select id="comp1" name="comp1" type="text"/>
						<?php
						$query = "SELECT `key`,`name` mcu_family FROM `components` WHERE 1";
						$result = mysqli_query($con,$query);
						$rows = mysqli_num_rows($result);
						if ($rows>0)
						{
							$row = mysqli_fetch_row($result);
							?><option value="<?php echo $row[0] ?>" <?php if ($_GET["action"]=="new"){echo 'selected="selected"';}elseif ($circuit["components"][0]==$row[0]) { echo 'selected="selected"'; } ?> ><?php echo $row[1] ?></option><?php
							while ($row = mysqli_fetch_row($result))
							{
								?><option value="<?php echo $row[0] ?>" <?php if (($_GET["action"]=="edit")&&($circuit["components"][0]==$row[0])){echo 'selected="selected"';} ?> ><?php echo $row[1] ?></option><?php
							}
						}
						?>
						</div>
						<?php
						if ($_GET["action"]=="edit")
						{
							for ($count=1;$count<=count($circuit["components"])-1;$count++)
							{
								$j=($count+1);
								echo '<div id="comp'.$j.'_div">';
								echo '<select id="comp'.$j.'" name="comp'.$j.'" type="text"/>';
								echo '</div>';
							}
						}
						?>
						</td>
						<td>
						<div id="conn1_div">
						<input type="text" name="conn1" maxlength="250" size="250" style="margin-top: 0px; padding: 0px; padding-left: 10px; font-size: 12px; width: 100%" id="conn1">
						</div>
						</td>
						<td><input type="text" name="code_modifier" maxlength="25" size="25" id="code_modifier" style="margin-top: 0px; padding: 0px; padding-left: 10px; font-size: 12px; width: 100%"></input></td>
						</tr>
						</table>
						</div>
						<div>
						<!-- <img id="circ_img" src="" onload="alert('good'); " onerror="alert('bad');"></img>-->
						<img id="circ_img" src=""></img>
						</div>
						<input name="create_button" type="submit" value="Create" />&nbsp;&nbsp;
						<input name="cancel_button" type="submit" value="Cancel"/>
						</form>
						</br>
					<script type='text/javascript'>
				var comp_id=1;
				var last_comp= document.getElementById("comp1_div");
				
				/*const inputHandler = function(e) {
					document.getElementById('circ_img').src='doc/circuits/'+e.target.value;
				}
				
				const source = document.getElementById('circ_img');
				source.addEventListener('input', inputHandler);
				source.addEventListener('propertychange', inputHandler); */
				
				function imageChange(value)
				{
					console.log(value);
					document.getElementById('circ_img').src='doc/circuits/'+value;
				}
				function addCompField(){
					// Container <div> where dynamic content will be placed
					var comp_div=last_comp.cloneNode(true);
					comp_id=comp_id+1;
					comp_div.id="comp"+comp_id+"_div";
					comp_div.children[0].id="comp"+comp_id;
					comp_div.children[0].name="comp"+comp_id;
					console.log(comp_div);
					last_comp.parentNode.insertBefore(comp_div,last_comp.nextSibling);
					last_comp=comp_div;
					
				}
				function removeCompField()
				{
						if (comp_id>1)
						{
							var prev=last_comp.previousSibling;
							last_comp.parentNode.removeChild(last_comp);
							last_comp=prev;
							comp_id=comp_id-1;
						}
				}
				
				var conn_id=1;
				var last_conn= document.getElementById("conn1_div")
				function addConnField(){
					// Container <div> where dynamic content will be placed
					var conn_div=last_conn.cloneNode(true);
					conn_id=conn_id+1;
					conn_div.id="conn"+conn_id+"_div";
					conn_div.children[0].id="conn"+conn_id;
					conn_div.children[0].name="conn"+conn_id;
					last_conn.parentNode.insertBefore(conn_div,last_conn.nextSibling);
					last_conn=conn_div;
				}
				function removeConnField()
				{
						if (conn_id>1)
						{
							var prev=last_conn.previousSibling;
							last_conn.parentNode.removeChild(last_conn);
							last_conn=prev;
							conn_id=conn_id-1;
						}
				}
				</script>
					<?php	
				}
				else
				{
					header("Location: circuits.php");
				}
			}
			else
				header("Location: circuits.php");
		}
else{
		//List all user projects
		?>
		<h1 >Circuits</h1>
		<h4>&nbsp;<a href="circuits.php?action=new" title="new" style="text-decoration: none;">New circuit&nbsp;<span class="mbri-plus mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a></h4>
		<div class="datagrid">
		<table width="100%">
		<col style="width:10%">
		<col style="width:10%">
		<col style="width:15%">
		<col style="width:15%">
		<col style="width:15%">
		<col style="width:5%">
		<tr><th>Key</th><th>Processor</th><th>Image</th><th>Components</th><th>Connections</th><th>Actions</th></tr>
		<?php
		$query_comp ="SELECT `components`.`key`, `components`.`name` from `components` WHERE 1";
		$result_comp = mysqli_query($con,$query_comp);
		$components = array();
		while ($row_comp = mysqli_fetch_row($result_comp))
			$components[$row_comp[0]]=$row_comp[1];
		$query = "SELECT `circuits`.`id`, `circuits`.`key`, `processors`.`mcu_family`, `circuits_meta`.`meta_key`, `circuits_meta`.`meta_value` from `circuits` inner join `circuits_meta` on (`circuits`.`id`=`circuits_meta`.`circuit_id`) inner join `processors` on (`processors`.`id`=`circuits`.`processor_id`) WHERE `circuits_meta`.`meta_key`=\"image\" or `circuits_meta`.`meta_key`=\"component\" or `circuits_meta`.`meta_key`=\"connection\"";
	//print_r($query);
	$result = mysqli_query($con,$query);
	$circuits = array();
	while ($row = mysqli_fetch_row($result))
	{
		if (isset($circuits[$row[0]]))
		{
			if (strcmp($row[3],"image")===0)
			{
				$circuits[$row[0]]["image"]=$row[4];
			}
			elseif (strcmp($row[3],"component")===0)
				array_push($circuits[$row[0]]["components"],$components[$row[4]]);
			elseif (strcmp($row[3],"connection")===0)
				array_push($circuits[$row[0]]["connections"],$row[4]);
		}
		else
		{
			if (strcmp($row[3],"image")===0)
				$circuits[$row[0]]=array("id"=>$row[0],"key"=>$row[1],"mcu_family"=>$row[2],"image"=>$row[4],"components" => array(),"connections"=>array());
			elseif (strcmp($row[3],"component")===0)
				$circuits[$row[0]]=array("id"=>$row[0],"key"=>$row[1],"mcu_family"=>$row[2],"image"=>"","components" => array($components[$row[4]]),"connections"=>array());
			elseif (strcmp($row[3],"connection")===0)
				$circuits[$row[0]]=array("id"=>$row[0],"key"=>$row[1],"mcu_family"=>$row[2],"image"=>"","components"=>array(),"connections" => array($row[4]));
		}
	}
	foreach($circuits as $circuit)
	{
		?><tr><?php
		?><td><?php echo $circuit["key"]?></td><?php
		?><td><?php echo $circuit["mcu_family"]?></td><?php
		?><td><?php echo '<img src="doc/circuits/'.$circuit["image"].'" width="70%"></img>'?></td><?php
		?><td><ul><?php
		foreach ($circuit["components"] as $component){
			  ?><li><?php echo $component?></li><?php
		 }
		?></ul></td>
		<td><ul><?php
		foreach ($circuit["connections"] as $connection){
			  ?><li><?php echo $connection?></li><?php
		 }
		?></ul></td><?php
		?>
			 <td>
			 <a href="circuits.php?action=edit&id=<?php echo $circuit["id"]?>" title="Edit" style="text-decoration: none;"><span class="mbri-edit mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
			 <a href="circuits.php?action=duplicate&id=<?php echo $circuit["id"]?>" title="Duplicate" style="text-decoration: none;"><span class="mbri-pages mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
			 <a title="Delete" onclick="javascript: return confirm('Are you sure you want to delete?');" href="circuits.php?action=delete&id=<?php echo $circuit["id"]?>" style="text-decoration: none;"><span class="mbri-trash mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></a>&nbsp;
			 </td>
		</tr><?php
	}
	?>
	</table>
	</div>
	</br>
<?php } ?>
</div>
	<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>