<%@page import="org.jmit.kg.jobs.util.ValueUtil"%>
<%
	String userType = ValueUtil.getStringValueNotNull(session.getAttribute("USERTYPE"));
	String userName = ValueUtil.getStringValueNotNull(session.getAttribute("USERNAME"));
	String rollNo = ValueUtil.getStringValueNotNull(session.getAttribute("ROLLNO"));
	Boolean isLoggedIn = ValueUtil.getBooleanValue(session.getAttribute("IS_LOGGED_IN"));
	System.out.print(userType + " " + userName + " " + rollNo + " " + isLoggedIn );
%>
<div id="header">
	<div id="logo">
		<div id="logo_text">
			<!-- class="logo_colour", allows you to change the colour of the text -->
			<h1>
				<a href="home"><span class="logo_colour">JMIT - Electronic Placement Job Portal</span></a>
			</h1>
			<h2>Simpler. Faster. Paperless.</h2>
		</div>
	</div>
	<div id="menubar">
		<div style="float:left; color:white; padding-top: 10px;">
			<% if (isLoggedIn) { %>
			Welcome <%= userName %> (<%= rollNo %>) !!
			<% }%>
		</div>
		<ul id="menu">
			<!-- put class="selected" in the li tag for the selected page - to highlight which page you're on -->
			<li id="liHome"><a href="home">Home</a></li>
			<% if (isLoggedIn) { %>
				<% if ("A".equals(userType)) { %>
					<li id="liUsers"><a href="users?MODE=LIST">Students</a></li>
					<li id="liJobAppln"><a href="jobapplns?MODE=LIST">Job Applications</a></li>
				<% } else { %>
					<li id="liUsers"><a href="users?MODE=UPDATE_USER&ROLLNO=<%= rollNo %>">My Profile</a></li>
				<% } %>
				<li id="liJobs"><a href="jobs?MODE=LIST">Job Listing</a></li>
				<li id="liLogout"><a href="logout">Logout</a></li>
			<% } else { %>
				<li id="liRegister"><a href="users?MODE=ADD_USER">Register</a></li>
				<li id="liLogin"><a href="login">Login</a></li>
			<% } %>
		</ul>
	</div>
</div>
