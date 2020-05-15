function validateAndSubmit(type) {
	//Validation goes here ..
	arrMandatoryFields.length = 0;
	if ($('#txtJobId').val() == "") arrMandatoryFields.push('txtJobId');
	if ($('#txtJobTitle').val() == "") arrMandatoryFields.push('txtJobTitle');
	if ($('#txtJobDesc').val() == "") arrMandatoryFields.push('txtJobDesc');
	if ($('#txtCompany').val() == "") arrMandatoryFields.push('txtCompany');
	if ($('#txtDate').val() == "") arrMandatoryFields.push('txtDate');
	if ($('#txtStream').val() == "") arrMandatoryFields.push('txtStream');
	if ($('#txttimenven').val() == "") arrMandatoryFields.push('txttimenven');
	if ($('#txtMarksSsc').val() == "") arrMandatoryFields.push('txtMarksSsc');
	if ($('#txtMarksHsc').val() == "") arrMandatoryFields.push('txtMarksHsc');
	if ($('#txtMarksGrad').val() == "") arrMandatoryFields.push('txtMarksGrad');
	if ($('#txtallow').val() == "") arrMandatoryFields.push('txtallow');

	if (!checkMandatoryFields()) return false;
	
	if (type == 'ADD_JOB') {
		$('#MODE').val('ADD_DATA');
	} else if (type == 'UPDATE_JOB') {
		$('#MODE').val('UPDATE_DATA');
	}
	document.forms[0].action = 'jobs';
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

function applyForJob(jobId) {

	$('#MODE').val('APPLY_JOB');
	$('#JOBID').val(jobId);
	document.forms[0].action = 'jobs';
	document.forms[0].submit();
}
