
<% 
	String strMode = request.getParameter("MODE");
%>
<form id="employee" name="employee" action="users">
	<table width="100%">
		<% if ("".equals(strMode)) { %>
		<tr><td>&nbsp;</td></tr>
		<tr>
			<td>
				<table id="tblRecordList"  width="100%" class="blackHeader">
					<thead>
						<tr>
							<th align="center">S. No.</th>
							<th align="center">Employee ID</th>
							<th align="center">Name</th>
							<th align="center">Designation</th>
							<th align="center">Department</th>
							<th align="center">Mobile</th>
							<th align="center">Email</th>
							<th align="center">Edit</th>
							<th align="center">Remove</th>
						</tr>
					</thead>
					<iterator id="lstEmployees" var="em" value="lstEmployees" status="counter">
						<tr id="ROW_${counter.index + 1}">
							<td align="center">${counter.index + 1}</td>
							<td align="center"><property value="#em[0]" /></td>
							<td align="center"><property value="#em[1]" /></td>
							<td align="center"><property value="#em[2]" /></td>
							<td align="center"><property value="#em[3]" /></td>
							<td align="center"><property value="#em[5]" /></td>
							<td align="center"><property value="#em[6]" /></td>
							<td class="label_text" align="center">
								<img src="images/edit.png" width="22" height="22" onclick="updateEmployee('${em[0]}')" style="cursor: pointer" />
							</td>
							<td class="label_text" align="center">
								<img src="images/delete.png" width="20" height="22" onclick="deleteEmployee('${em[0]}')" style="cursor: pointer" />
							</td>
						</tr>
					</iterator>
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
						<td class="req">Designation</td>
						<td><select id="ddlDesignation" name="ddlDesignation" headerKey="" headerValue="Select" list="lstDesignations" listKey="desigId" listValue="desigName" cssStyle="width: 97%;" value="%{objEmployee.desigId}" /></td>
					</tr>
					<tr>
						<td class="req">Department</td>
						<td><select id="ddlDepartment" name="ddlDepartment" headerKey="" headerValue="Select" list="lstDepartments" listKey="deptId" listValue="deptName" cssStyle="width: 97%;"  value="%{objEmployee.deptId}" /></td>
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
<script type="text/javascript">
	window.onload = function() {

		loadCssJsFile("js/employee.js", "JS");
	};
</script>