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
<form id="employee" name="employee" method="post">
	<input type="hidden" id="MODE" name="MODE" value="<%= strMode %>">
	<input type="hidden" id="USERID" name="USERID" value="${param.USERID}">
	<table width="100%">
		<% if ("LIST".equals(strMode)) { %>
		<tr><td>&nbsp;</td></tr>
		<tr>
			<td>
				<table id="tblRecordList"  width="100%" class="blackHeader">
					<thead>
						<tr>
							<!-- <th align="center">S. No.</th> -->
							<th align="center">User ID</th>
							<th align="center">Name</th>
							<th align="center">Phone</th>
							<th align="center">E Mail</th>
							<th align="center">Address</th>
							<th align="center">Stream</th>
							<th align="center">Branch</th>
							<th align="center">Update Info</th>
						</tr>
					</thead>
					<!-- List of User to be iterated -->
					<c:forEach items="${lstUsers}" var="u">
					    <tr>
					        <td><c:out value="${u.userId}"/></td>
					        <td><c:out value="${u.name}"/></td>
					        <td><c:out value="${u.phone}"/></td>
					        <td><c:out value="${u.email}"/></td>
					        <td><c:out value="${u.address}"/></td>
					        <td><c:out value="${u.stream}"/></td>
					        <td><c:out value="${u.branch}"/></td>
					        <td align="center"><input type="button" class="cpsButton" id="btnUpdate" name="btnUpdate" value="Update" onclick="updateStudentInfo('${u.userId}');"/></td>
					    </tr>
					</c:forEach>
				</table>
			</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td align="center">
				<input type="button" id="btnClose" name="btnClose" value="Close" class="cpsButton" onclick="closeToHome();"/>
			</td>
		</tr>
		<% } else { %>
		<tr>
			<td width="10%">&nbsp;</td>
			<td width="80%">
				<table class="blackHeader">
					<tr>
						<th colspan="4" style="text-align: center;">Student Registration</th>
					</tr>
					<tr>
						<td colspan="4" style="text-decoration: underline; font-weight: bold;">Personal Details</td>
					</tr>
					<tr>
						<td width="20%" class="req">User ID</td>
						<td width="30%"><input type="text" id="txtUserId" name="txtUserId" style="width: 95%;" <%= "UPDATE_USER".equals(strMode) ? "disabled" : ""%> value="${user.userId}" /></td>
						<td width="20%" class="req">Name</td>
						<td width="30%"><input type="text" id="txtName" name="txtName" title="Enter Full Name" style="width: 95%;"  value="${user.name}" /></td>
					</tr>
					<tr>
						<td class="req">Password</td>
						<td><input type="password" id="txtUserPassword" name="txtUserPassword" style="width: 95%;"  value="${user.password}" /></td>
						<td class="req">Confirm Password</td>
						<td><input type="text" id="txtConfirmPassword" name="txtConfirmPassword" style="width: 95%;"  value="${user.password}" /></td>
					</tr>
					<tr>
						<td>Address</td>
						<td colspan="3"><input type="text" id="txtAddress" name="txtAddress" style="width: 97.5%;"  value="${user.address}" /></td>
					</tr>
					<tr>
						<td class="req">Mobile</td>
						<td><input type="text" id="txtMobile" name="txtMobile" style="width: 95%;" value="${user.phone}" /></td>
						<td class="req">E-mail</td>
						<td><input type="text" id="txtEmail" name="txtEmail" style="width: 95%;"  value="${user.email}" /></td>
					</tr>
					<tr>
						<td colspan="4" style="text-decoration: underline; font-weight: bold;">Academic Details</td>
					</tr>
					<tr>
						<td class="req">Stream</td>
						<td><input type="text" id="txtStream" name="txtStream" style="width: 95%;" value="${user.stream}" /></td>
						<td class="req">Branch</td>
						<td><input type="text" id="txtBranch" name="txtBranch" style="width: 95%;"  value="${user.branch}" /></td>
					</tr>
					<tr>
						<td class="req">Senior Secondary (10)</td>
						<td><input type="text" id="txtMarksSsc" name="txtMarksSsc" style="width: 95%;" value="${user.marksSsc}" /></td>
						<td class="req">Higher Secondary (12)</td>
						<td><input type="text" id="txtMarksHsc" name="txtMarksHsc" style="width: 95%;"  value="${user.marksHsc}" /></td>
					</tr>
					<tr>
						<td>Graduation</td>
						<td><input type="text" id="txtMarksGrad" name="txtMarksGrad" style="width: 95%;" value="${user.marksGrad}" /></td>
						<td>Post Graduation</td>
						<td><input type="text" id="txtMarksPostGrad" name="txtMarksPostGrad" style="width: 95%;"  value="${user.marksPostGrad}" /></td>
					</tr>
					<tr>
						<td colspan="4" align="center">
							<input type="button" class="cpsButton" id="btnSubmit" name="btnSubmit" value="Submit" onclick="validateAndSubmit('<%= strMode %>');" />
							<input type="button" class="cpsButton" id="btnCancel" name="btnCancel" value="Cancel" onclick="closeToList();"/>
						</td>
					</tr>
				</table>
			</td>
			<td width="10%">&nbsp;</td>
		</tr>
		<% } %>
	</table>
</form>
<jsp:include page="bottom.jsp" />
<script type="text/javascript">
	window.onload = function() {

		loadCssJsFile("js/user.js", "JS");
	};
	
</script>
<jsp:include page="script.jsp" />
