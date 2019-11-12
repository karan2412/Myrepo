	<script type="text/javascript">
		$(document).ready(function() {
			console.log(window.location.pathname);

			$('#menu li').removeClass('selected');
			if (window.location.pathname == '/jobs/users') {
				var mode = window.location.search.substr(1).split('=')[1];
				if (mode == 'ADD_USER') {
					$('#liRegister').addClass('selected');
				} else {
					$('#liUsers').addClass('selected');
				}
			} else if (window.location.pathname == '/cps/login.action' || window.location.pathname == '/cps/logout.action') {
				$('#liLogin').addClass('selected');
			} else if (window.location.pathname == '/jobs/jobs') {
				$('#liJobs').addClass('selected');
			} else if (window.location.pathname == '/jobs/home') {
				$('#liHome').addClass('selected');
			} else if (window.location.pathname == '/jobs/login') {
				$('#liLogin').addClass('selected');
			} else if (window.location.pathname == '/cps/changepassword.action') {
				$('#liChangePwd').addClass('selected');
			}
		});
		$('.tooltipped').qtip({
			content: { title: { text: 'Help Tips', button: true } },
		    show: 'hover',
		    style: { classes: 'ui-tooltip-shadow ui-tooltip-tipped' },
		    position: { my: 'top center', at: 'bottom center' }
		});
	</script>
</body>
</html>