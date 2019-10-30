function validate() {
	var pass = document.getElementById('fname').value;
	var passConfirm = document.getElementById('myfile').value;
	var passConfirmm = document.getElementById('key').value;
	
	if (passConfirm == "") {
		alert("please select a text file");
		return false;
	}
	else if (passConfirmm == "") {
		alert("please enter a valid key");
		return false;
	}
	else {
		return true;
	}
}