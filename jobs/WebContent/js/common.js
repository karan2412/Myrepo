var COMMON_AJAX_TYPE = 'POST';
var COMMON_AJAX_URL  = 'commonajax.action';// + '?_=' + Math.random();
var COMMON_AJAX_DATA_TYPE = 'text';

var arrMandatoryFields = new Array();
var arrErrorMessages = new Array();
var arrDisableField = new Array();


/**
 * @author Sarthak
 * @param msg
 * @param alertType
 * @remarks Shows message on top of page. Pass msg type as: [E = Error], [W = Warning], [S = Success], [I = Information], [P = Please Wait.. Processing.], [Default= Alert]
 * Pass an array containing various strings (messages) to display multiple messages in a list format.
 */
function showErrorMessage(msg, alertType) {
	alert(msg);
	return false;
	$("#divErrContainer").css('border-color', '');
	var head;
	var color;
	var actMsg;
	if (msg == '') {
		$(".errMsgContainer").hide();	
	} else {
		switch (alertType) {
			case 'E':
				head = '<font style=color:red;>Error !!!<\/font>'; 
				color = '#f9f0f0';
				$("#divErrContainer").css('border-color', 'RED');
				break;
			case 'W':
				head = 'Warning !!!'; color = '#fff5cc'; break;
			case 'S':
				head = 'Success !!!'; color = '#d6f7e2'; break;
			case 'I':
				head = 'Important !!!'; color = '#e2f5f7'; break;
			case 'P':
				head = 'Please Wait ...'; color = '#e7e7e7'; break;
			default:
				head = 'Alert !!!'; color = '#fff5cc';
		}
		
		if (msg instanceof Array) {
			if (msg.length == 1) {
				actMsg = msg[0];
			} else {
				actMsg = '<ul>';
				for (var i in msg) {
					actMsg += '<li>'+msg[i]+'</li>';
				}
				actMsg += '</ul>';
			}
		} else {
			actMsg = msg;
		}
		
		$("#divErrContainer").css('background-color', color);
		$(".errMsgHeading").html(head);
		$(".errMsgContent").html("<font style='font-size:14px;'>" + actMsg + "<\/font>");
		$(".errMsgContainer").show();	
	}
}

function setColors(object, styleclass) {
    object.className = styleclass;
}

function loadCssJsFile(filePath, fileType) {
	if ('JS' == fileType.toUpperCase()) {
		$.getScript(filePath);		
	} else if ('CSS' == fileType.toUpperCase()) {
	   $("head").append("<link>");
	   var css = $("head").children(":last");
	   css.attr({
	     rel:  "stylesheet",
	     type: "text/css",
	     href: filePath
	  });
	}
}

function getValue(val) {
    if (val != null && val != undefined && val != 'null' && val != 'undefined') {
        return trimString(val);
    } else {
        return '';
    }
}

function trimString(str) {
    try {
        if(str != '') {
            str = str.replace(/^\s+/, '');
            str = str.replace(/\s+$/, '');
        }
    } catch (err) {}
    return str;
}

function trimFieldValue(obj) {
	obj.value = trimString(obj.value);
}

function changeCase(obj, cas) {
	if (cas == "U" || cas == "u") {
		obj.value = obj.value.toLocaleUpperCase();
	} else if (cas == "L" || cas == "l") {
		obj.value = obj.value.toLocaleLowerCase();
	} else {
		obj.value = obj.value;
	}
}

function maxLengthTextArea(field, maxChars) {
      if(field.value.length >= maxChars) {
         event.returnValue=false;
         return false;
      }
}  

function maxLengthPasteTextArea(field,maxChars) {
      event.returnValue=false;
      if((field.value.length +  window.clipboardData.getData("Text").length) > maxChars) {
        return false;
      }
      event.returnValue=true;
}

function checkMaxLength(textareaID, maxLength){
    currentLengthInTextarea = $("#"+textareaID).val().length;

	if (currentLengthInTextarea > (maxLength)) { 
		// Trim the field current length over the maxlength.
		$("#"+textareaID).val($("#"+textareaID).val().slice(0, maxLength));
	}
}

function getReturnValueIfNull(val, returnVal) {
    if (val != null && val != undefined && val != 'null' && val != 'undefined') {
        return trimString(val);
    } else {
        return returnVal;
    }
}

function numbersonly(e) {
	var unicode=e.charCode? e.charCode : e.keyCode;	

	if (unicode != 8 && unicode != 9 && unicode != 44 &&  unicode != 45 && unicode != 46 && unicode != 127) { 
		// if the key isn't the backspace key (which we should allow)
		if (unicode < 48 || unicode > 57) // if not a number
		{
			return false; // disable key press
		}		
	}
}

function wholeNumbersOnly(e) {
	var unicode = e.charCode;	
	var keyCode = e.keyCode;

	if ((unicode >= 48 && unicode <= 57) || keyCode == 8 || keyCode == 9
			|| keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40
			|| keyCode == 46 || keyCode == 35 || keyCode == 36
			|| keyCode == 116)
		return true;
	else
		return false;
}

function navigationKeysOnly(e) {
	var keyCode = e.keyCode;

	if (keyCode == 8 || keyCode == 9 												//8 - backspace, 9 - tab 
			|| keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40		//37-left, 38-up, 39-right, 40-down
			|| keyCode == 46 || keyCode == 35 || keyCode == 36						//46-delete, 35-end, 36-home
			|| keyCode == 116)														//116-f5
		return true;
	else
		return false;
}

function numericDigitUpto(e, n) {
	var unicode=e.charCode? e.charCode : e.keyCode;	

	if (unicode != 8 && unicode != 9 && unicode != 44 && unicode != 46 && unicode != 127) { 
		// if the key isn't the backspace key (which we should allow)
		if (unicode < 48 || unicode > 57) // if not a number
		{	
			return false; // disable key press
		} else {
			var temp = 58 - (9 - n);
			if (unicode >= temp) {
				return false;
			}
		}		
	}
}

function numericValueUpto(obj, maxVal) {
	if ($.isNumeric(obj.value)) {
		if (parseInt(obj.value) > maxVal) {
			obj.value = '';
		}
	} else {
		obj.value = '';
	}
}

function numericValueBetween(obj, minVal, maxVal) {
	if ($.isNumeric(obj.value)) {
		if (obj.value < minVal || obj.value > maxVal) {
			obj.value = '';
			showErrorMessage('Entered value is out of range, Please enter valid value !!!', 'E');
		} else {
			showErrorMessage('', '');
		}
	} else {
		obj.value = '';
	}
}

function isAlphaNumericWithSpaceStartingWithAlphaNum(obj) {//[a-zA-Z0-9][ a-zA-Z0-9]*
	showErrorMessage("", "");
	var val = obj.value;
    var pattern = "^[a-zA-Z0-9][ a-zA-Z0-9]*$";
    var regex = new RegExp(pattern);
    if (regex.test(val)) {
        return true;
    } else {
    	obj.value = '';
    	showErrorMessage("Provide valid Alphanumeric value !!!","E");
        return false;
    }	
}

function isHexadecimalValue(obj) {	//[a-fA-F0-9]
	showErrorMessage("", "");
	var val = obj.value;
    var pattern = "^[a-fA-F0-9]*$";
    var regex = new RegExp(pattern);
    if (regex.test(val)) {
        return true;
    } else {
    	obj.value = '';
    	showErrorMessage("Provide valid Hexadecimal value !!!","E");
        return false;
    }	
}

function isHexValue(e) {
	var unicode=e.charCode? e.charCode : e.keyCode;	

	if (unicode != 8 && unicode != 9 && unicode != 44 && unicode != 46 && unicode != 127) { 
		// if the key isn't the backspace key (which we should allow)
		if ((unicode >= 48 && unicode <= 57) || (unicode >= 65 && unicode <= 70) || (unicode >= 97 && unicode <= 102)) // IF NOT HEX
		{	
			return true; // disable key press
		} else {
			return false;
		}
	}
	return true;
}

function isAlphaNumeric(obj) {//[a-zA-Z0-9]*
	showErrorMessage("", "");
	var val = obj.value;
    var pattern = "^[a-zA-Z0-9]*$";
    var regex = new RegExp(pattern);
    if (regex.test(val)) {
        return true;
    } else {
    	obj.value = '';
    	showErrorMessage("Provide valid Alphanumeric value !!!","E");
        return false;
    }	
}

function isAlphaNumericStartingWithAlpha(obj) {//[a-zA-Z][a-zA-Z0-9]*
	showErrorMessage("", "");
	var val = obj.value;
    var pattern = "^[a-zA-Z][a-zA-Z0-9]*$";
    var regex = new RegExp(pattern);
    if (regex.test(val)) {
        return true;
    } else {
    	obj.value = '';
    	showErrorMessage("Provide valid Alphanumeric value starting with an Alphabet !!!","E");
        return false;
    }
}

function isFloatNumber(obj) {//^[0-9][0-9]*(.[0-9])?[0-9]*$
	showErrorMessage("", "");
	var val = obj.value;
    var pattern = "^[0-9][0-9]*(.[0-9])?[0-9]*$";
    var regex = new RegExp(pattern);
    if (regex.test(val)) {
        return true;
    } else {
    	obj.value = '';
    	showErrorMessage("Provide valid Float Number !!!","E");
        return false;
    }
}

function isAlphaNumericStartingWithHiphen(obj) {//[a-zA-Z][-a-zA-Z0-9]*
	showErrorMessage("", "");
	var val = obj.value;
    var pattern = "^[a-zA-Z][-a-zA-Z0-9]*$";
    var regex = new RegExp(pattern);
    if (regex.test(val)) {
        return true;
    } else {
    	obj.value = '';
    	showErrorMessage("Provide valid Alphanumeric value !!!","E");
        return false;
    }
}

function isAlphaNumericWithSpace(obj) {//[a-zA-Z][ a-zA-Z0-9]*
	showErrorMessage("", "");
	var val = obj.value;
    var pattern = "^[a-zA-Z][ a-zA-Z0-9]*$";
    var regex = new RegExp(pattern);
    if (regex.test(val)) {
        return true;
    } else {
    	obj.value = '';
    	showErrorMessage("Provide valid Alphanumeric value !!!","E");
        return false;
    }
}

function validateAlphaNumeric(obj, alphaLength, numLength) {
	showErrorMessage("", "");
	var val = obj.value;
    var pattern = "^[a-zA-Z]{"+alphaLength+"}[0-9]{"+numLength+"}$";
    var regex = new RegExp(pattern);
    if (regex.test(val)) {
        return true;
    } else {
    	obj.value = '';
    	showErrorMessage("Provide valid Alphanumeric value ("+alphaLength+" alpha and "+numLength+" number) !!!","E");
        return false;
    }
}

function checkRegex(obj, regPattern) {
	var val = obj.value;
	if (val != '') {
		showErrorMessage("", "");
	    var regex = new RegExp(regPattern);
	    if (regex.test(val)) {
	        return true;
	    } else {
	    	obj.value = '';
	    	showErrorMessage("Please provide valid value !!!","E");
	        return false;
	    }
	}
}

function CheckNumber(obj) {
    var DigitsAfterDecimal = 3;
    if (obj.value == '') {
        return false;
    }
    else {

        if (isNaN(obj.value)) {
            return false;
        }
        else {
            var val = obj.value;
            if (val.indexOf(".") >  - 1) {

                if (val.length - (val.indexOf(".") + 1) > DigitsAfterDecimal) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                if (parseInt(val) > 0) {
                    return true;
                }
                else {
                    alert("Value must be greater than 0");

                    return false;
                }
            }
        }
    }
}

function limitlength(obj, length) {
	var maxlength=length;
	if (obj.value.length>maxlength)
		obj.value=obj.value.substring(0, maxlength);
}

function disableKeys() {
	var keyCode=(document.all)?event.keyCode:e.which;
	if(keyCode==9) {
		window.event.returnValue=true; // for allowing TAB
	} else {
		window.event.returnValue=false; 
	}
}

function createArrayFromString(strData) {
    var arr = new Array();
    var dataRows = strData.split("@ROW@");

    for(var i=0; i < dataRows.length-1; i++) {
        if(dataRows[i] != '') {
        	arr.push([dataRows[i],dataRows[i]]);
        }
    }   
    return arr;
}

function createArrayFromRowColString(strData) {
    var arr = new Array();
    var dataRows = strData.split(ROW_DELIMITER);
    var arrCol = new Array();
    if (dataRows.length == 1) {
    	return dataRows[0].split(COL_DELIMITER);
    }
    for(var i=0; i < dataRows.length; i++) {
    	arrCol = dataRows[i].split(COL_DELIMITER);
       	arr.push(arrCol);
    }   
    return arr;
}


function populateSelect(el, items, isDefaultVal) {
	try {
		el.options.length = 0;
		if (isDefaultVal) el.options[0] = new Option('Select', '');

	    $.each(items, function () {
	        el.options[el.options.length] = new Option(this[1], this[0]);
	    });
	} catch (err) { }
}


function deleteIndexedRecord(tableId, recIndex) {
	document.getElementById(tableId).deleteRow(recIndex);
}

function deleteRecords(tableId, uptoRecords) {
	var table = document.getElementById(tableId);
	
	for (var i = table.rows.length-1; i >= uptoRecords; i--) {
    	table.deleteRow(i);
	}
}

function setGridData(tableId, hiddenId, fromRow) {
	var table = document.getElementById(tableId);
	var _GridData = '';
    for (var i = fromRow; i < table.rows.length; i++) {
    	for (var j = 0; j < table.rows[i].cells.length; j++) {
    		if (table.rows[i].cells[j].childNodes[0].nodeName == 'IMG') {
    			_GridData += i;
    		} else if (table.rows[i].cells[j].childNodes[0].nodeName == '#text') {
    			_GridData += table.rows[i].cells[j].innerHTML;
    		} else {
    			_GridData += table.rows[i].cells[j].childNodes[0].value;	
    		}
    		
    		if (j != (table.rows[i].cells.length-1)) {
        		_GridData += COL_DELIMITER;	
        	}	
    	}
    	if (i != (table.rows.length-1)) {
    		_GridData += ROW_DELIMITER;	
    	}
    }
	$('#'+hiddenId).val(_GridData);
}

function setGridDataToHidden(tableId, hiddenId) {
	var table = document.getElementById(tableId);
	var _GridData = '';
    for (var i = 2; i < table.rows.length; i++) {
    	for (var j = 0; j < table.rows[i].cells.length; j++) {
    		if (table.rows[i].cells[j].childNodes[0].nodeName == 'IMG') {
    			_GridData += (i-1);
    		} else if (table.rows[i].cells[j].childNodes[0].nodeName == '#text') {
    			_GridData += table.rows[i].cells[j].innerHTML;
    		} else {
    			_GridData += table.rows[i].cells[j].childNodes[0].value;	
    		}
    		
    		if (j != (table.rows[i].cells.length-1)) {
        		_GridData += COL_DELIMITER;	
        	}	
    	}
    	if (i != (table.rows.length-1)) {
    		_GridData += ROW_DELIMITER;	
    	}
    }
	$('#'+hiddenId).val(_GridData);
}

function createArrayRowCol(strData) {
    var arr = new Array();
    var dataRows = strData.split(ROW_DELIMITER);
    
    for(var i=0; i < dataRows.length; i++) {
        if(dataRows[i] != '') {
            var tempDataColumns =  dataRows[i].split(COL_DELIMITER);
            arr.push([tempDataColumns[0],tempDataColumns[1]]);
        }
    }   
    return arr;
}

function createArrayRowCol(strData, indexForValue, indexForText) {
    var arr = new Array();
    var dataRows = strData.split(ROW_DELIMITER);

    for(var i=0; i < dataRows.length; i++) {
        if(dataRows[i] != '') {
            var tempDataColumns =  dataRows[i].split(COL_DELIMITER);
            arr.push([tempDataColumns[indexForValue],tempDataColumns[indexForText]]);
        }
    }   
    return arr;
}


function disableFormElements() {
	var eles = document.forms[0].elements;

	try {
		for (var i = 0; i < eles.length; i++) {
			if (eles[i].type == 'text' || eles[i].type == 'select-one' || eles[i].type == 'textarea' || eles[i].type == 'checkbox' || eles[i].type == 'select-multiple' || eles[i].type == 'radio' || eles[i].type == 'file') { //Do not disable file fields --
				if ($('#MODE').val() == FORM_MODE_VIEW || $('#MODE').val() == FORM_MODE_ICM) {
					eles[i].disabled = true;
				} else {
					if ((eles[i].type == 'checkbox' && eles[i].id.indexOf('C__') != -1) || eles[i].type == 'file') {
						
					} else {
						eles[i].disabled = true;	
					}
				}
			}
		}
	} catch (err) {}
}

function enableFormElements() {
	var eles = document.forms[0].elements;

	try {
		for (var i = 0; i < eles.length; i++) {
			if (eles[i].type == 'select-one' || eles[i].type == 'text' || eles[i].type == 'textarea' || eles[i].type == 'checkbox') {
				try {
					if ($(eles[i]).is(":disabled")) {
						arrDisableField.push(eles[i]);
						eles[i].disabled = false;
					}					
				} catch (err) {}
			}
		}
	} catch (err) {}
}

function disableEnabledFields() {
	try {
		for (var i = 0; i < arrDisableField.length; i++) {
			$(arrDisableField[i]).attr('disabled', true);
		}
		arrDisableField.length = 0;
	} catch (err) {}
}

function enableTableElements(tableId) {
	$("#"+tableId).find("input,button,select").attr("disabled", false);
}

function disableTableElements(tableId) {
	$("#"+tableId).find("input,button,select").attr("disabled", true);
}

function show_hide_column(tableId, col_no, do_show) {
	var tbl = document.getElementById(tableId);
	var col = tbl.getElementsByTagName('col')[col_no];
	if (col) {
		col.style.visibility = do_show ? "" : "collapse";
	}
}

function padString(val, len) {
	val = String(val);
	len = len || 2;
	while (val.length < len) val = "0" + val;
	return val;
}

function convertMinutesToTime(minutes) {
	var hours = minutes / 60;
	var mins = minutes % 60;
	
	return (padString(parseInt(hours),2) + ":" + padString(mins,2) + ":" + "00");
}

function multipleOfTen(obj) {
	var val = obj.value;
	
	if(val % 10 != 0) {
		obj.value = '';
	}
}

function getFormElementsID() {
	var eles = document.forms[0].elements;
	var _IDs = '';
	try {for (var i = 0; i < eles.length; i++) {try {_IDs += eles[i].id + COL_DELIMITER;} catch (err) {}}} catch (err) {}
	alert(_IDs);
}

function getTimeDiff(endDate, startDate) {
	try {
	    var difference = endDate.getTime() - startDate.getTime();
	    
	    var daysDifference = Math.floor(difference/1000/60/60/24);
	    difference -= daysDifference*1000*60*60*24;
	    var hoursDifference = Math.floor(difference/1000/60/60);
	    difference -= hoursDifference*1000*60*60;
	    var minutesDifference = Math.floor(difference/1000/60);
	    difference -= minutesDifference*1000*60;
	    var secondsDifference = Math.floor(difference/1000);
	    
	    return (padString(hoursDifference,2) + ':' + padString(minutesDifference,2) + ':' + padString(secondsDifference,2));
	} catch(err) {
		return '00:00:00';
	}
}

function ajaxTrimAndSession(data) {
	if (data.indexOf("X-LOGIN-PAGE-X") >= 0 || data.indexOf("meta http-equiv") >= 0) {
		alert('Oops ! your session has expired, system is redirecting you to the Login Page. Please login again !!!');
		document.forms[0].action = 'login.action';
		document.forms[0].submit();
	}
	return $.trim(data);
}

function convertTimeToSeconds(time) {
	return (parseInt(time.split(":")[0]*3600)+parseInt(time.split(":")[1]*60)+parseInt(time.split(":")[2])); 
}

function convertSecondsToTime(seconds) {
	var hour=parseInt(seconds/3600);
	var min=parseInt((seconds%3600)/60);
	var sec=((seconds%3600)%60);
	return (new Date(0,0,0,hour,min,sec)).format('HH:MM:ss');
}

function calTimeDiff(startTime, endTime) {
	return convertSecondsToTime(convertTimeToSeconds(endTime)- convertTimeToSeconds(startTime));
}

function closeToHome() {
	document.forms[0].action = 'home.action';
	document.forms[0].submit();
}

function funcClose() {
	/*var referer = document.referrer;
	var currentLocation = window.location.href
	var action = '';
	if (referer != '') {
		if (referer.indexOf('?') == -1) {
			action = referer.substring(referer.lastIndexOf('/')+1);	
		} else {
			action = referer.substring(referer.lastIndexOf('/')+1,'?');	
		}	
	}*/
	if (CLOSE_ACTION != '') {
		if (CLOSE_ACTION.indexOf('?') == -1) {
			window.location.href = CLOSE_ACTION + "?OWASP_IFAMS="+owasp;	
		} else {
			window.location.href = CLOSE_ACTION + "&OWASP_IFAMS="+owasp;
		}
	} else {
		window.location.href = "home.action?OWASP_IFAMS="+owasp;
	}
}

function getStateList(stateObjId, countryId, stateId) {
	try {
		showErrorMessage('', '');
		if (countryId != '' && countryId == 1) {
			var params = {
				CALL_ACTION : 'STATE_LIST',
				COUNTRY_ID : countryId,
				OWASP_IFAMS : owasp
			};
			$.ajax({
				type : COMMON_AJAX_TYPE,
				url : COMMON_AJAX_URL,
				dataType : COMMON_AJAX_DATA_TYPE,
				async: false,
				data : params,
				success : function(data) {
					data = ajaxTrimAndSession(data);
					if (data.indexOf(ERROR_MSG) == -1) {
						if (data != "") {
							var arrTmp = createArrayRowCol(data, 0, 2);
							populateSelect(document.getElementById(stateObjId), arrTmp, true);
							$('#'+stateObjId).val(stateId);
						} else {
							populateSelect(document.getElementById(stateObjId), new Array(), true);
							showErrorMessage('No states are defined for this country', 'E');					
						}
					}
				}
			});
		} else {
			showErrorMessage('Please provide State, District & City in Address field !!!', 'A');
		}
	} catch (err) {  }
}

function getDistrictList(districtObjId, stateId, districtId) {
	try {
		showErrorMessage('', '');
		if (stateId != '') {
			var params = {
				CALL_ACTION : 'DISTRICT_LIST',
				APPROVAL_ID : $('#APPROVAL_ID').val(),
				STATE_ID 	: stateId,
				OWASP_IFAMS : owasp
			};
			$.ajax({
				type : COMMON_AJAX_TYPE,
				url : COMMON_AJAX_URL,
				dataType : COMMON_AJAX_DATA_TYPE,
				async: false,
				data : params,
				success : function(data) {
					data = ajaxTrimAndSession(data);
					if (data.indexOf(ERROR_MSG) == -1) {
						if (data != "") {
							var arrTmp = createArrayRowCol(data, 0, 2);
							populateSelect(document.getElementById(districtObjId), arrTmp, true);
							$('#'+districtObjId).val(districtId);
						} else {
							populateSelect(document.getElementById(districtObjId), new Array(), true);
							showErrorMessage('No district are defined for this state', 'E');
						}
					}
				}
			});
		}
	} catch (err) {  }
}

function getCityList(cityObjId, districtId, cityId) {
	try {
		//showErrorMessage('', '');
		if (districtId != '') {
			var params = {
				CALL_ACTION : 'CITY_LIST',
				APPROVAL_ID : $('#APPROVAL_ID').val(),
				DISTRICT_ID : districtId,
				OWASP_IFAMS : owasp
			};
			$.ajax({
				type : COMMON_AJAX_TYPE,
				url : COMMON_AJAX_URL,
				dataType : COMMON_AJAX_DATA_TYPE,
				async: false,
				data : params,
				success : function(data) {
					data = ajaxTrimAndSession(data);
					if (data.indexOf(ERROR_MSG) == -1) {
						if (data != "") {
							var arrTmp = createArrayRowCol(data, 0, 2);
							populateSelect(document.getElementById(cityObjId), arrTmp, true);
							$('#'+cityObjId).val(cityId);
						} else {
							populateSelect(document.getElementById(cityObjId), new Array(), true);
							showErrorMessage('No cities are defined for this district', 'E');
						}
					}
				}
			});
		}
	} catch (err) { }
}

function getTownList(townObjId, cityId, townId) {
	try {
		showErrorMessage('', '');
		if (cityId != '') {
			var params = {
				CALL_ACTION : 'TOWN_LIST',
				CITY_ID 	: cityId,
				OWASP_IFAMS : owasp
			};
			$.ajax({
				type : COMMON_AJAX_TYPE,
				url : COMMON_AJAX_URL,
				dataType : COMMON_AJAX_DATA_TYPE,
				data : params,
				success : function(data) {
					data = ajaxTrimAndSession(data);
					if (data.indexOf(ERROR_MSG) == -1) {
						if (data != "") {
							var arrTmp = createArrayRowCol(data, 0, 2);
							populateSelect(document.getElementById(townObjId), arrTmp, true);
							$('#'+townObjId).val(townId);
						} else {
							populateSelect(document.getElementById(townObjId), new Array(), true);
							showErrorMessage('No towns are defined for this city !!!', 'E');
						}
					}
				}
			});
		}
	} catch (err) { }
}

function getDesignationList(desgObjId, deptId, desgId) {
	try {
		showErrorMessage('', '');
		if (deptId != '') {
			var params = {
				CALL_ACTION : 'DESIGNATION_LIST',
				DEPARTMENT_ID : deptId,
				OWASP_IFAMS : owasp
			};
			$.ajax({
				type : COMMON_AJAX_TYPE,
				url : COMMON_AJAX_URL,
				dataType : COMMON_AJAX_DATA_TYPE,
				data : params,
				success : function(data) {
					data = ajaxTrimAndSession(data);
					if (data.indexOf(ERROR_MSG) == -1) {
						if (data != "") {
							var arrTmp = createArrayRowCol(data, 0, 2);
							populateSelect(document.getElementById(desgObjId), arrTmp, true);
							$('#'+desgObjId).val(desgId);
						}
					}
				}
			});
		} else {
			showErrorMessage('Please provide Designation form Dropdowmlist !!!', 'E');
		}
	} catch (err) {  }
}

function submitResponse() {
	var flag = false;
	if(typeof document.dsApplet != 'undefined') {
		if (document.dsApplet.IS_FILE_SIGNED == 'TRUE') {
			flag = true;
		}
	} else {
		flag = true;
	}
	if (flag) {
		$('#CALL_ACTION').val("RESPONSE_FORWARD");
		showErrorMessage('<img src="img/loader.gif" />', 'P');
		$("html, body").animate({ scrollTop: 0 }, "fast");
		$("input[type=button]").attr("disabled", true);
		$.blockUI({ message: '<h1><img src="img/loader.gif" /><br/>Please wait while processing...</h1>' });
		$.ajax({
			type : 'POST',
			url : 'pendingtaskajax.action',
			dataType : 'text',
			data : $(AJAX_FORM).serialize(),
			success : function(data) {
				data = ajaxTrimAndSession(data);
				alert(data);
				if (data.indexOf(ERROR_MSG) == -1) {
					alert(data);
					funcClose();
				} else {
					showErrorMessage(data, 'E');
				}
				$("input[type=button]").attr("disabled", false);
				$.unblockUI();
			}
		});			
	} else {
		alert('Please sign the document..');
	}
}

/**
 * author naveenb
 * remarks Common Method for forwarding ICM Response
 */
function forwardResponse() {
	/************************ Add Validation Part in this Block *************************************/
	var _Selected_Response = $('#ddlResponse').val();
	if (_Selected_Response == '') {
    	alert('Please select the response to forward !!!');
        return false;
	}
	var _Response_Remarks = $('#txtComments').val();
	if (_Response_Remarks == '') {
    	alert('Please provide the remarks !!!');
        return false;
	}
	if ($('#MODE').val() == FORM_MODE_CLARIFICATION) {				// If application is sent for clarification, simply send to local JS
		if (APPROVAL_ID_TRIFAC_PROJECT == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_MOU  == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_DTIC_EMI == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_WRD_WATER == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_ENERGY == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_BOILER_TRF == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_BOILER_MFR == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_BOILER_REG == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_AKVN_WATER == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_LABOUR_FACTORY_PLAN == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_LABOUR_FACTORY_LIC == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_DTIC_TRANSFER == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_AKVN_TRANSFER == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_AKVN_CONSTRUCTION_PERMISSION == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_DTIC_PRODUCTION_CERTIFICATE == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_INVESTMENT_SUBSIDY == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_INTEREST_SUBSIDY == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_ENTRY_TAX_SUBSIDY == $('#APPROVAL_ID').val()
				|| APPROVAL_ID_DTIC_EM1_AMENDMENT == $('#APPROVAL_ID').val()) {
			validateAndSubmit(FORM_MODE_CLARIFICATION);
			return false;
		}
	}
	if (APPROVAL_ID_DTIC_EMI == $('#APPROVAL_ID').val()) {
		if (_Selected_Response.toLowerCase() != 'clarification from investor') {
			if ($('#hdnStepType').val() == 'Issue Part 1 Acknowledgement') {
				if ($('#txtRegNo').val() == '') {
					alert('Please provide EM1 Number !!!');
					return false;
				} else if ($('#txtFormNo').val() == '') {
					alert('Please provide Form Number !!!');
					return false;
				} else if ($('#linkEM').css('display') == 'none') {
					alert('Please generate acknowledgement before forwarding the application !!!');
					return false;
				} 
			}
		}
	} else if (APPROVAL_ID_DTIC_EMII == $('#APPROVAL_ID').val()) {
		if (_Selected_Response.toLowerCase() != 'clarification from investor') {
			if ($('#hdnStepType').val() == 'Issue EM Part 2 Acknowledgement') {
				if ($('#txtRegNo').val() == '') {
					alert('Please provide EM2 Number !!!');
					return false;
				} else if ($('#txtFormNo').val() == '') {
					alert('Please provide Form Number !!!');
					return false;
				} else if ($('#linkEM').css('display') == 'none') {
					alert('Please generate acknowledgement before forwarding the application !!!');
					return false;
				} 
			}
		}
	} else if (APPROVAL_ID_DTIC_PRODUCTION_CERTIFICATE == $('#APPROVAL_ID').val()) {
		if (_Selected_Response.toLowerCase() != 'clarification from investor') {
			if ($('#hdnStepType').val() == 'Issue EM Part 2 Acknowledgement') {
				if ($('#txtRegNo').val() == '') {
					alert('Please provide Production Certificate Number !!!');
					return false;
				} else if ($('#txtFormNo').val() == '') {
					alert('Please provide Form Number !!!');
					return false;
				} else if ($('#linkEM').css('display') == 'none') {
					alert('Please generate Production Certificate before forwarding the application !!!');
					return false;
				} 
			}
		}
	} else if (APPROVAL_ID_AKVN_TRANSFER == $('#APPROVAL_ID').val()) {
		if (_Selected_Response.toLowerCase() == 'draft lease ammended') {
			if ($('#lnkAmendLeaseDeedAkvn').css('display') == 'none' || $('#lnkAmendLeaseDeedDtic').css('display') == 'none') {
				alert('Please generate Amended Lease Deed before forwarding the application !!!');
				return false;
			} 
		} else if (_Selected_Response.toLowerCase() == 'transfer permission with dues') {
			if ($('#TRANSFER_DUES').val() == "") arrMandatoryFields.push('TRANSFER_DUES');
		}
	} else if (APPROVAL_ID_DTIC_TRANSFER == $('#APPROVAL_ID').val()) {
		if (_Selected_Response.toLowerCase() == 'draft lease ammended') {
			if ($('#lnkAmendLeaseDeedAkvn').css('display') == 'none' || $('#lnkAmendLeaseDeedDtic').css('display') == 'none') {
				alert('Please generate Amended Lease Deed before forwarding the application !!!');
				return false;
			} 
		} else if (_Selected_Response.toLowerCase() == 'transfer permission with dues') {
			if ($('#TRANSFER_DUES').val() == "") arrMandatoryFields.push('TRANSFER_DUES');
		}
	} else if (APPROVAL_ID_AKVN_CONSTRUCTION_PERMISSION == $('#APPROVAL_ID').val() && _Selected_Response.toLowerCase() == 'forward to md with committee remarks') {
		if ($('#MOM_AKVN_CONSTRUCTION').val() == "") arrMandatoryFields.push('MOM_AKVN_CONSTRUCTION');
	} else if (APPROVAL_ID_AKVN_CONSTRUCTION_PERMISSION == $('#APPROVAL_ID').val() && _Selected_Response.toLowerCase() == 'construction permission issued') {
		if ($('#CONSTRUCTION_PERMISSION_LETTER').val() == "") arrMandatoryFields.push('CONSTRUCTION_PERMISSION_LETTER');
	} else if ($('#hdnStepType').val() == 'Agenda Preparation') {
		if($('#APPROVAL_ID').val() == APPROVAL_ID_INVESTMENT_SUBSIDY) {
			if ($('#linkInvestmentAgenda').css('display') == 'none') {
				alert('Please generate Agenda before forwarding the application !!!');
				return false;
			} 
		} else if($('#APPROVAL_ID').val() == APPROVAL_ID_INTEREST_SUBSIDY) {
			if ($('#linkInterestAgenda').css('display') == 'none') {
				alert('Please generate Agenda before forwarding the application !!!');
				return false;
			} 
		} else if($('#APPROVAL_ID').val() == APPROVAL_ID_ENTRY_TAX_SUBSIDY) {
			if ($('#linkEntryTaxAgenda').css('display') == 'none') {
				alert('Please generate Agenda before forwarding the application !!!');
				return false;
			} 
		}
	} else if (APPROVAL_ID_ENTRY_TAX_SUBSIDY == $('#APPROVAL_ID').val() && _Selected_Response.toLowerCase() == 'certificate issued') {
		if ($('#hdnStepType').val() == 'Issue Certificate') {
			if ($('#ENTRY_TAX_CERTIFICATE').val() == "") arrMandatoryFields.push('ENTRY_TAX_CERTIFICATE');
		}
	} else if(APPROVAL_ID_DTIC_EM1_AMENDMENT == $('#APPROVAL_ID').val()) {
		if (_Selected_Response.toLowerCase() != 'clarification from investor') {
			if ($('#hdnStepType').val() == 'Issue Part 1 Acknowledgement') {
				if ($('#txtRegNo').val() == '') {
					alert('Please provide EM1 Number !!!');
					return false;
				} else if ($('#txtFormNo').val() == '') {
					alert('Please provide Form Number !!!');
					return false;
				} else if ($('#linkEM').css('display') == 'none') {
					alert('Please generate acknowledgement before forwarding the application !!!');
					return false;
				} 
			}
		}
	}
	/************************************************** Validation Block END **********************************************************/
	
	if ((APPROVAL_ID_LAND_TRANSFER_SELLER_AKVN == $('#APPROVAL_ID').val() || APPROVAL_ID_LAND_TRANSFER_SELLER_DTIC == $('#APPROVAL_ID').val()) 
			&& _Selected_Response.toLowerCase() == 'issue transfer order') {
		$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
		$('#ICM_REMARKS').val($('#txtComments').val());
		$('#MODE').val(FORM_MODE_ADD);
		document.forms[0].action = "sellerlandtransferdues.action";
	    document.forms[0].submit();
	/*} else if ((APPROVAL_ID_AKVN_TRANSFER == $('#APPROVAL_ID').val() || APPROVAL_ID_DTIC_TRANSFER == $('#APPROVAL_ID').val()) 
			&& _Selected_Response.toLowerCase() == 'draft lease ammended') {
		$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
		$('#ICM_REMARKS').val($('#txtComments').val());
		$('#MODE').val(FORM_MODE_ADD);
		document.forms[0].action = "leasedeed.action";
	    document.forms[0].submit();*/
	} else if ((APPROVAL_ID_AKVN_LAND == $('#APPROVAL_ID').val() || APPROVAL_ID_DTIC_LAND == $('#APPROVAL_ID').val() || APPROVAL_ID_REVENUE_LAND == $('#APPROVAL_ID').val()) 
			&& ( _Selected_Response.toLowerCase() == 'issue loi' || _Selected_Response.toLowerCase() == 'loi generated' 
			|| _Selected_Response.toLowerCase() == 'completed loi requirement' || _Selected_Response.toLowerCase() == 'issue allotment letter and draft lease deed' 
			|| _Selected_Response.toLowerCase() == 'issue allotment letter' 
			|| _Selected_Response.toLowerCase() == 'loi verified allotment order and draft lease deed generated'
			|| _Selected_Response.toLowerCase() == 'lease deed executed')) {
		if (_Selected_Response.toLowerCase() == 'issue loi' || _Selected_Response.toLowerCase() == 'loi generated') {
			$('#ICM_SELECTED_RESPONSE').val($('#ddlResponse').val());
			$('#ICM_REMARKS').val($('#txtComments').val());
			$('#MODE').val(FORM_MODE_ADD);
			document.forms[0].action = "letterofintent.action";
		    document.forms[0].submit();
		} else if (_Selected_Response.toLowerCase() == 'completed loi requirement') {
			$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
			$('#ICM_REMARKS').val($('#txtComments').val());
			$('#MODE').val(FORM_MODE_ADD);
			document.forms[0].action = "consentletter.action";
		    document.forms[0].submit();
		} else if (_Selected_Response.toLowerCase() == 'issue allotment letter and draft lease deed' 
				|| _Selected_Response.toLowerCase() == 'issue allotment letter' 
				|| _Selected_Response.toLowerCase() == 'loi verified allotment order and draft lease deed generated') {
			$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
			$('#ICM_REMARKS').val($('#txtComments').val());
			$('#MODE').val(FORM_MODE_ADD);
			document.forms[0].action = "allotmentorder.action";
		    document.forms[0].submit();
		} else if (_Selected_Response.toLowerCase() == 'lease deed executed') {
			$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
			$('#ICM_REMARKS').val($('#txtComments').val());
			$('#MODE').val(FORM_MODE_ADD);
			document.forms[0].action = "leasedeed.action";
		    document.forms[0].submit();
		} else {
			$('#CALL_ACTION').val("RESPONSE_FORWARD");
			if(!isMandatoryEnclosure()) {
				return false;
			}
			if (!checkMandatoryFields()) {
				return false;
			}
			$.blockUI({ message: '<h1><img src="img/loader.gif" /><br/>Please wait while processing...</h1>' });
			showErrorMessage('<img src="img/loader.gif" />', 'P');
			$("html, body").animate({ scrollTop: 0 }, "fast");
			$("input[type=button]").attr("disabled", true);
			fileUpload(document.forms[0], 'pendingtaskajax.action', '');
		}
	} else if (APPROVAL_ID_WRD_WATER == $('#APPROVAL_ID').val() && (  _Selected_Response.toLowerCase() == 'applicaiton proposal to dlwuc'
		|| _Selected_Response.toLowerCase() == 'acknowledgement from dlwuc to ee' || _Selected_Response.toLowerCase() == 'acknowledgement from ee to ce'
		|| _Selected_Response.toLowerCase() == 'send fee details to investor' || _Selected_Response.toLowerCase() == 'agreement executed' ) 
		|| _Selected_Response.toLowerCase() == 'agreement date updated') {
			validateAndSubmit(FORM_MODE_CLARIFICATION);
	} else if (APPROVAL_ID_ENERGY == $('#APPROVAL_ID').val() && (  _Selected_Response.toLowerCase() == 'forward the survey report for review'
		|| _Selected_Response.toLowerCase() == 'issue demand note' || _Selected_Response.toLowerCase() == 'draft agreement')) {
			validateAndSubmit(FORM_MODE_CLARIFICATION);
	} else {
		if (_Selected_Response.toLowerCase() == 'issue loi') {
			$('#ICM_SELECTED_RESPONSE').val($('#ddlResponse').val());
			$('#ICM_REMARKS').val($('#txtComments').val());
			$('#MODE').val(FORM_MODE_ADD);
			document.forms[0].action = "letterofintent.action";
		    document.forms[0].submit();
		} else if (_Selected_Response.toLowerCase() == 'completed loi requirement') {
			$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
			$('#ICM_REMARKS').val($('#txtComments').val());
			$('#MODE').val(FORM_MODE_ADD);
			document.forms[0].action = "consentletter.action";
		    document.forms[0].submit();
		} else if (_Selected_Response.toLowerCase() == 'issue allotment letter') {
			$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
			$('#ICM_REMARKS').val($('#txtComments').val());
			$('#MODE').val(FORM_MODE_ADD);
			document.forms[0].action = "allotmentorder.action";
		    document.forms[0].submit();
		} else if (_Selected_Response.toLowerCase() == 'lease deed executed') {
			$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
			$('#ICM_REMARKS').val($('#txtComments').val());
			$('#MODE').val(FORM_MODE_ADD);
			document.forms[0].action = "leasedeed.action";
		    document.forms[0].submit();
		} else if (_Selected_Response.toLowerCase() == 'issue po and forward to director of boiler') {
			$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
			$('#ICM_REMARKS').val($('#txtComments').val());
			$('#MODE').val(FORM_MODE_ADD);
			document.forms[0].action = "boilermaker.action";
		    document.forms[0].submit();
		} else if (_Selected_Response.toLowerCase() == 'issue po') {
			$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
			$('#ICM_REMARKS').val($('#txtComments').val());
			$('#MODE').val(FORM_MODE_ADD);
			document.forms[0].action = "boilermaker.action";
		    document.forms[0].submit();
		} else if (_Selected_Response.toLowerCase() == 'factory license issued') {
			$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
			$('#ICM_REMARKS').val($('#txtComments').val());
			$('#MODE').val(FORM_MODE_ADD);
			document.forms[0].action = "labourlicense.action";
		    document.forms[0].submit();
		} else if ((APPROVAL_ID_INVESTMENT_SUBSIDY == $('#APPROVAL_ID').val() || APPROVAL_ID_INTEREST_SUBSIDY == $('#APPROVAL_ID').val() 
				|| APPROVAL_ID_ENTRY_TAX_SUBSIDY == $('#APPROVAL_ID').val()) && (_Selected_Response.toLowerCase() == 'proceed to site verification' 
				|| _Selected_Response.toLowerCase() == 'prepare agenda' || _Selected_Response.toLowerCase() == 'approved' || _Selected_Response.toLowerCase() == 'rejected')) {
			$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
			$('#ICM_REMARKS').val($('#txtComments').val());
			validateAndSubmit(FORM_MODE_CLARIFICATION);
			return false;
		} else if ((APPROVAL_ID_INVESTMENT_SUBSIDY == $('#APPROVAL_ID').val() || APPROVAL_ID_INTEREST_SUBSIDY == $('#APPROVAL_ID').val()) 
				&& _Selected_Response.toLowerCase() == 'bill details updated') {
			$('#ICM_SELECTED_RESPONSE').val(_Selected_Response);
			$('#ICM_REMARKS').val($('#txtComments').val());
			validateAndSubmit(FORM_MODE_CLARIFICATION);
			return false;
		} else if ((APPROVAL_ID_INVESTMENT_SUBSIDY == $('#APPROVAL_ID').val() || APPROVAL_ID_INTEREST_SUBSIDY == $('#APPROVAL_ID').val()) 
				&& _Selected_Response.toLowerCase() == 'payment details updated') {
			validateAndSubmit(FORM_MODE_CLARIFICATION);
			return false;
		} else {
			$('#CALL_ACTION').val("RESPONSE_FORWARD");
			if(!isMandatoryEnclosure()) {
				return false;
			}
			if (!checkMandatoryFields()) {
				return false;
			}
			$.blockUI({ message: '<h1><img src="img/loader.gif" /><br/>Please wait while processing...</h1>' });
			showErrorMessage('<img src="img/loader.gif" />', 'P');
			$("html, body").animate({ scrollTop: 0 }, "fast");
			$("input[type=button]").attr("disabled", true);
			fileUpload(document.forms[0], 'pendingtaskajax.action', '');
		}	
	}
}

function checkEmail(obj) {
	showErrorMessage("", "");
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(obj.value)) {
		return true;
	} else if (!filter.test(obj.value)) {
		obj.value = '';
//		showErrorMessage('Please enter valid email address value !!!', 'E');
		return false;
	}
}

function fileUpload(form, action_url, div_id) {
    //Disabling form from editing
	$.blockUI({ message: '<h1><img src="img/loader.gif" /><br/>Please wait while processing...</h1>' });
	
	// Create the iframe...
    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", "upload_iframe");
    iframe.setAttribute("name", "upload_iframe");
    iframe.setAttribute("width", "0");
    iframe.setAttribute("height", "0");
    iframe.setAttribute("border", "0");
    iframe.setAttribute("style", "width: 0; height: 0; border: none;");
 
    // Add to document...
    form.parentNode.appendChild(iframe);
    window.frames['upload_iframe'].name = "upload_iframe";
 
    iframeId = document.getElementById("upload_iframe");
    // Add event...
    var eventHandler = function () {
 
            if (iframeId.detachEvent) iframeId.detachEvent("onload", eventHandler);
            else iframeId.removeEventListener("load", eventHandler, false);
 
            // Message from server...
            if (iframeId.contentDocument) {
                content = iframeId.contentDocument.body.innerHTML;
            } else if (iframeId.contentWindow) {
                content = iframeId.contentWindow.document.body.innerHTML;
            } else if (iframeId.document) {
                content = iframeId.document.body.innerHTML;
            }
            
            $("html, body").animate({ scrollTop: 0 }, "fast");
            if (content.indexOf("X-LOGIN-PAGE-X") >= 0 || content.indexOf("meta http-equiv") >= 0) {
        		alert('Oops ! your session has expired, system is redirecting you to the Login Page. Please login again !!!');
        		window.location.href = 'login.action';
        	}

            showErrorMessage($.trim(content), 'A');
            $.unblockUI();
            
            if (content.indexOf(ERROR_MSG) == -1) {
            	alert($(content).text());
            	if(action_url != 'agendaajax.action') {
            		funcClose();
            	} else {
            		$('#tblAgenda').show();
    				$('#btnForward').show();
            	}
            }
 
            // Del the iframe...
            setTimeout('iframeId.parentNode.removeChild(iframeId)', 250);
        }
 
    if (iframeId.addEventListener) iframeId.addEventListener("load", eventHandler, true);
    if (iframeId.attachEvent) iframeId.attachEvent("onload", eventHandler);
 
    // Set properties of form...
    form.setAttribute("target", "upload_iframe");
    form.setAttribute("action", action_url);
    form.setAttribute("method", "post");
    form.setAttribute("enctype", "multipart/form-data");
    form.setAttribute("encoding", "multipart/form-data");
 
    // Submit the form...
    form.submit();
 
    //Any Ajax processiong needs to be done below
}

function viewFileNetDocument(caseFolderId, docName) {
	var DownloadUrl = "filedownload.action?FILE_NAME="+docName+"&CASE_FOLDER_ID="+caseFolderId;
	
	var success = new PDFObject({ url: DownloadUrl }).embed();
}

function validateGrid(tableId, startRow) {
	var flag = true;
	var table = document.getElementById(tableId);
    for (var i = startRow; i < table.rows.length; i++) {
    	for (var j = 0; j < table.rows[i].cells.length; j++) {
    		if (table.rows[i].cells[j].childNodes[0].nodeName == 'INPUT' || table.rows[i].cells[j].childNodes[0].nodeName == 'SELECT') {
    			if (getValue(table.rows[i].cells[j].childNodes[0].value) == '') {
    				if(table.rows[i].cells[j].childNodes[0].disabled) {
    				} else {
        				table.rows[i].cells[j].setAttribute('class', 'errorCol');
        				flag = false;
    				}
    			} else {
    				setColors(table.rows[i].cells[j], '');
    			}
    		}
    	}
    }
    return flag;
}

function liesInRange(num, start, end) {
	try {
		var startAbs = start <= end ? start : end;
		var endAbs = end >= start ? end : start;
		if (num >= startAbs && num <= endAbs) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
}

var hash = {'.pdf':1, '.PDF':2}; 
var hashImage = {'.jpg':3, '.JPG':4, '.jpeg':5, '.JPEG':6};
function check_extension(filename, fileId) {
	var re = /\..+$/;
//	var ext = filename.match(re);
	var ext = filename.split('.').pop();
	ext = '.' + ext;

	if (fileId.indexOf('AKVN_PHOTO') != -1) {
		if (hashImage[ext]) {
			return true;
		} else {
			return false;
		}
	} else {
		if (hash[ext]) {
			return true;
		} else {
			return false;
		}
	}
}

$('.enclosure').bind('change', function() {
	var File_Size = this.files[0].size;
	if(File_Size > (UPLOAD_SIZE*1024*1024)) {
		alert("This file is greater than "+ UPLOAD_SIZE +" MB");
		this.value = '';
	}

	if (!check_extension(this.value)) {
		alert("Supported file type is PDF, Please upload only PDF !!!");
		this.value = "";
	}
});

/*$('.chkEnclosure').bind('click', function () {
	var _Id = $(this).attr('id');
	var _Doc_Id = _Id.split('__')[1];

	if ($(this).prop("checked")) {
		$(this).val('M');
		$('#'+_Doc_Id).attr('disabled', true);
		$('#'+_Doc_Id).val('');
		$('#I__'+_Doc_Id).hide();
	} else {
		$(this).val('O');
		$('#'+_Doc_Id).attr('disabled', false);
	}
});*/

function checkManualFile(obj) {
	var _Id = obj.id;
	var _Doc_Id = _Id.split('__')[1];
	
	if (obj.checked) {
		obj.value = 'M';
		$('#'+_Doc_Id).attr('disabled', true);
		$('#'+_Doc_Id).val('');
		$('#I__'+_Doc_Id).hide();
	} else {
		obj.value = 'N';
		$('#'+_Doc_Id).attr('disabled', false);
	}
}

function checkfile(obj, fileSize, mandatory) {
	var File_Size = obj.files[0].size;
	var _Link_Id = "#I__"+obj.id;
	var _CHK_ID = "#C__"+obj.id;
	
	$(_Link_Id).show();
	if(File_Size > (fileSize*1024*1024)) {
		alert("This file is greater than "+ fileSize +" MB");
		obj.value = '';
		$(_Link_Id).hide();
		return false;
	}else if(File_Size == 0) {
		alert("File size cannot be equal to 0 (zero) !!!");
		obj.value = '';
		$(_Link_Id).hide();
		return false;
	}

	if (!check_extension(obj.value, obj.id)) {
		alert("Supported file type is PDF (And jpg for photo), Please upload only PDF !!!");
		obj.value = "";
		$(_Link_Id).hide();
		return false;
	}
	
	$(_CHK_ID).val('O');
}

function isMandatoryEnclosure() {
	var list = $('.mandatory');
	var lstEnclosure = $('.enclosure');
	var dataEnclosure = '';
	var flag = true;
	
	/*$.each(list, function (index, data) {
		var _Id = $(this).attr('id');
		alert(_Id);
	    if ($('#'+_Id).hasClass("mandatory") && $('#C__'+_Id).val() == 'N' && $(this).attr('disabled') != 'disabled') {
	    	arrMandatoryFields.push(_Id);
	    	flag = false;
	    }
	});*/
	
	$.each(lstEnclosure, function (index, data) {
		var _CHK_ID = $(this).attr('id');
		var _Doc_Id = $(this).attr('id').split('__')[1];
		if($('#'+_Doc_Id).hasClass("mandatory") && _Doc_Id.split('_')[0] !='OTHER' && $('#'+_CHK_ID).val() == 'N') {
			arrMandatoryFields.push(_Doc_Id);
		}
		dataEnclosure += _Doc_Id + COL_DELIMITER + $(this).val() + ROW_DELIMITER;
	});
	
	var length = _arrFastTime.length;
	for(var i = 1; i<=length; i++) {
		if($('#OTHER_DESC_'+i).length == 1) {
			if($('#OTHER_DESC_'+i).val() == '') {
				arrMandatoryFields.push('OTHER_DESC_'+i);
			} 
			if($('#OTHER_'+_arrFastTime[i-1]).val() == '') {
				arrMandatoryFields.push('OTHER_'+_arrFastTime[i-1]);
			}  
			if($('#OTHER_DESC_'+i).val() != '' && $('#OTHER_'+_arrFastTime[i-1]).val() != '') {
				dataEnclosure = dataEnclosure + 'OTHER_'+_arrFastTime[i-1] + DATA_DELIMITER + $('#OTHER_DESC_'+i).val() + ROW_DELIMITER ;
			}
		}
	}
	
	var lengthICM = _arrFastTimeICM.length;
	for(var i = 1; i<=lengthICM; i++) {
		if($('#OTHER_DESC_'+i).length == 1) {
			if($('#OTHER_DESC_'+i).val() == '') {
				arrMandatoryFields.push('OTHER_DESC_'+i);
			} 
			if($('#OTHER_'+_arrFastTimeICM[i-1]+'_D').val() == '') {
				arrMandatoryFields.push('OTHER_'+_arrFastTimeICM[i-1]+'_D');
			}  
			if($('#OTHER_DESC_'+i).val() != '' && $('#OTHER_'+_arrFastTimeICM[i-1]+'_D').val() != '') {
				dataEnclosure = dataEnclosure + 'OTHER_'+_arrFastTimeICM[i-1]+'_D' + DATA_DELIMITER + $('#OTHER_DESC_'+i).val() + ROW_DELIMITER ;
			}
		}
	}
	$('#ENCLOSURE_DATA').val(dataEnclosure);
	return flag;
}

function removeDocument(obj) {
	var doc = obj.id.split("__")[1];
	document.getElementById(doc).value = '';
	document.getElementById("C__"+doc).value = 'N';
	obj.style.display = "none";
	if($('#V__'+doc).length == 1) {
		$('#V__'+doc).hide();
	}
	$('#'+doc).show();
	$('#C__'+doc).val('N');
	$('#C__'+doc).prop('disabled', false);
}

function getZeroIfEmptyString(val) {
    if (val == '') {
        return 0;
    } else {
        return val;
    }
}

function disableFields(htmlId, val, arrFields) {
	if (htmlId == '') {
		for (var field in arrFields) {
			$('#'+arrFields[field]).attr('disabled', true);
		}
	} else {
		if ($('#'+htmlId).val() != val) {
			for (var field in arrFields) {
				$('#'+arrFields[field]).attr('disabled', true).val('');
			}
		} else {
			for (var field in arrFields) {
				$('#'+arrFields[field]).attr('disabled', false);
			}
		}
	}
}

function callAjaxFillLovs(obj, action_name) {
	var comboText = getValue(obj.getComboText());
	if (comboText.length > 2) {
		var params = {
			TEXT_VALUE : obj.getComboText(),
			CALL_ACTION : action_name,
			OWASP_IFAMS : owasp
		};
		$.ajax({
			type : COMMON_AJAX_TYPE,
			url : COMMON_AJAX_URL,
			dataType : COMMON_AJAX_DATA_TYPE,
			data : params,
			success : function(data) {
				data = trimString(data);
				var lovArray = new Array();
				if (data != "") {
					var lovdata = data.split(ROW_DELIMITER);
					for ( var i = 0; i < lovdata.length; i++) {
						var kayval = lovdata[i].split(COL_DELIMITER);
						lovArray.push([ kayval[0], kayval[1] ]);
					}
					obj.clearAll();
					obj.addOption(lovArray);
				} else {
					obj.clearAll();
				}
			}
		});
	} else {
		obj.clearAll();
	}
}

function getProductList(obj, id) {
	var activityCode = obj.getSelectedValue();
	showErrorMessage('', '');
	if (activityCode != '') {
//		if (confirm('Changing Main Manufacturing Activity will remove all the product details.\n\t\t\t\t\t\t Continue ?')) {
			truncateTable('tblStepProducts_'+id, 2);
			var params = {
					CALL_ACTION		: 'GET_PRODUCTS',
					ACTIVITY_CODE	: activityCode,
					OWASP_IFAMS : owasp
				};
			$.ajax({
				type    : COMMON_AJAX_TYPE,
				url     : COMMON_AJAX_URL,
				dataType: COMMON_AJAX_DATA_TYPE,
				data	: params,
				success : function (data) {
					data = ajaxTrimAndSession(data);
					if (data.indexOf(ERROR_MSG) == -1) {
						$('#hdnPL_'+id).val(data);					
					} else {
						$('#hdnPL_'+id).val('');
						showErrorMessage(data, 'E');
					}
					addProductRecord('tblStepProducts_'+id, new Array('','',''));
				}
			});
//		}
	}
}

function getProductUnitList(productIndex, productCode, unitValue) {
	showErrorMessage('', '');
	var activityIdIndex = productIndex.split('_')[1];
	var productIdIndex = productIndex.split('_')[2];
	if (productCode != '') {
		var params = {
			CALL_ACTION		: 'GET_UNITS',
			PRODUCT_CODE	: productCode,
			OWASP_IFAMS : owasp
		};

		$.ajax({
			type		: COMMON_AJAX_TYPE,
			url			: COMMON_AJAX_URL,
			dataType	: COMMON_AJAX_DATA_TYPE,
			data		: params,
			success		: function(data) {
				data = ajaxTrimAndSession(data);
				if (data.indexOf(ERROR_MSG) == -1) {
					arrTemp = createArrayRowCol(data, 0, 1);
					populateSelect(document.getElementById('ddlUnit_'+ activityIdIndex +'_'+ productIdIndex), arrTemp, true);
					$('#ddlUnit_'+ activityIdIndex +'_'+ productIdIndex).val(unitValue);
				} else {
					arrTemp.length = 0;
					populateSelect(document.getElementById('ddlUnit_'+ activityIdIndex +'_'+ productIdIndex), arrTemp, true);
					showErrorMessage(data, 'E');
				}
			}
		});
	} else {
		arrTemp.length = 0;
		populateSelect(document.getElementById('ddlUnit_'+ activityIdIndex +'_'+ productIdIndex), arrTemp, true);
	}
}

function getRestructuredString(obj) {
	var val = obj.val();
	val = val.split('\n').join(' ');
/*	val = val.split('\'').join('\'');
	val = val.split('"').join('\"');*/
	obj.val(val);
}

function replaceAll(str, find, replace) {
	  return str.replace(new RegExp(find, 'g'), replace);
}

function checkMandatoryFields() {
	$('input[type="text"], input[type="radio"], textarea, select, input[type="file"]').css("border","1px solid #8b8b8e");
	$('td').css("border","");
	$('tr').css("border","");
	if (arrMandatoryFields.length != 0) {
		for (var i in arrMandatoryFields) {
			if (i==0) {
				$('#'+arrMandatoryFields[i]).focus();
			}
			$('#'+arrMandatoryFields[i]).css("border","1px solid RED");
		}
		arrErrorMessages.push('Please provide all the mandatory fields.');
		showErrorMessage(arrErrorMessages, 'E');
		arrMandatoryFields.length = 0;
		arrErrorMessages.length = 0;
		return false;
	} else {
		return true;
	}
}

function truncateTable(tableId, fromRow) {
	var table = document.getElementById(tableId);
    var noOfRows = table.rows.length;
    for (var i=fromRow; i<=noOfRows; noOfRows--) {
        table.deleteRow(noOfRows-1);
    }
}

function customAlert(output_msg, title_msg) {
    if (!title_msg)
        title_msg = 'Alert';

    if (!output_msg)
        output_msg = 'No Message to Display.';

    $("<div></div>").html(output_msg).dialog({
        title: title_msg,
        resizable: true,
        modal: true,
        buttons: {
            "Ok": function() 
            {
                $( this ).dialog( "close" );
            }
        }
    });
}

function convertArrayToString(arr) {
	var str = "";
	for (var i in arr) {
		str += arr[i] + COL_DELIMITER;
	}
	return str + "TEST";
}

function setStaticTableDataToHidden(tableId, hiddenId) {
	var table = document.getElementById(tableId);
	var _GridData = '';
	for (var i = 1; i < table.rows.length; i++) {
    	_GridData += table.rows[i].cells[0].childNodes[0].value;	
    	if (i != (table.rows.length-1)) {
    		_GridData += ROW_DELIMITER;	
    	}
    }
	$('#'+hiddenId).val(_GridData);
}

function doSearch(searchText, tableId, startRow) {
//  var searchText = document.getElementById('searchTerm').value;
  var targetTable = document.getElementById(tableId);
  var targetTableColCount;
          
  //Loop through table rows
  for (var rowIndex = startRow-1; rowIndex < targetTable.rows.length; rowIndex++) {
      var rowData = '';

      //Get column count from header row
      if (rowIndex == startRow-1) {
         targetTableColCount = targetTable.rows.item(rowIndex).cells.length;
         continue; //do not execute further code for header row.
      }
              
      //Process data rows. (rowIndex >= 1)
      for (var colIndex = 0; colIndex < targetTableColCount; colIndex++) {
          rowData += targetTable.rows.item(rowIndex).cells.item(colIndex).textContent;
      }

      //If search term is not found in row data
      //then hide the row, else show
      if (rowData.toLowerCase().indexOf(searchText.toLowerCase()) == -1)
          targetTable.rows.item(rowIndex).style.display = 'none';
      else
          targetTable.rows.item(rowIndex).style.display = 'table-row';
  }
}

function hideTab(index) {
	$('#tab_'+index).closest('li').removeClass('selected');
	$('#tab'+index).hide();
}

function showTab(index) {
	$('#tab_'+index).closest('li').addClass('selected');
	$('#tab'+index).show();
}

function removeTab(tabNo) {
	$('#tab_'+tabNo).hide();
	$('#tab'+tabNo).hide();
	$("#btnPreviousTab_"+(parseInt(tabNo)+1)).unbind("click");
	$("#btnPreviousTab_"+(parseInt(tabNo)+1)).click(function () {
		var index = parseInt(this.id.split('_').pop());
		hideTab(index);
		showTab(index-2);
	});
	$("#btnNextTab_"+(parseInt(tabNo)-1)).unbind("click");
	$("#btnNextTab_"+(parseInt(tabNo)-1)).click(function () {
		var index = parseInt(this.id.split('_').pop());
		hideTab(index);
		showTab(index+2);
	});
}

function displayTab(tabNo) {
	$('#tab_'+tabNo).show();
	$("#btnPreviousTab_"+(parseInt(tabNo)+1)).unbind("click");
	$("#btnPreviousTab_"+(parseInt(tabNo)+1)).click(function () {
		var index = parseInt(this.id.split('_').pop());
		hideTab(index);
		showTab(index-1);
	});
	$("#btnNextTab_"+(parseInt(tabNo)-1)).unbind("click");
	$("#btnNextTab_"+(parseInt(tabNo)-1)).click(function () {
		var index = parseInt(this.id.split('_').pop());
		hideTab(index);
		showTab(index+1);
	});
}

function openNewWindow() {
	return window.open(CONTEXT_PATH + "/jsp/common/userGuideLinks.jsp",'mywindow','width=400,height=250,toolbar=no, location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no, resizable=no');
}

function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if ((charCode >= 48 && charCode <= 57) 
		    || charCode == 8 					// 8	: backspace
//			|| charCode == 46 					// 46	: delete
			|| charCode == 9 					// 9	: tab
//			|| charCode == 17 					// 17	: CTRL 
			|| charCode == 116 					// 116	: F5
//			|| (charCode>=35 && charCode<=40)
			) {
       return true;
   }
   return false;
}

function hasDuplicates(array) {
    var valuesSoFar = {};
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (Object.prototype.hasOwnProperty.call(valuesSoFar, value)) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}

function isFloatKey(evt, obj) {
	var index;
	var tempArray = new Array();
	var value = obj.value;
	tempArray = value.split('');
	index = tempArray.indexOf('.');
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if(!((charCode >= 48 && charCode <= 57)		// 48-57 : 0 - 9 numbers 
			|| charCode == 8 					// 8	: backspace
			|| charCode == 46 					// 46	: delete
			|| charCode == 9 					// 9	: tab
			|| charCode == 17 					// 17	: CTRL 
			|| charCode == 116 					// 116	: F5
			|| (charCode>=35 && charCode<=40))) {	// 35 : end, 36 : home, 37 : left, 38 : up, 39 : right, 40 : down
		evt.preventDefault();
	} else {
		if(charCode == 46) {
			if(index != -1) {
				evt.preventDefault();
			}
		}
		if(index != -1) {
			tempArray = tempArray.splice(index, tempArray.length - 1, '');
			if(tempArray.length > 2 && (charCode >= 48 && charCode <= 57)) {
				evt.preventDefault();
			}
		}
	}
}

function isAlphabetKey(evt) {
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode == 32 || navigationKeysOnly(evt)) {
		// if the pressed key is an alphabet || space bar || navigation keys (like arrow keys, delete, backspace, end, home, tab, f5) then do nothing
	} else {
		// prevent the key from being pressed
		evt.preventDefault();
	}
}

function toCamelCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function setAmountInLacs(obj) {
	if (obj.value != '') {
		if ($.isNumeric(obj.value)) {
			obj.value = Number((parseFloat(obj.value)).toFixed(2));
		} else {
			showErrorMessage('Please provide valid amount !!!', 'A');
			obj.value = '';
		}
	}
}
