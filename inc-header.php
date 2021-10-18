<?php
//echo '<div style="margin-bottom: -30px;">';
require_once('db.php');
require_once('website_translation.php');
?>
<?php
echo '<div>';
echo '<section class="menu cid-qAignIVLHL" once="menu" id="menu1-e" data-rv-view="7">';
echo '<nav class="navbar navbar-expand beta-menu align-items-center navbar-fixed-top navbar-toggleable-sm">';
echo '<div class="menu-logo">';
echo '<div class="navbar-brand">';
echo '<span class="navbar-logo">';
echo '<a href="index.php"><img src="assets/images/facilino.png" alt="Facilino" title="'.$website["ROBOTICA_FACIL_SHOP"].'" media-simple="true" style="height: 2.1rem;"></a>';
echo '</span>';
if(isset($_SESSION["username"]))
{
	if(strpos($_SERVER['PHP_SELF'],'facilino.php') !== false)
	{
		
		$query = "SELECT name from `projects`where `projects`.id= ".$_GET["id"];
		$result = mysqli_query($con,$query);
		$rows = mysqli_num_rows($result);
		if ($rows==1)
		{
			$row = mysqli_fetch_row($result);
			echo '<h5 style="color:white">&nbsp;&nbsp;'.$row[0].'</h5>';
		}
	}
	else
	{
		if(strpos($_SERVER['PHP_SELF'],'dashboard.php') !== false)
		{
			echo '<h2 style="color:white">&nbsp;&nbsp;'.$website["PROJECTS"].'</h2>';
		}
		elseif(strpos($_SERVER['PHP_SELF'],'translate.php') !== false)
		{
			echo '<h2 style="color:white">&nbsp;&nbsp;'.$website["FACILINO_TRANSLATE"].'</h2>';
		}
		elseif(strpos($_SERVER['PHP_SELF'],'user.php') !== false)
		{
			echo '<h2 style="color:white">&nbsp;&nbsp;'.$website["USER_PROFILE"].'</h2>';
		}
		elseif(strpos($_SERVER['PHP_SELF'],'doc_help.php') !== false)
		{
			echo '<h2 style="color:white">&nbsp;&nbsp;'.$website["DOCUMENTATION"].'</h2>';
		}
		echo '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
		echo '<ins class="adsbygoogle" style="display:inline-block;width:550px;height:50px; text-align: center" data-ad-client="ca-pub-5054503364495454" data-ad-slot="6161628565"></ins>';
		echo '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
	}
}
else
{
	if(strpos($_SERVER['PHP_SELF'],'index.php') !== false)
	{
		echo '<h2 style="color:white">&nbsp;&nbsp;'.$website["WELCOME_FACILINO"].'</h2>';
	}
	elseif (strpos($_SERVER['PHP_SELF'],'login.php') !== false)
	{
		echo '<h2 style="color:white">&nbsp;&nbsp;'.$website["LOGIN"].'</h2>';
	}
	elseif (strpos($_SERVER['PHP_SELF'],'registration.php') !== false)
	{
		echo '<h2 style="color:white">&nbsp;&nbsp;'.$website["REGISTRATION"].'</h2>';
	}
	elseif (strpos($_SERVER['PHP_SELF'],'lost-password.php') !== false)
	{
		echo '<h2 style="color:white">&nbsp;&nbsp;'.$website["LOST_PASSWORD"].'</h2>';
	}
	elseif(strpos($_SERVER['PHP_SELF'],'doc_help.php') !== false)
	{
		echo '<h2 style="color:white">&nbsp;&nbsp;'.$website["DOCUMENTATION"].'</h2>';
	}
	echo '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>';
	echo '<ins class="adsbygoogle" style="display:inline-block;width:550px;height:50px; text-align: center" data-ad-client="ca-pub-5054503364495454" data-ad-slot="6161628565"></ins>';
	echo '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
}
echo '</div></div>';
echo '<div class="collapse navbar-collapse" id="navbarSupportedContent">';
if(isset($_SESSION["username"]))
{
	if(strpos($_SERVER['PHP_SELF'],'dashboard.php') !== false){
		require_once('db.php');
		$query = "SELECT `user_role_id`,`first_name` from `users`where `users`.`username`=\"".$_SESSION["username"]."\"";
		$result = mysqli_query($con,$query);
		$rows = mysqli_num_rows($result);
		if ($rows==1)
		{
			$row = mysqli_fetch_row($result);
			if ($row[0]==4)
			{
				echo "<div class='navbar-buttons mbr-section-btn'><a href='upgrade.php'><button class='btn btn-sm btn-primary-outline display-4' title='".$website["UPGRADE_FACILINO"]."'><span class='mbri-growing-chart mbr-iconfont mbr-iconfont-btn' style='color: rgb(255, 148, 0);'></span></button></a></div>";
			}
			echo "<div class='navbar-buttons mbr-section-btn'><a href='user.php'><button class='btn btn-sm btn-primary-outline display-4' title='".$website["USER"]." - ".$row[1]."'><span class='mbri-user mbr-iconfont mbr-iconfont-btn' style='color: rgb(255, 148, 0);'></span></button></a></div>";
		}
		
		echo "<div class='navbar-buttons mbr-section-btn'><a href='translate.php'><button class='btn btn-sm btn-primary-outline display-4' title='".$website["TRANSLATE"]."'><span class='mbri-flag mbr-iconfont mbr-iconfont-btn' style='color: rgb(255, 148, 0);  margin-left:0.25em;'></span></button></a></div>";
		if(strpos($_SERVER['PHP_SELF'],'doc_help.php') === false)
		{
			echo '<div class="navbar-buttons mbr-section-btn"><a href="doc_help.php" target="_blank"><button class="btn btn-sm btn-primary-outline display-4" title="'.$website["HELP"].'"><span class="mbri-question mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0); margin-left:0.25em;"></span></button></a></div>';
		}
		echo '<div class="navbar-buttons mbr-section-btn"><a href="logout.php"><button class="btn btn-sm btn-primary-outline display-4" title="'.$website["LOGOUT"].'"><span class="mbri-logout mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></a></div>';
	}
	else
	{
		if(strpos($_SERVER['PHP_SELF'],'facilino.php') !== false)
		{
			echo '</div>';
			echo '<div>';
			echo '<script>function saveBeforeExit(){}; function compile(){}; function upload(){}; function compile_upload(){}; function saveAll(){}; function listPorts(){}; function portChange(a){}; function butUndo(){}; function butRedo(){}; function toogleCode(){}; function copyToClipboard(){};  function showToolbox(){}; function showHideCategory(i){};</script>';;
			echo '<div class="collapse navbar-collapse" id="navbarSupportedContent">';
			echo '<div class="navbar-buttons mbr-section-btn"><button class="btn btn-sm btn-primary-outline display-4" title="'.$website["PROJECTS"].'" onclick="saveBeforeExit();"><span class="mbri-home mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>';
			//echo '<div class="navbar-buttons mbr-section-btn"><button class="btn btn-sm btn-primary-outline display-4" title="Save" onclick="saveAll();"><span class="mbri-save mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>';
			//echo '<div class="navbar-buttons mbr-section-btn"><button class="btn btn-sm btn-primary-outline display-4" title="Verify" onclick="compile();"><span class="mbri-success mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>';
			//echo '<div class="navbar-buttons mbr-section-btn"><button class="btn btn-sm btn-primary-outline display-4" title="Upload" onclick="upload();"><span class="mbri-right mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>';
			echo '<div class="navbar-buttons mbr-section-btn"><button class="btn btn-sm btn-primary-outline display-4" title="'.$website["COMPILE_UPLOAD"].'" onclick="compile_upload();"><span class="mbri-play mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>';
			
			//echo '<div class="navbar-buttons mbr-section-btn"><button class="btn btn-sm btn-primary-outline display-4" title="Save" onclick="listPorts();"><span class="mbri-link mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>';
			//echo '<select id="ports" class="text-black dropdown-toggle display-6 icon-menu" onchange="portChange(this.value)" style="display: none"></select>';
			echo '<div class="navbar-buttons mbr-section-btn"><a href="doc_help.php" target="_blank"><button class="btn btn-sm btn-primary-outline display-4" title="'.$website["HELP"].'"><span class="mbri-question mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0); margin-left:0.25em;"></span></button></a></div>';
			echo '</div>';
			echo '<div class="collapse navbar-collapse" id="navbarSupportedContent">';
			echo '<div class="navbar-buttons mbr-section-btn"><button id="undo" class="btn btn-sm btn-primary-outline display-4" title="'.$website["UNDO"].'" onclick="butUndo();"><span class="mbri-undo mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>';
			echo '<div class="navbar-buttons mbr-section-btn" ><button id="redo" class="btn btn-sm btn-primary-outline display-4" title="'.$website["REDO"].'" onclick="butRedo();"><span class="mbri-redo mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>';
			echo '<div id="toggle_code" class="navbar-buttons mbr-section-btn"><button id="button_code" class="btn btn-sm btn-primary-outline display-4" title="'.$website["VIEW_ARDUINO_CODE"].'" onclick="toogleCode();"><span class="mbri-arduino mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>';
			echo '<div id="copy_clipboard" class="navbar-buttons mbr-section-btn" style="display:none"><button id="button_copy" class="btn btn-sm btn-primary-outline display-4" title="'.$website["COPY_CODE_CLIPBOARD"].'" onclick="copyToClipboard();"><span class="mbri-share mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>';
			$query = "SELECT * from `categories` where 1";
			$result = mysqli_query($con,$query);
			$rows = mysqli_num_rows($result);
			
			if ($rows>0)
			{
				echo '<div class="navbar-buttons mbr-section-btn"><button id="toolboxP" class="btn btn-sm btn-primary-outline display-4" title="'.$website["CONFIGURE_TOOLBOX"].'" onclick="showToolbox()"><span class="mbri-add-submenu mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></div>';
			echo '<div class="dropdown-menu text-white" id="toolbox_menu" style="display: none; background-color: rgb(35,35,35); position: absolute; left: 85%; ">'.$website["COPY_CODE_CLIPBOARD"];
				$first_menu=true;
				$is_submenu=false;
				for ($cat=0;$cat<$rows;$cat++)
				{
					$row = mysqli_fetch_row($result);
					if ($row[3]<=1)
					{
						if (!$first_menu)
						{
							if ($is_submenu)
								echo '</div>';
							echo '</div>';
						}
						echo '<div class="dropdown">';
						
						if ($row[3]==1)
						{
							echo '<a class="text-white dropdown-item dropdown-toggle display-4" aria-expanded="false" data-toggle="dropdown-submenu">'.$row[2].'</a>';
							echo '<div class="dropdown-menu dropdown-submenu">;';
							$is_submenu=true;
						}
						else
						{
							echo '<button class="text-white dropdown-item display-4" onclick="showHideCategory(\''.$row[1].'\')" aria-expanded="false"><span>'.$row[2].'</span></button>';
							$is_submenu=false;
						}
						$first_menu=false;
					}
					else
					{
						echo '<button class="text-white dropdown-item display-4" onclick="showHideCategory(\''.$row[1].'\')" aria-expanded="false"><span>'.$row[2].'</span></button>';
					}
				}
				echo '</div>';
			}
			echo '</div>';
			echo '</div>';
		}
		else
		{
			echo '<div class="navbar-buttons mbr-section-btn"><a href="dashboard.php"><button class="btn btn-sm btn-primary-outline display-4" title="'.$website["PROJECTS"].'"><span class="mbri-home mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></a></div>';
			if(strpos($_SERVER['PHP_SELF'],'doc_help.php') === false)
			{
				echo '<div class="navbar-buttons mbr-section-btn"><a href="doc_help.php" target="_blank"><button class="btn btn-sm btn-primary-outline display-4" title="'.$website["HELP"].'"><span class="mbri-question mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0); margin-left:0.25em;"></span></button></a></div>';
			}
			if(strpos($_SERVER['PHP_SELF'],'logout.php') === false)
			{
				echo '<div class="navbar-buttons mbr-section-btn"><a href="logout.php"><button class="btn btn-sm btn-primary-outline display-4" title="'.$website["LOGOUT"].'"><span class="mbri-logout mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></a></div>';
			}
		}
	}
}
else
{
	if(strpos($_SERVER['PHP_SELF'],'login.php') === false){
		if(strpos($_SERVER['PHP_SELF'],'dashboard.php') === false)
		{
			echo '<div class="navbar-buttons mbr-section-btn"><a href="dashboard.php"><button class="btn btn-sm btn-primary-outline display-4" title="'.$website["PROJECTS"].'"><span class="mbri-home mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></a></div>';
		}
		echo '<div class="navbar-buttons mbr-section-btn"><a href="login.php"><button class="btn btn-sm btn-primary-outline display-4" title="'.$website["LOGIN"].'"><span class="mbri-login mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></button></a></div>';
	}
}
//echo '<div class="navbar-buttons mbr-section-btn"><button class="btn btn-sm btn-primary-outline display-4" title="Facilino Tutorial" onclick="window.open(\'./FacilinoTutorial.html\', \'_blank\')" target="_blank"><span class="mbri-rocket mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);"></span></button></div>';
echo '</div>';
echo '</nav>';
echo '</section>';
echo '</div>';
/* <div class="form">
<p>Facilino <?php echo $_SESSION['username']; ?>!</p>
<p>This is secure area.</p>
<p><a href="dashboard.php">Dashboard</a></p>
<a href="logout.php">Logout</a>
</div>
</body>
</html> */
?>
