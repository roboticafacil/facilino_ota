<?php require_once('website_translation.php'); ?>
<section once="" class="cid-qYrSHhW5Ux" id="footer7-ai" style="background-color:#2e2e2e">
	<div class="container">
		<div class="media-container-row align-center mbr-white" style="flex-direction: column; justify-content: center; align-items: center; list-style: none; display: flex; justify-content: center; flex-wrap: wrap; padding: 0; margin-bottom: 0;">
			<div class="row row-links">
				<ul class="foot-menu" style="list-style: none; display: flex; justify-content: center; flex-wrap: wrap; padding: 0; margin-bottom: 0;">
				<?php 
					if (isset($_SESSION["username"]))
					{
						echo '<li><a onclick="english()"><img src="img/flags/united-kingdom.png" title="English"></img></a>&nbsp;&nbsp;<a onclick="spanish()"><img src="img/flags/spain.png" title="Español"></img></a></li>';
					}
				?>
					<li class="foot-menu-item mbr-fonts-style display-7" style="padding: 0 1rem 1rem 1rem;"><a class="text-white mbr-bold" onclick="about.php;"><?php echo $website["ABOUT_US"];?></a></li>
					<li class="foot-menu-item mbr-fonts-style display-7"><a class="text-white mbr-bold" onclick="onPageClicked('https://roboticafacil.es');"><?php echo $website["SHOP"];?></a></li>
				</ul>
			</div>
			<div class="row social-row" >
			
				<div class="social-list align-right pb-2" style="padding-left: 0; margin-bottom: 0; list-style: none; display: flex; flex-wrap: wrap; justify-content: flex-end; -webkit-justify-content: flex-end; font-size: 1.5rem;
  color: #ffffff;">
				<div class="soc-item">
					
					<a onclick="onPageClicked('https://twitter.com/RoboticaFacil');">
                            <span class="socicon-twitter socicon mbr-iconfont mbr-iconfont-social"></span>
                        </a>&nbsp;&nbsp;
                    </div><div class="soc-item">
                        <a onclick="onPageClicked('https://www.facebook.com/Robótica-Fácil-1183498285099194');">
                            <span class="mbr-iconfont mbr-iconfont-social socicon-facebook socicon"></span>
                        </a>
                    </div></div>
            </div>
            <div class="row row-copirayt">
                <p class="mbr-text mb-0 mbr-fonts-style mbr-white align-center display-7"><?php echo $website["COPYRIGHT"];?>
                </p>
            </div>
        </div>
    </div>
</section>
<script>
function onPageClicked(page)
{
	window.open(page, '_blank');
	if (window.webHelper.pageClicked !== undefined)
		window.webHelper.pageClicked(page);
}
function english()
{
	window.location.href="index.php?lang=en-GB";
}
function spanish()
{
	window.location.href="index.php?lang=es-ES";
}
</script>