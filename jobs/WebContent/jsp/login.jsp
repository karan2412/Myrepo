<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="top.jsp" />
<% 
	String strMode = request.getParameter("MODE");
	String errorMsg = (String) request.getAttribute("ERROR_MSG");
	String successMsg = (String) request.getAttribute("SUCCESS_MSG");
	errorMsg = errorMsg == null ? "" : errorMsg;
	successMsg = successMsg == null ? "" : successMsg;
%>
<h3 style="color: RED; text-align: center;" id="infoMessage"><%= !"".equals(errorMsg) ? errorMsg : (!"".equals(successMsg) ? successMsg : "") %></h3>
<form id="employee" name="employee" method="post" action="login" onsubmit="return validateLogin();">
	<input type="hidden" id="MODE" name="MODE" value="<%= strMode %>">
	<input type="hidden" id="USERTOKEN" name="USERTOKEN" value="${param.USERTOKEN}">
	<input type="hidden" id="ROLLNO" name="ROLLNO" value="${param.ROLLNO}">
	<input type="hidden" id="USERNAME" name="USERNAME" value="${param.USERNAME}">
	<table width="100%">
		<tr>
			<td width="25%">&nbsp;</td>
			<td width="50%">
				<table class="blackHeader">
					<tr>
						<th colspan="4" style="text-align: center;">Login</th>
					</tr>
					<tr>
						<td width="40%" class="req">Roll Number</td>
						<td width="60%"><input type="text" id="txtroll" name="txtroll" style="width: 95%;" /></td>
					</tr>
					<tr>
						<td class="req">Password</td>
						<td><input type="password" id="txtPassword" name="txtPassword" style="width: 95%;" /></td>
					</tr>
					<tr>
						<td colspan="4" align="center">
							<input type="submit" class="cpsButton" id="btnSubmit" name="btnSubmit" value="Log In" />
							<input type="button" class="cpsButton" id="btnRegister" name="btnRegister" value="Register" onclick="register();"/>
						</td>
					</tr>
				</table>
			</td>
			<td width="25%">&nbsp;</td>
		</tr>
	</table>
</form>
<jsp:include page="bottom.jsp" />
<script type="text/javascript">
	window.onload = function() {

		loadCssJsFile("js/login.js", "JS");
	};
	
	
</script>
<jsp:include page="script.jsp" />
