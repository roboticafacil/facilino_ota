<?php
	require_once("db.php");
			if (isset($_SESSION["username"]))
			{
				$query_user = "SELECT `user_role_id` from `users` where username='".$_SESSION["username"]."' and active=1";
				$result_user = mysqli_query($con,$query_user);
				$rows_user = mysqli_num_rows($result_user);
				if ($rows_user==1)
				{
					$row=mysqli_fetch_row($result_user);
					if ($row[0]==4)
					{
						?>
						<style type="text/css">
						.adBlock { width: 320px; height: 100px; }
						@media (min-width:500px) { .adBlock { width: 468px; height: 60px; } }
						@media (min-width:800px) { .adBlock { width: 728px; height: 90px; } }
						</style>
						<!-- <ins class="adsbygoogle adBlock"
						 style="display:block"
						 data-ad-client="ca-pub-5054503364495454"
						 data-ad-slot="4696503650"
						 data-ad-format="auto"
						 data-full-width-responsive="true"></ins>-->
						 <ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-5054503364495454"
     data-ad-slot="4696503650"></ins>
						 <script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
						<script>
							 (adsbygoogle = window.adsbygoogle || []).push({});
						</script>
						<?php
					}
				}
			}
			else
			{
				?>
				<style type="text/css">
						.adBlock { width: 320px; height: 90px; }
						@media (min-width:500px) { .adBlock { width: 468px; height: 60px; } }
						@media (min-width:800px) { .adBlock { width: 728px; height: 90px; } }
						</style>
						<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
						<ins class="adsbygoogle adBlock"
						 style="display:block"
						 data-ad-client="ca-pub-5054503364495454"
						 data-ad-slot="9346021067"
						 data-ad-format="auto"
						 data-full-width-responsive="true"></ins>
						<script>
							 (adsbygoogle = window.adsbygoogle || []).push({});
						</script>
				<?php
			}
			?>