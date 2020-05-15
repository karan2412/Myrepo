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
	<table width="100%">
		<% if ("LIST".equals(strMode)) { %>
		<tr><td>&nbsp;</td></tr>
		<tr>
			<td>
				<table id="tblRecordList"  width="100%" class="blackHeader">
					<thead>
						<tr>
							<th align="center">User ID</th>
							<th align="center">User Name</th>
							<th align="center">Mobile </th>
							<th align="center">Job ID</th>
							<th align="center">Job Title</th>
							<th align="center">Company</th>
							<th align="center">Date of Visit</th>
							<th align="center">Stream</th>
						</tr>
					</thead>
					<!-- List of User to be iterated -->
					<c:forEach items="${lstJobApplns}" var="u">
					    <tr>
					        <td><c:out value="${u.rollno}"/></td>
					        <td><c:out value="${u.name}"/></td>
					        <td><c:out value="${u.mobile}"/></td>
					        <td><c:out value="${u.jobId}"/></td>
					        <td><c:out value="${u.jobTitle}"/></td>
					        <td><c:out value="${u.company}"/></td>
					        <td><c:out value="${u.date}"/></td>
					        <td><c:out value="${u.stream}"/></td>
					    </tr>
					</c:forEach>
				</table>
			</td>
		</tr>
		<tr><td>&nbsp;</td></tr>
		<tr>
			<td align="center">
				<input type="button" id="btnClose" name="btnClose" value="Close" class="cpsButton" onclick="closeToHome();"/>
			</td>
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
