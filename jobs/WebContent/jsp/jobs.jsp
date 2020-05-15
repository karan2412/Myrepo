<%@page import="org.jmit.kg.jobs.util.ValueUtil"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="top.jsp" />
<% 
	String userType = ValueUtil.getStringValueNotNull(session.getAttribute("USERTYPE"));
	String strMode = request.getParameter("MODE");
	String errorMsg = (String) request.getAttribute("ERROR_MSG");
	String successMsg = (String) request.getAttribute("SUCCESS_MSG");
	errorMsg = errorMsg == null ? "" : errorMsg;
	successMsg = successMsg == null ? "" : successMsg;
%>
<h3 style="color: RED; text-align: center;" id="infoMessage"><%= !"".equals(errorMsg) ? errorMsg : (!"".equals(successMsg) ? successMsg : "") %></h3>
<form id="employee" name="employee" method="post">
	<input type="hidden" id="MODE" name="MODE" value="<%= strMode %>">
	<input type="hidden" id="JOBID" name="JOBID" value="${param.JOBID}">
	<table width="100%">
		<% if ("LIST".equals(strMode) || "APPLY_JOB".equals(strMode) ) { %>
		<tr><td>&nbsp;</td></tr>
		<tr>
			<td>
				<table id="tblRecordList" width="100%" class="blackHeader">
					<thead>
						<tr>
							<!-- <th align="center">S. No.</th> -->
							<th align="center">Job ID</th>
							<th align="center">Job Title</th>
							<!-- <th align="center">Job Description</th> -->
							<th align="center">Company</th>
							<th align="center">Date of Visit</th>
							<th align="center">Stream</th>
							<th align="center">Time and Venue</th>
							<th align="center">Action</th>
						</tr>
					</thead>
					<!-- List of User to be iterated -->
					<c:forEach items="${lstJobs}" var="u">
					    <tr>
					        <td><c:out value="${u.jobId}"/></td>
					        <td><c:out value="${u.jobTitle}"/></td>	
					        <%-- <td><c:out value="${u.jobDesc}"/></td> --%>
					        <td><c:out value="${u.company}"/></td>
					        <td><c:out value="${u.date}"/></td>
					        <td><c:out value="${u.stream}"/></td>
					        <td><c:out value="${u.timenvenue}"/></td>
					        <td align="center">
					        <% if ("A".equals(userType)) { %>
					        	<input type="button" class="cpsButton" id="btnUpdate" name="btnUpdate" value="Update" onclick="updateJobInfo('${u.jobId}');"/>
							<% } else { %>
					        	<input type="button" class="cpsButton" id="btnUpdate" name="btnUpdate" value="Apply" onclick="applyForJob('${u.jobId}');"/>
				        	<% } %>
					        </td>
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
			<% if ("A".equals(userType)) { %>
				<input type="button" id="btnAddEmployee" name="btnAddEmployee" value="Post a Job" class="cpsButton" onclick="addJobPosting();"/>&nbsp;&nbsp;
			<% } %>
				<input type="button" id="btnClose" name="btnClose" value="Close" class="cpsButton" onclick="closeToHome();"/>
			</td>
		</tr>
		<% } else { %>
		<tr>
			<td width="10%">&nbsp;</td>
			<td width="80%">
				<table class="blackHeader">
					<tr>
						<th colspan="4" style="text-align: center;">Job Posting</th>
					</tr>
					<tr>
						<td class="req">Job Title</td>
						<td colspan="3"><input type="text" id="txtJobTitle" name="txtJobTitle" style="width: 95%;"  value="${job.jobTitle}" /></td>
					</tr>
					<tr>
						<td class="req">Job Description</td>
						<td colspan="3"><textarea rows="3" id="txtJobDesc" name="txtJobDesc" style="width: 95%;">${job.jobDesc}</textarea></td>
					</tr>
					<tr>
						<td class="req">Company Name</td>
						<td colspan="3"><input type="text" id="txtCompany" name="txtCompany" style="width: 95%;"  value="${job.company}" /></td>
					</tr>
					<tr>
						<td class="req">Date of Visit</td>
						<td colspan="3"><input type="date" id="txtDate" name="txtDate" style="width: 95%;" value="${job.date}" /></td>
					</tr>
					<tr>
						<td class="req">Stream</td>
						<td colspan="3"><input type="text" id="txtStream" name="txtStream" style="width: 95%;" value="${job.stream}" /></td>
					</tr>
					<tr>
						<td class="req">Time and Venue</td>
						<td colspan="3"><input type="text" id="txttimenven" name="txttimenven" style="width: 95%;" value="${job.timenvenue}"/></td>
					</tr>
					<tr>
						<td colspan="4" style="text-decoration: underline; font-weight: bold;">Eligibility Criteria</td>
					</tr>
					<tr>
						<td class="req">Senior Secondary %</td>
						<td><input type="text" id="txtMarksSsc" name="txtMarksSsc" style="width: 95%;" value="${job.marksSsc}" /></td>
						<td class="req">Higher Secondary %</td>
						<td><input type="text" id="txtMarksHsc" name="txtMarksHsc" style="width: 95%;"  value="${job.marksHsc}" /></td>
					</tr>
					<tr>
						<td class="req">Graduation %</td>
						<td><input type="text" id="txtMarksGrad" name="txtMarksGrad" style="width: 95%;" value="${job.marksGrad}" /></td>
						<td class="req">Post Graduation %</td>
						<td><input type="text" id="txtMarkspGrad" name="txtMarkspGrad" style="width: 95%;"  value="${job.marksPGrad}"/></td>
					
					</tr>
					<tr>
						<td class="req">Allowed Backlogs</td>
						<td colspan="3"><input type="text" id="txtallow" name="txtallow" style="width: 95%;"  value="${job.backlogs}"/></td>
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

		loadCssJsFile("js/job.js", "JS");
	};
	
</script>
<jsp:include page="script.jsp" />
