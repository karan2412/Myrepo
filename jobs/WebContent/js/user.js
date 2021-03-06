function validateAndSubmit(type) {
	//Validation goes here ..
	arrMandatoryFields.length = 0;
	if ($('#txtUserId').val() == "") arrMandatoryFields.push('txtUserId');
	if ($('#txtName').val() == "") arrMandatoryFields.push('txtName');
	if ($('#txtUserPassword').val() == "") arrMandatoryFields.push('txtUserPassword');
	if ($('#txtConfirmPassword').val() == "") arrMandatoryFields.push('txtConfirmPassword');
	if ($('#txtMobile').val() == "") arrMandatoryFields.push('txtMobile');
	if ($('#txtEmail').val() == "") arrMandatoryFields.push('txtEmail');
	if ($('#txtStream').val() == "") arrMandatoryFields.push('txtStream');
	if ($('#txtBranch').val() == "") arrMandatoryFields.push('txtBranch');
	if ($('#txtMarksSsc').val() == "") arrMandatoryFields.push('txtMarksSsc');
	if ($('#txtMarksHsc').val() == "") arrMandatoryFields.push('txtMarksHsc');
	if ($('#txtMarksGrad').val() == "") arrMandatoryFields.push('txtMarksGrad');

	if (!checkMandatoryFields()) return false;
	
	if (type == 'ADD_USER') {
		$('#MODE').val('ADD_DATA');
	} else if (type == 'UPDATE_USER') {
		$('#MODE').val('UPDATE_DATA');
	}
	document.forms[0].action = 'users';
	document.forms[0].submit();
}

function updateStudentInfo(userId) {

	$('#MODE').val('UPDATE_USER');
	$('#USERID').val(userId);
	document.forms[0].action = 'users';
	document.forms[0].submit();
}

function closeToList() {
	$('#MODE').val('LIST');
	if ($('#USERTYPE').val() == 'S') {
		document.forms[0].action = 'home';
	} else {
		document.forms[0].action = 'users';
	}
	document.forms[0].submit();
}
