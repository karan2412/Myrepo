	<script type="text/javascript">
		$(document).ready(function() {
			console.log(window.location.pathname);
			$('#menu li').removeClass('selected');
			if (window.location.pathname == '/jobs/users') {
				$('#liUsers').addClass('selected');
			} else if (window.location.pathname == '/cps/login.action' || window.location.pathname == '/cps/logout.action') {
				$('#liLogin').addClass('selected');
			} else if (window.location.pathname == '/cps/contactus.action') {
				$('#liContactUs').addClass('selected');
			} else if (window.location.pathname == '/cps/employee.action') {
				$('#liEmployee').addClass('selected');
			} else if (window.location.pathname == '/cps/claimapplication.action') {
				$('#liApplyClaim').addClass('selected');
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