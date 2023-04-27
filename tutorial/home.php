<?php
?>
<section class="features18 popup-btn-cards cid-qYa5rQWOty" id="features">
    <div class="container">
		<h3/>
        <h2 class="mbr-section-title pb-3 align-center mbr-fonts-style display-2">
            <?php echo $website["INTRODUCTION_FACILINO"]; ?>
			</h2>
		<h3 class="mbr-section-subtitle display-5 align-center mbr-fonts-style mbr-light">
            <?php echo $website["INTRODUCTION_FACILINO_DESC"]; ?></h3>

		<div class="row pt-5 ">
		
			<div class="card p-3 col-12 col-md-6 col-lg-4">
                <div class="card-wrapper ">
                    <div class="card-img">
                        <div class="mbr-overlay"></div>
                        <div class="mbr-section-btn text-center"><a onclick="onHomeFile('Electronics.php');" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
                        <a onclick="onHomeFile('Electronics.php');"><img src="tutorial/assets/images/mbr-676x450.jpg" alt="LED Race" title=""></a>
                    </div>
                    <div class="card-box">
                        <h4 class="card-title mbr-fonts-style display-7">
                            <?php echo $website["ELECTRONICS"]; ?></h4>
                        <p class="mbr-text mbr-fonts-style align-left display-7">
                            <?php echo $website["ELECTRONICS_DESC"]; ?></p>
                    </div>
                </div>
            </div>
		
			<div class="card p-3 col-12 col-md-6 col-lg-4">
                <div class="card-wrapper ">
                    <div class="card-img">
                        <div class="mbr-overlay"></div>
                        <div class="mbr-section-btn text-center"><a onclick="onHomeFile('Exercises.php');" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
                        <a onclick="onHomeFile('Exercises.php');"><img src="tutorial/assets/images/programmer.jpg" alt="LED Race" title=""></a>
                    </div>
                    <div class="card-box">
                        <h4 class="card-title mbr-fonts-style display-7">
                            <?php echo $website["EXERCISES"]; ?></h4>
                        <p class="mbr-text mbr-fonts-style align-left display-7">
                            <?php echo $website["EXERCISES_DESC"]; ?></p>
                    </div>
                </div>
            </div>
			
			
        </div>
    </div>
</section>

<script>
	if (localStorage.getItem("language")===undefined || localStorage.getItem("language")===null)
		localStorage.setItem('language', 'en-GB');
	window.FacilinoLanguage = localStorage.getItem("language");
	$("#language").val(window.FacilinoLanguage);
	function onHomeFile(html_file)
	{
		window.location='tutorial/'+html_file;
	}
</script>
<?php			
?>