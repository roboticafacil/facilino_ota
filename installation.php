<?php
require_once('db.php');
require_once('website_translation.php');
?>
<!DOCTYPE html>
<html>
<?php include "head.php"; include "tutorial_head.php";
?>
<body>
<div id="header"><?php include "inc-header.php" ?></div>
<div id="content" style="margin-top:0em; margin-left: 0em; margin-right: 0em">
<section class="mbr-section content8 cid-qYmAtxRqvk" id="content8-8h">

    

    <div class="container">
        <div class="media-container-row title">
            <div class="col-12 col-md-8">
         
            </div>
        </div>
    </div>
</section>

<section class="mbr-section content4 cid-qYmAtSBfME" id="content4-8i">
    <div class="container">
        <div class="media-container-row">
            <div class=" title col-12 col-md-8">
                <h2 class="align-center pb-3 mbr-fonts-style display-2"><?php echo $website["INSTALLATION_SETUP"];?></h2>
                <h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5"><?php echo $website["INSTALLATION_SETUP_DESC"];?></h3>
            </div>
        </div>
    </div>
</section>

<section class="cid-qYgqzf0KVG" id="image3-4p">  

    <figure class="mbr-figure container">
            <div class="image-block" style="width: 40%;">
                <img src="tutorial/assets/images/facilino-676x450.png" width="1400" alt="Facilino" title=""/>
            </div>
    </figure>
</section>
	
<section class="mbr-section article content9 cid-qYgfq9gspk" id="content9-4j">
    
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $website["INSTALL_FACILINO_WINDOWS"];?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>
 
<section class="mbr-section article content1 cid-qYgfMS2fzW" id="content1-4l">
    
   <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7">
<!-- <p>You can download Facilino OTA Server from <a onclick="onPageClicked('https://roboticafacil.es');" style="color:#1ec6c6">Robotica Facil</a> website. Go to Download section and find the latest version of Facilino OTA Server</p> -->
<p><?php echo $website["INSTALLATION_FACILINO_DOWNLOAD_DESC"];?></p>
<p>&nbsp;</p>
	</div>
	</div>
	</div>
			</div>
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text counter-container col-12 col-md-8 mbr-fonts-style display-7">
                <ol>
                    <li><strong><?php echo $website["INSTALLATION_DOWNLOAD_FILES"]; ?></strong>
					<p><?php echo $website["INSTALLATION_DOWNLOAD_FILES_DESC"];?></p> 
					<p><?php echo $website["INSTALLATION_DOWNLOAD_FILES_DESC1"]; ?></p>
					</li> 
					<li><strong><?php echo $website["INSTALLATION_FACILINO_OTA_SERVER_INSTALLER"]; ?></strong>
					<p><?php echo $website["INSTALLATION_FACILINO_OTA_SERVER_INSTALLER_DESC1"];?></p>
					<p><?php echo $website["INSTALLATION_FACILINO_OTA_SERVER_INSTALLER_DESC2"];?></p>
					<p><center>
					<img src="assets/images/Install/FacilinoOTAServer_install1.png" width="60%" alt="Facilino1" title=""/>
					</center></p>
					<p><?php echo $website["INSTALLATION_FACILINO_OTA_SERVER_INSTALLER_DESC3"];?></p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install2.png" width="60%" alt="Facilino2" title=""/></center></p>
					<p><?php echo $website["INSTALLATION_FACILINO_OTA_SERVER_INSTALLER_DESC4"];?></p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install3.png" width="60%" alt="Facilino3" title=""/></center></p>
					</li>
					<li><strong><?php echo $website["INSTALLATION_FACILINO_OTA_SERVER_ZIP"];?></strong>
					<p><?php echo $website["INSTALLATION_FACILINO_OTA_SERVER_ZIP_DESC1"];?></p>
					</li>
					<li><strong>Arduino CLI</strong>
					<p><?php echo $website["INSTALLATION_ARDUINO_CLI_DESC1"];?></p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install5.png" width="80%" alt="Facilino5" title=""/></center></p>
					<p><?php echo $website["INSTALLATION_ARDUINO_CLI_DESC2"];?></p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install6.png" width="100%" alt="Facilino6" title=""/></center></p>
					<p><?php echo $website["INSTALLATION_ARDUINO_CLI_DESC3"];?></p>
					</li>
					<li><strong>Running Facilino OTA Server</strong>
					<p>You can run Facilino OTA Server from the command shell by typing <i>FacilinoOTAServer.exe -e</i> (you need to <i>cd</i> to Facilino installation folder).</p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install4.png" width="80%" alt="Facilino4" title=""/></center></p>
					<p>Every time your computer restarts or you close the command shell, you will need to manually execute Facilino OTA server so it can compile or upload code. This is OK if you are the only user using the computer, however, if more users are about to use Facilino (i.e. in a Lab room), in order to avoid copies of the same libraries for each user, the recommended method is to install a service that runs automatically at boot up.</p>
					<p><strong>IMPORANT: In order to run Facilino OTA Server as a service, it must be installed by the administrator of the machine and the service must be installed also by the same user</strong>. In that case, open a command shell with administrative permission and <i>cd </i> to Facilino OTA Server and type <i>FacilinoOTAServer.exe -i &lt;user&gt; &lt;password&gt;</i>, where &lt;user&gt; and &lt;password&gt; denotes the system user and password of the computer with administrative permisions.</p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install7.png" width="100%" alt="Facilino7" title=""/></center></p>
					<p>Now, start the service simply by executing the command <i>FacilinoOTAServer.exe</i>. To stop the service, you can execute the command <i>FacilinoOTAServer.exe -t</i>.</p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install9.png" width="60%" alt="Facilino9" title=""/>
					<img src="assets/images/Install/FacilinoOTAServer_install11.png" width="60%" alt="Facilino11" title=""/>
					</center></p>
					<p>Is recommended to check the status of the service through the Windows service utility.</p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install8.png" width="100%" alt="Facilino8" title=""/></center></p>
					</li>
					<li><strong>Compile and Upload</strong>
					<p>Here, we assume that you have registed an account on Facilino web page, if not, please go to <a onclick="onPageClicked('https://roboticafacil.es/facilino_ota/registration.php');" style="color:#1ec6c6">Register</a> and complete the registration and log in.</p>
					<p>To check if Facilino OTA can compile and upload code, create a blank project. On the projects <a onclick="onPageClicked('https://roboticafacil.es/facilino_ota/dashboard.php');" style="color:#1ec6c6">Dashboard</a>, click on <a onclick="onPageClicked('https://roboticafacil.es/facilino_ota/dashboard.php?action=new');" style="color:#1ec6c6">New Project</a> and select the desired processor among the list of available ones; select Facilino as <i>Facilino Version</i> and Generic Project <i>Block Instruction Set</i> and press <i>Create</i>.</p>
					<p>Then, connect your board to the USB port and click on <i><?php echo $website["COMPILE_UPLOAD"];?><span class="mbri-play mbr-iconfont mbr-iconfont-btn" style="color: rgb(255, 148, 0);  margin-left:0.25em;"></span></i> icon. A window will show up with the generated code (so far since the project is empty, only setup and loop functions should appear). Select the board port in the dropdown list (if necessary press the <i><?php echo $website["REFRESH"]?><span class='mbri-update mbr-iconfont mbr-iconfont-btn' style='color: rgb(255, 148, 0);  margin-left:0.25em;'></span></i>) and board:</p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install14.png" width="100%" alt="Facilino14" title=""/></center></p>
					<p>Then, verify that the code compiles by click on <i><?php echo $website["VERIFY"] ?><span class='mbri-success mbr-iconfont mbr-iconfont-btn' style='color: rgb(255, 148, 0);  margin-left:0.25em;'></span></i> and then if succeed upload the code by clicking on <i><?php echo $website["UPLOAD"] ?><span class='mbri-right mbr-iconfont mbr-iconfont-btn' style='color: rgb(255, 148, 0);  margin-left:0.25em'></span></i>.</p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install15.png" width="100%" alt="Facilino15" title=""/></center>
					<center><img src="assets/images/Install/FacilinoOTAServer_install16.png" width="100%" alt="Facilino16" title=""/>
					</center></p>
					<p><b>Remark: </b>Every time you change the code, you need to compile first and then upload, otherwise the latest compiled code will be uploaded.</p>
					</li>
				</ol>
            </div>
        </div>
    </div>
</section>

<div id="ads"><?php include "ads.php" ?></div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>