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
                <h2 class="align-center pb-3 mbr-fonts-style display-2">Facilino Installation & Setup</h2>
                <h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5">Install Facilino OTA Server before you start programming.</h3>
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
                    Installing Facilino on Windows</div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>
 
<section class="mbr-section article content1 cid-qYgfMS2fzW" id="content1-4l">
    
   <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7">
<p>You can download Facilino OTA Server from <a onclick="onPageClicked('https://roboticafacil.es');" style="color:#1ec6c6">Robotica Facil</a> website. Go to Download section and find the latest version of Facilino OTA Server</p>
<p>&nbsp;</p>
	</div>
	</div>
	</div>
			</div>
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text counter-container col-12 col-md-8 mbr-fonts-style display-7">
                <ol>
                    <li><strong>Download Files</strong>
					<p>First, download <a onclick="onPageClicked('https://roboticafacil.es/en/download');" style="color:#1ec6c6">Facilino OTA Server</a> (either the installer or the ZIP file for non-admin users) from the <a onclick="onPageClicked('https://roboticafacil.es');" style="color:#1ec6c6">Robotica Facil</a> website.</p> 
					<p>Select your computer specific version and press the link to start downloading. Be advised that these downloads are taken from <a onclick="onPageClicked('https://github.com/roboticafacil/facilino_ota');" style="color:#1ec6c6">Robotica Facil's GitHub</a>, where you can find the source code of the application and old releases.&nbsp;</p>
					</li> 
					<li><strong>Facilino OTA Server Installer</strong>
					<p>Click on the installer to execute it. Your computer might give a warning as the Installation comes from an unknown source. Simply, give permision under the extended tab option. The Facilino OTA Server is complety safe and does not pose a threat to your computer. Indeed, Facilino OTA Server actually is a port to the <a onclick="onPageClicked('https://roboticafacil.es/facilino-ota');" style="color:#1ec6c6">Facilino</a> web page and Arduino-CLI. <a onclick="onPageClicked('https://roboticafacil.es/facilino-ota');" style="color:#1ec6c6">Facilino</a> web page generates code based on blocks, while Arduino CLI is the software that compiles your code so it is highly recommended to check that has been properly installed after the installation process finishes, including all boards and libraries required by Facilino, otherwise, compiling and uploading code might fail.</p>
					<p>When executing Facilino OTA Server Installer, you should see the following window:</p>
					<p><center>
					<img src="assets/images/Install/FacilinoOTAServer_install1.png" width="60%" alt="Facilino1" title=""/>
					</center></p>
					<p>Select the installation location, this is automatically set to your folder <i>C:\FacilinoOTAServer</i>. We recommend you not to change this path to avoid possible future administrative permissions.&nbsp;</p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install2.png" width="60%" alt="Facilino2" title=""/></center></p>
					<p>Then installation should start immediately and a progress bar should be visible. This installation might take a few minutes, particularly when installing Arduino libraries, because they will be first downloaded and then installed.</p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install3.png" width="60%" alt="Facilino3" title=""/></center></p>
					</li>
					<li><strong>Facilino OTA Server  ZIP (for non-admin users)</strong>
					<p>Unzip Facilino OTA Server and <i>cd</i> to the unzipped folder and type <i>config.bat</i> in the command shell. You should see on the shell output all arduino-cli commands required by Facilino to be able to compile and upload code to the supported boards and libraries.
					</li>
					<li><strong>Arduino CLI</strong>
					<p>Open the command shell and move to Facilino OTA Server directory (i.e.: <i>C:\FacilinoOTAServer</i>). Then, <i>cd</i> to <i>arduino-cli</i> folder and type <i>arduino-cli.exe core list</i>. You should see a list of supported boards:</p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install5.png" width="80%" alt="Facilino5" title=""/></center></p>
					<p>If you type: <i>arduino-cli.exe lib list</i> you should see a list of installed libraries:</p>
					<p><center><img src="assets/images/Install/FacilinoOTAServer_install6.png" width="100%" alt="Facilino6" title=""/></center></p>
					<p>If any of the previous steps fails or during compilation of a program there's a missing library, you can install them manually (see troubleshooting section).</p>
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