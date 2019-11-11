<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="top.jsp" />
<% 
	String strMode = request.getParameter("MODE");
%>
<form id="employee" name="employee" action="users">
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
							<th align="center">Edit</th>
							<th align="center">Remove</th>
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
					        <td>Edit</td>
					        <td>Delete</td>
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
				<input type="button" id="btnAddEmployee" name="btnAddEmployee" value="Add Employee" class="cpsButton" onclick="addEmployee();"/>&nbsp;&nbsp;
				<input type="button" id="btnClose" name="btnClose" value="Close" class="cpsButton" onclick="closeToHome();"/>
			</td>
		</tr>
		<% } else { %>
		<tr>
			<td width="20%">&nbsp;</td>
			<td width="60%">
				<table class="blackHeader">
					<tr>
						<th colspan="2">Employee's Profile</th>
					</tr>
					<tr>
						<td width="30%">Employee ID</td>
						<td width="70%"><input type="text" id="txtEmpId" name="txtEmpId" cssStyle="width: 50%;" disabled="true" value="%{objEmployee.empId}" /></td>
					</tr>
					<tr>
						<td class="req">Name</td>
						<td><input type="text" id="txtName" name="txtName" cssClass="tooltipped" title="Enter Full Name" cssStyle="width: 95%;"  value="%{objEmployee.name}" /></td>
					</tr>
					<tr>
						<td class="req">Password</td>
						<td><input type="text" id="txtPassword" name="txtPassword" cssStyle="width: 95%;"  value="%{objEmployee.password}" /></td>
					</tr>
					<tr>
						<td>Date of Birth</td>
						<td><input type="text" id="txtDOB" name="txtDOB" cssStyle="width: 95%;"  value="%{objEmployee.dateOfBirth}"/></td>
					</tr>
					<tr>
						<td>Phone</td>
						<td><input type="text" id="txtPhone" name="txtPhone" cssStyle="width: 95%;"  value="%{objEmployee.telephone}" /></td>
					</tr>
					<tr>
						<td class="req">Mobile</td>
						<td><input type="text" id="txtMobile" name="txtMobile" cssStyle="width: 95%;" value="%{objEmployee.mobile}" /></td>
					</tr>
					<tr>
						<td class="req">E-mail</td>
						<td><input type="text" id="txtEmail" name="txtEmail" cssStyle="width: 95%;"  value="%{objEmployee.email}" /></td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<input type="button" class="cpsButton" id="btnSubmit" name="btnSubmit" value="Submit" onclick="validateAndSubmit('SAVE');" style="display: none;"/>
							<input type="button" class="cpsButton" id="btnUpdate" name="btnUpdate" value="Update" onclick="validateAndSubmit('UPDATE');" style="display: none;"/>
							<input type="button" class="cpsButton" id="btnCancel" name="btnCancel" value="Cancel" onclick="closeToList();"/>
						</td>
					</tr>
				</table>
			</td>
			<td width="20%">&nbsp;</td>
		</tr>
		<% } %>
	</table>
</form>
<jsp:include page="bottom.jsp" />
<script type="text/javascript">
	window.onload = function() {
		console.log('This is home !!');
	};
</script>
<jsp:include page="script.jsp" />
