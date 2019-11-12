function validateLogin(type) {
	arrMandatoryFields.length = 0;
	if ($('#txtUserId').val() == "") arrMandatoryFields.push('txtUserId');
	if ($('#txtPassword').val() == "") arrMandatoryFields.push('txtPassword');
	if (!checkMandatoryFields()) return false;
	
	document.forms[0].action = 'login';
	document.forms[0].submit();
}

function updateJobInfo(jobId) {

	$('#MODE').val('UPDATE_JOB');
	$('#JOBID').val(jobId);
	document.forms[0].action = 'jobs';
	document.forms[0].submit();
}

function addJobPosting() {

	$('#MODE').val('ADD_JOB');
	document.forms[0].action = 'jobs';
	document.forms[0].submit();
}

function closeToList() {
	document.forms[0].action = 'jobs?MODE=LIST';
	document.forms[0].submit();
}
