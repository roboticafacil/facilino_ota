<?php
require_once('db.php');
require_once('website_translation.php');

?>
<!DOCTYPE html>
<html>
<?php include "head.php";
?>
<body>
<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:0em; margin-left: 0em; margin-right: 0em">

<section class="features18 popup-btn-cards cid-qYa5rQWOty" id="features">
<div class="container">
<!-- <h2 class="mbr-section-title pb-3 align-center mbr-fonts-style display-2">
Welcome to Facilino</h2>-->
<!-- <h3 class="mbr-section-subtitle display-5 align-center mbr-fonts-style mbr-light">
Learn how to program Arduino and ESP using Facilino with a full set of tutorials and exercises.</h3>-->
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
				<h3 class="mbr-section-subtitle display-5 align-center mbr-fonts-style mbr-light"><?php echo $website["SELECT_DOWNLOAD_VERSION"]; ?></h3>
            </div>
        </div>
    </div>
</section>

<div id="main">
<!-- <h1>Welcome to Facilino</h1>-->


<div class="row" style="padding-top:0.5em">
	<div class="card p-3 col-12 col-md-6 col-lg-4">
		<div class="card-wrapper ">
			<div class="card-img">
				<div class="mbr-overlay"></div>
				<div class="mbr-section-btn text-center"><a  onclick="onHomeFile('ota_gui/facilino_ota_win64_latest.exe');" class="btn btn-primary display-4"><?php echo $website["DOWNLOAD"]; ?></a></div>
				<a  onclick="onHomeFile('ota_gui/facilino_ota_win64_latest.exe');"><img src="assets/images/Install/windows-installer.jpg" alt="Installation" title=""></a>
			</div>
			<div class="card-box">
				<h4 class="card-title mbr-fonts-style display-7">
					<?php echo $website["WINDOWS_INSTALLER"]; ?></h4>
				<p class="mbr-text mbr-fonts-style align-left display-7">
					<?php echo $website["WINDOWS_10_11_64_BITS_INSTALLER_DESC"]; ?></p>
			</div>
		</div>
	</div>

	<div class="card p-3 col-12 col-md-6 col-lg-4">
		<div class="card-wrapper ">
			<div class="card-img">
				<div class="mbr-overlay"></div>
				<div class="mbr-section-btn text-center"><a  onclick="onHomeFile('ota_gui/Facilino_ota_win64_latest.zip');" class="btn btn-primary display-4"><?php echo $website["DOWNLOAD"]; ?></a></div>
				<a  onclick="onHomeFile('ota_gui/Facilino_ota_win64_latest.zip');"><img src="assets/images/Install/windows-zip.png" alt="Windows 64 bits (non-admin)" title=""></a>
			</div>
			<div class="card-box">
				<h4 class="card-title mbr-fonts-style display-7">
					<?php echo $website["WINDOWS_NON_ADMIN"]; ?></h4>
				<p class="mbr-text mbr-fonts-style align-left display-7">
					<?php echo $website["WINDOWS_10_11_64_BITS_NON_ADMIN_DESC"]; ?></p>
			</div>
		</div>
	</div>

	<!-- <div class="card p-3 col-12 col-md-6 col-lg-4">
		<div class="card-wrapper ">
			<div class="card-img">
				<div class="mbr-overlay"></div>
				<div class="mbr-section-btn text-center"><a  onclick="onHomeFile('ota_gui/FacilinoOTAGUI_Ubuntu_20_04_latest.tar.gz');" class="btn btn-primary display-4"><?php echo $website["DOWNLOAD"]; ?></a></div>
				<a  onclick="onHomeFile('ota_gui/FacilinoOTAGUI_Ubuntu_20_04_latest.tar.gz');"><img src="assets/images/Install/Ubuntu_20_04.png" alt="Ubuntu 64 bits" title=""></a>
			</div>
			<div class="card-box">
				<h4 class="card-title mbr-fonts-style display-7">
					<?php echo $website["UBUNTU_20_04"]; ?></h4>
				<p class="mbr-text mbr-fonts-style align-left display-7">
					<?php echo $website["UBUNTU_20_04_DESC"]; ?></p>
			</div>
		</div>
	</div>-->
</div>
</div>
</section>
<script>
function onHomeFile(filename)
{
	window.location=filename;
}
</script>
</div>
</div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>
