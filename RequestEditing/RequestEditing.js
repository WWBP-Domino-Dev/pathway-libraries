function getFieldValue( fieldObject ) {
	// Get a user entered value in a text input field - for validation;
	return ( fieldObject.value );
}

function isValidDate(d) {
	// Attempt to verify the validity of the date string
	// Currently not used but could be relevant for any custom date strings
	if ( Object.prototype.toString.call(d) !== "[object Date]" ) {
	    return false;
	}
	if ( isNaN(d.getTime()) ) {
	    return false;
	}
	return true;
}

function failNull( theForm, fieldName) {
	// Test the user entered value to make sure it is not null
	fieldValue = getFieldValue (theForm[fieldName]);
	if ( fieldValue == "" ) {
		return( true );
	} else {
		return ( false );
	}
}
function checkSelect(theForm, fieldName, initialValue){
	// checkSelect checks keyword fields.  The first choice in the keyword list, and the default value,
	// should be a fixed value that can be tested.
	var selectField = theForm[fieldName];

	if (selectField.selectedIndex < 0) {
		return(true);
	}
	if  (selectField.options[selectField.selectedIndex].text == initialValue){
		return(true);
	} else {
		return(false);
	}
}

function checkRadio(theForm, fieldName, initial) {
	// checkRadio checks radio button fields.  Need to make sure a selection was made
	var fldRadio;
	var fldValue;
	var fldLen;
	var i;

	var fldRadio = theForm[fieldName];
	var fldValue = initial;
	var fldLen = fldRadio.length;

	for (i = 0; i < fldLen; i++) {
		if (fldRadio[i].checked) {
			fldValue = fldRadio[i].value;
		}
	}
	if (fldValue == initial) {
		return(true);
	} else {
		return(false);
	}
}

function echeck(str) {
	// Verify the format of provided email addresses

	var isOK = "";
	var at = "@";
	var dot = ".";
	var lat = str.indexOf(at);
	var lstr = str.length;
	var ldot = str.indexOf(dot);
	if (str.indexOf(at)==-1){
		return str + ": Invalid E-mail address, missing '@'";
	}

	if (str.indexOf(at)==0 || str.indexOf(at)==lstr){
		return str + ": Invalid E-mail address, no email id in string";
	}

	if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		return str + ": Invalid E-mail address, '.' missing or incorrectly positioned";
	}

	if (str.indexOf(at,(lat+1))!=-1){
		return str + ": Invalid E-mail address, '@' incorrectly positioned";
	}

	if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		return str + ": Invalid E-mail address, '.' incorrectly positioned";
	}

	if (str.indexOf(dot,(lat+2))==-1){
		return str + ": Invalid E-mail address, '.' incorrectly positioned";
	}

	if (str.indexOf(" ")!=-1){
		return str + ": Invalid E-mail address, string contains spaces";
	}

 	return(isOK);
}

function alertBox ( theForm, fieldName, alertMessage) {
          //Displays an alertbox with an error message and returns the user to the field with a problem;
		alert ( "Field Validation: \n\n" + alertMessage );
		theForm[fieldName].focus( );
		return;
}

// =============================================================================
function submitDocument( form ) {
        // Submit button code does the validation testing before running submit;

		if (document.forms[0].validateMessage.value != "OK") {
			alert("Please validate your email address before submission");
			return;
		}

		var fieldArray = new Array();
		var defArray = new Array();
		var msgArray = new Array();
		var groupArray = new Array();
		var bEdit = false;
		var bTemp = false;
		var emailTxt1 = "";
		var emailTxt2 = "";
		var DEF = "<select>";

		// these message variables are for the fields that have special edit rules
		var locMsg = "If the 'Location' is not 'Remote' then address information must be included";
		var busMsg = "Please elaborate on the business justification.  Text that is too brief may require followup from PATHway";
		var dscMsg = "Please add to the problem description.  Text that is too brief may require followup from PATHway";
		var isvMsg = "A partner name must be selected from the list or provided as a new entry"
		var isv2Msg = "The 'new partner' field conflicts with the already-selected partner name"
		var revMsg = "The Total Revenue Opportunity field should be numeric"
		var revMsg2 = "The Total Revenue Opportunity field appears too small to be valid"
		var revMsg3 = "The Total Revenue Opportunity field is zero and so requires an explanation"
		var revMsg4 = "You need to set the Embedded Solution Agreement explanation field"
		var revMsg5 = "The IBM Cloud Portion of Total Revenue should be numeric"
		var revMsg6 = "The IBM Cloud Recurring Revenue field should be numeric"
		var durMsg = "The Engagement Effort field should be all numeric characters. "
		var durMsg2 = "The Engagement Effort field should be non-zero. "
		var qtrMsg = "Opportunity Quarter is required if IBM Cloud Revenue > zero"
		var tamMsg = "Your name must be provided"
		var practMsg = "The # of Practitioners Engaged must be a single number greater than 0"

		// initialize the root of the error message
		var sMsg = "The following fields failed validation checks: \n\n";
		var field;

		// these arrays define the fields to be checked along with their default values (if appropriate) and error text
		fieldArray[0] = "InputJustify";
		msgArray[0] = "Business Justification";

		fieldArray[1] = "PWayRevAslOem";
		defArray[1] = DEF;
		msgArray[1] = "Embedded Solution Agreement Identification";

		fieldArray[2] = "PWayPriority";
		defArray[2] = DEF;
		msgArray[2] = "Severity";

		fieldArray[3] = "PWayDeliver";
		defArray[3] = DEF;
		msgArray[3] = "Location";

		fieldArray[4] = "PWayHelp";
		defArray[4] = DEF;
		msgArray[4] = "Type of Service";

		fieldArray[5] = "InputSkills";
		msgArray[5] = "Required Skills";

		fieldArray[6] = "PWayRDeliver";
		defArray[6] = DEF;
		msgArray[6] = "Cost Recovery";

		fieldArray[7] = "PWayEngPhase";
		defArray[7] = DEF;
		msgArray[7] = "Phase";

		fieldArray[8] = "InputDesc";
		msgArray[8] = "Description";

		fieldArray[9] = "PWaySponsor";
		msgArray[9] = "Business Sponsor Name";

		fieldArray[10] = "PWayContactAddr";
		msgArray[10] = "Partner contact's email address";

		fieldArray[11] = "PWayPartnerType";
		defArray[11] = DEF;
		msgArray[11] = "Partner Type";

		fieldArray[12] = "PWayNeeded";
		defArray[12] = DEF;
		msgArray[12] = "Engagement Start Date";

		fieldArray[13] = "PWayDuration";
		defArray[13] = DEF;
		msgArray[13] = "Engagement Effort Duration";

		fieldArray[14] = "PWayContact";
		msgArray[14] = "Partner Focal Point";

		fieldArray[15] = "PWayContactNbr";
		msgArray[15] = "Focal Point Contact Number";

		fieldArray[16] = "PWaySponsorOrg";
		defArray[16] = DEF;
		msgArray[16] = "Business Sponsor's Organization";

		fieldArray[17] = "PWayAddr";
		msgArray[17] = "Requestor's email address";

		fieldArray[18] = "PWayCountry";
		defArray[18] = DEF;
		msgArray[18] = "Country Name";

		// process all the default fields
		for (var x = 0; x < fieldArray.length; x++)
		{

			field = form[fieldArray[x]];
			bTemp = false;

			// checkboxes in Notes look like SELECT fields on the web page.
			if (field.type == "select-one" || field.type == "select-multiple") {
				if (checkSelect(form, fieldArray[x], defArray[x])) {
					bTemp = true;
				}
			} else {
				if (field.type == "text" || field.type == "textarea") {
					if (failNull(form, fieldArray[x]) ) {
						bTemp = true;
					}
				} else {
					// radio fields from Notes come back with an undefined type.
					if (checkRadio(form, fieldArray[x], defArray[x])) {
						bTemp = true;
					}
				}
			}

			// if the temporary edit failure flag is set, see if this is the first error
			// by checking the global edit flag.  If first time, set the field focus.
			if (bTemp) {
				if (! bEdit) {
					form[fieldArray[x]].focus();
				}
				sMsg = sMsg + msgArray[x] + "\n";
				bEdit = true;
			}
		} // end of For { }

		// ======= Special Edits =========

		debug = getFieldValue(form['debug']);

		// FIELD Edit =======================================================================================
		// the PWayISV field is now a drop-down list.  if it's still the default then check the
		// new text field for ISVs not in the list
		if (checkSelect(form, "PWayISV", DEF)) {
			if (failNull(form, "PWayNewISV") ) {
				if (! bEdit) {
					form["PWayISV"].focus();
				}
				sMsg = sMsg + isvMsg + "\n";
				bEdit = true;
			}
		}
		else {
			if (! failNull(form, "PWayNewISV") ) {
				document.forms[0].PWayISV.value = DEF
			//	if (! bEdit) {
			//		form["PWayISV"].focus();
			//	}
			//	sMsg = sMsg + isv2Msg + "\n";
			//	bEdit = true;
			}
		}

		// FIELD Edit =======================================================================================
		// Engagement Effort: make sure the value is numeric
		var revEdit = new RegExp("^\\d{1,4}$");
		fieldName = "PWayDuration";
		fieldValue = getFieldValue (form[fieldName]);
		if (!revEdit.test(fieldValue)) {
			if (! bEdit) {
				form["PWayDuration"].focus();
			}
			sMsg = sMsg + durMsg + "\n";
			bEdit = true;
		}
		else {
			if (fieldValue < 1) {
				if (! bEdit) {
					form["PWayDuration"].focus();
				}
				sMsg = sMsg + durMsg2 + "\n";
				bEdit = true;
			}
		}

		// FIELD Edit =======================================================================================
		// Engagement Start Date: test the format
		var dateEdit = new RegExp("^\\d{1,2}.\\d{1,2}.\\d{4}$");
		var langCheck = new RegExp("ja");
		fieldName = "PWayNeeded";
		dateValue = getFieldValue(form[fieldName]);
		fieldLang = "language"
		fieldLangValue = getFieldValue(form[fieldLang]);
		fieldLangFlag = "dateShuffle"
		langFlagValue = getFieldValue(form[fieldLangFlag]);

		var ranges = fieldValue.split("/");

		// If the Accept-Language HTTP header includes one of the language
		// codes in 'langCheck' then switch the month and day values in the
		// date string.
		if (langCheck.test(fieldLangValue)) {
			// dd = ranges[0];
			// mm = ranges[1];
			// yy = ranges[2];
			dateValue = ranges[1] + "/" + ranges[0] + "/" + ranges[2]
		}

		// FIELD Edit =======================================================================================
		// Total Revenue Opportunity: make sure the value is numeric
		// Reverse the display format before final submission.
		var revEdit = new RegExp("^\\d{1,9}$");
		fieldName = "PWayRevTotal";
		fieldValue = getFieldValue(form[fieldName]);

		// new formatting code converts value to include currency characters, so make it numeric for normal edit check
		revNumT = fieldValue.toString().replace(/\$|\,|/g,'');
		if(isNaN(revNumT)) {
			//revNumT = "0";
			if (! bEdit) {
				form["PWayRevTotal"].focus();
			}
			sMsg = sMsg + revMsg + "\n";
			bEdit = true;
		} else {
			fieldValue = revNumT;
			// if the value passes the format check, test it for a value < 1,000 and > 0
			if (fieldValue < 1000 && fieldValue > 0) {
				if (! bEdit) {
					form["PWayRevTotal"].focus();
				}
				sMsg = sMsg + revMsg2 + "\n";
				bEdit = true;
			}
		}

		// if value = 0, require an explanation
		if (fieldValue == 0) {
			fieldName = "InputRevJustify";
			fieldValue = getFieldValue(form[fieldName]);
			if (fieldValue.length == 0) {
				if (! bEdit) {
					form["InputRevJustify"].focus();
				}
				sMsg = sMsg + revMsg3 + "\n";
				bEdit = true;
			}
		}

		// FIELD Edit =======================================================================================
		// IBM Cloud Revenue Portion: make sure the value is numeric.
		// Reverse the display format before final submission.
		fieldName = "PWayWebSphereRevPortion";
		fieldValue = getFieldValue(form[fieldName]);

		// new formatting code converts value to include currency characters, so make it numeric for normal edit check
		revNumP = fieldValue.toString().replace(/\$|\,|/g,'');
		if(isNaN(revNumP)) {
			//revNumP = "0";
			if (! bEdit) {
				form["PWayWebSphereRevPortion"].focus();
			}
			sMsg = sMsg + revMsg5 + "\n";
			bEdit = true;
		}
		fieldValue = revNumP;

		// if value > 0 then RevQtr must have been selected
		if (fieldValue > 0) {
			// a non-0 value will require the selection of a quarter value
			if (checkSelect(form, "PWayRevQtr", DEF)) {
				if (! bEdit) {
					form["PWayRevQtr"].focus();
				}
				sMsg = sMsg + qtrMsg + "\n";
				bEdit = true;
			}

		}

		// FIELD Edit =======================================================================================
		// IBM Cloud Recurring Revenue Portion: make sure the value is numeric.
		// Reverse the display format before final submission.
		fieldName = "PWayCloudRecurRev";
		fieldValue = getFieldValue(form[fieldName]);

		// new formatting code converts value to include currency characters, so make it numeric for normal edit check
		revNumR = fieldValue.toString().replace(/\$|\,|/g,'');

		if(isNaN(revNumR)) {
			//revNumR = "0";
			if (! bEdit) {
				form["PWayCloudRecurRev"].focus();
			}
			sMsg = sMsg + revMsg6 + "\n";
			bEdit = true;
		}
		fieldValue = revNumR;

		// FIELD Edit =======================================================================================
		// Embedded Solution Agreement: if it is 'Yes' an explanation is required
		fieldName = "PWayRevAslOem";
		fieldValue = getFieldValue(form[fieldName]);
		if (fieldValue == "1") {
			fieldName = "InputRevAslOemJustify";
			fieldValue = getFieldValue (form[fieldName]);
			if (fieldValue == "") {
				if (! bEdit) {
					form["InputRevAslOemJustify"].focus();
				}
				sMsg = sMsg + revMsg4 + "\n";
				bEdit = true;
			}
		}

		// FIELD Edit =======================================================================================
		// Location Address: require address if Location = 'On-site'
		var loctest=new RegExp("On-site|address");
		fieldName = "PWayDeliver";
		fieldValue = getFieldValue(form[fieldName]);
		if (loctest.test(fieldValue)) {
			if (failNull(form, "InputAddress") ) {
				if (! bEdit) {
					form["InputAddress"].focus();
				}
				sMsg = sMsg + locMsg + "\n";
				bEdit = true;
			}
		}

		// FIELD Edit =======================================================================================
		// check the length of the Justification field.  crude test to prevent passing the edit test with a single character
		fieldName = "InputJustify";
		fieldValue = getFieldValue (form[fieldName]);
		if (fieldValue.length < 10) {
			if (! bEdit) {
				form["InputJustify"].focus();
			}
			sMsg = sMsg + busMsg + "\n";
			bEdit = true;
		}

		// FIELD Edit =======================================================================================
		// check the length of the Description field.  crude test to prevent passing the edit test with a single character
		fieldName = "InputDesc";
		fieldValue = getFieldValue (form[fieldName]);
		if (fieldValue.length < 10) {
			if (! bEdit) {
				form["InputDesc"].focus();
			}
			sMsg = sMsg + dscMsg + "\n";
			bEdit = true;
		}

		// FIELD Edit =======================================================================================
		// # of Practitioners Engaged: make sure the value is numeric, if entered
		var revEdit = new RegExp("^\\d{1,9}$");
		fieldName = "PWayPractEngaged";
		fieldValue = getFieldValue(form[fieldName]);

		// apply reg expression check for a valid numeric value
		if (fieldValue.length > 0) {
			if (!revEdit.test(fieldValue)) {
				if (! bEdit) {
					form["PWayPractEngaged"].focus();
				}
				sMsg = sMsg + practMsg + "\n";
				bEdit = true;
			}
		} else {
			document.forms[0].PWayPractEngaged.value = "0";
		}

		// SUBMIT Test =======================================================================================
		// if the edit failure flag is set then show the message box and return to page
		if (bEdit) {
			alert(sMsg);
			return;
		} else {

			// before sending to the server replace the field with the unformatted value
			document.forms[0].PWayRevTotal.value = revNumT;
			document.forms[0].PWayWebSphereRevPortion.value = revNumP;
			document.forms[0].PWayCloudRecurRev.value = revNumR;

			// also replace the DateNeeded field, as it may have been reformatted for alternate languages
			document.forms[0].PWayNeeded.value = dateValue;

			form.submit();
		}
}
