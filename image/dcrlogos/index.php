<html>
	<head>
		<title>DCR Logos List</title>
        <meta name="robots" content="no-index">
<meta name="sitemap" content="no">
		<style type="text/css">
			caption
			{
				font-size: x-large; 
				color: #a64429;
				margin: 10px 0px 5px 0px;
				font-weight:bold;
			}
			tr:hover
			{
				background-color:#dddddd;
			}
			th
			{
				background-color:#cccccc;
				padding:10px;
				border-bottom: 3px double black;
			}
			td
			{
				padding:10px;
				border-bottom: 1px solid black;
			}
			a
			{
				text-decoration:none;
			}
		</style>
	</head>
	<body>
		<table align="center" cellspacing="0">
			<caption>DCR Logos List</caption>
			<thead>
				<tr>
					<th>Name</th>
					<th>Size</th>
					<th>Last Modified</th>
				</tr>
			</thead>
			<tbody>
				<?php
					$list_of_files = array_filter(scandir('.'), function($item){ return (!in_array(strtolower($item), array('index.php', 'thumbs.db')) && is_file($item)); });
					asort($list_of_files);
					foreach($list_of_files as $current_file)
					{
						echo '<tr>';
							echo '<td><a href="' . $current_file . '" target="_blank" onClick="ga(\'send\', \'event\', \'Image\', \'DCR LOGO\', \'' . $current_file . '\');" download>' . $current_file . '</a></td>';
							echo '<td align="right">' . format_bytes(filesize($current_file)) . '</a></td>';
							echo '<td align="right">' . file_last_modified($current_file) . '</a></td>';
						echo '</tr>';
					}
				?>
			</tbody>
		</table>
	</body>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-5549012-1', 'auto');
  ga('send', 'pageview');

</script><noscript>Your browser does not support JavaScript!</noscript>
</html>