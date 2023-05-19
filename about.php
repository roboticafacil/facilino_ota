<?php
require_once('db.php');
require_once('website_translation.php');
?>
<!DOCTYPE html>
<html>
<?php 
chdir("tutorial");
include "head.php"; 
include "tutorial_head.php";
?>
<body>
<div id="header"><?php chdir(".."); include "inc-header.php"; ?></div>
		<div id="content" style="margin-top:0em; margin-left: 0em; margin-right: 0em">

<div id="main">

<section class="mbr-section content4 cid-qYh0wRA9Kt" id="content4-4z">
	<div class="container">
		<div class="media-container-row">
			<div class=" title col-12 col-md-8">
				<h2 class="align-center pb-3 mbr-fonts-style display-2"/>
				<h2 class="align-center pb-3 mbr-fonts-style display-2"/>
				<h2 class="align-center pb-3 mbr-fonts-style display-2"/>
				<h2 class="align-center pb-3 mbr-fonts-style display-2">
				<!-- Change EXERCISE_TITLE with appropiate key -->
					<?php echo $website["ABOUT_US"];?></h2>
				<h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5">
				<!-- Change EXERCISE_TITLE_DESC with appropiate key -->
					<?php echo $website["ABOUT_US_DESC"];?></h3>
			</div>
		</div>
	</div>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                   <?php echo $website["DEVELOPMENT"];?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><ul>
			<li><?php echo $website["LEOPOLDO_ARMESTO"];?></li>
			<li><b>
			<?php echo $website["CONTRIBUTORS"];?></b>: Florentino Fernández, Lukas Bachschwell
			
			</li>
			</ul></div>
        </div>
    </div>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $website["PARTNERS_COLLABORATORS"];?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7">
			<ul>
			<li><?php echo $website["ROBOTICA_FACIL_ACK"];?></li>
			<li><?php echo $website["MARNI_ACK"];?></li>
			<li><?php echo $website["EDX_UPV_ACK"];?>
			<ul>
			<li><a href="https://www.edx.org/es/course/disena-fabrica-y-programa-tu-propio-robot">Diseña, fabrica y programa tu propio robot</a></li>
			<li><a href="https://www.upvx.es/courses/course-v1:edxorg+introduccion-al-internet-de-las-cosas-iot-2+v2/about">Introducción al Internet de las Cosas (IoT)</a></li>
			<li><a href="https://www.edx.org/course/introduction-to-the-internet-of-things">Introduction to Internet of Things</a></li>
			</ul></li>
			<li><?php echo $website["ECOTHINGS_ACK"];?>
				<ul>
				<li>Colegio Santiago Apóstol</li>
				<li>S.C. Wyliodrin SRL.</li>
				<li>Stando Ltd.</li>
				<li>Turan Erdogan Yilmaz Fen Lisesi</li>
				</ul>
			</li>
			</ul>
			</div>
        </div>
    </div>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $website["TRANSLATORS"];?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7">
			<ul>
				<li>Français: Tonny Scheuring, Maxime Samara</li>
				<li>Italiano: Emanuela Del Dottore</li>
				<li>Galego: Miguel Carlos de Castro Miguel</li>
				<li>Euskera: Zigor Aldazabal</li>
				<li>Dansk: Aske Klok</li>
				<li>Portugues: Joao Moura, Janir Rodrigues</li>
				<li>русский: Ruslan Bondar</li>
				<li>Deutsch: Lukas Bachschwell</li>
				<li>Español (latino): Ricardo Pinilla</li>
				<li>中国人: Dongmin Ma</li>
				<li>Nerderlands: Jamie Wubben</li>
			</ul>
			</div>
        </div>
    </div>
</section>

</div> <!-- main-->
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>