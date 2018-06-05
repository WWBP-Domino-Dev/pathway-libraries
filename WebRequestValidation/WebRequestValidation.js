// Provide interface to the agent that authenticates the web user and retrieves their BluePages data.
// The agent is called with an HTTP POST.  This requires both the construction of a valid XML object
// to be used as input and the ability to deconstruct the resulting XML.

function BuildXMLVariables(address, password)
{
	// Construct an XML input object.
	// This first "If" condition tests the browser (for Mozilla, non IE).
	// If you have a specific browser test you'd like to do here, thats fine.
	// If (document.implementation.createDocument)window.XMLHttpRequest
	if (window.DOMParser)
    {

		// Mozilla, Chrome, IE10: create a new DOMParser
        var parser = new DOMParser();
        var xmlString = "";

        // add as many as you'd like to here. These variables will be accessible via the agent.
        xmlString = xmlString + "<address>" + address + "</address>"
        xmlString = xmlString + "<password>" + password + "</password>"

        // wrap the elements in a single top-level element
        xmlString = "<doc>" + xmlString + "</doc>"

        objDOM = parser.parseFromString(xmlString, "text/xml");

        // Debug section; can be removed
    	// resultDoc = objDOM.getElementsByTagName("address");
    	// recordCount = resultDoc.length;
    	// for (i = 0; i < recordCount; i++) {
    	// 	alert("node has value '" + resultDoc[i].childNodes[0].nodeValue + "'")
    	// }
    	// End of Debug section

    }

	// This "If" condition tests the browser (for older IE).  If you have a specific
	// browser test you'd like to do here, thats fine.

    else if (window.ActiveXObject)
    {
    	// IE, create a new XML document using ActiveX
    	// and use loadXML as a DOM parser.
        var objDOM = new ActiveXObject("Microsoft.XMLDOM")
        RootEl = objDOM.createNode(1, "RootElement", "")
        objDOM.documentElement = RootEl

        // add as many of these nodes as you need.
        // these variables will be accessible via the agent.
        objHeaders = objDOM.createNode(1, "address", "")
        objHeaders.text = address
        RootEl.appendChild(objHeaders)
        objHeaders = objDOM.createNode(1, "password", "")
        objHeaders.text = password
        RootEl.appendChild(objHeaders)
    }

    return objDOM;
}

// Cross-Browser ----- Calls the Agent
function runAgent(strAgentName, strXMLvariables)
{
    // Call the agent, which name is provided by the caller.  The format of the POST is
	// dependent on the browser currently used.

	// build the URL string
	var strUrl = "/" + document.forms[0].dbLocation.value + "/" + strAgentName + "?OpenAgent";
    // var stripAddr = address.length + 1

    // alert("Calling validate agent " + strAgentName);

    // This "If" condition tests the browser (for Mozilla, non IE).
    // If you have a specific browser test you'd like to do here, thats fine.
    // if (document.implementation.createDocument)
    if (window.XMLHttpRequest)
    {
        objHTTP = new XMLHttpRequest();
        objHTTP.open("POST", strUrl, false);
    }
    else if (window.ActiveXObject)
    {
        objHTTP = new ActiveXObject("Microsoft.XMLHTTP");
        objHTTP.open("POST", strUrl, false, "", "");
    }

    // objHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Issue the POST to the agent with the XML parameter object
    objHTTP.send(strXMLvariables);

    // The response is in an element of the returned object, and it must be cleaned
    // of any special line-end characters.
    resp = objHTTP.responseText;
    resp = resp.replace(/(\r\n|\n|\r)/g,"");

    objHTTP = null;

    return resp;
}

function startValidate(form)
{
	// Prepare to call the validation agent.  First define a set of possible error messages.
	var result = "";
	var msg1 = "BluePages not responding";
	var msg2 = "No BluePages match";
	var msg3 = "Internal validation failure, contact PATHway administrator";
	var msg4 = "Unable to authenticate: invalid credentials";
	var msg5 = "Unable to find matching entry:";
	var msgList = "ERR| - Document parsing error, please switch to the FireFox browser - BluePages not responding - No BluePages match - Internal validation failure, contact PATHway administrator - Unable to authenticate: invalid credentials - Unable to find matching entry: mail=";

	// Initialize result fields
	document.forms[0].validateMessage.value = "";
	document.forms[0].RequestorName.value = "";

	// Check for missing validation input
	emailAddr = form["PWayAddr"].value;
	password = form["PWayPassword"].value
	if (emailAddr.length == 0) {
		alert("Email address is missing");
		return;
	}
	if (password.length == 0) {
		alert("password value is missing");
		return;
	}

	// Update message set with email address
	msgList += emailAddr;
	// alert("call new agent with [" + emailAddr + "]");

	// Call agent to run BluePages check
	result = runAgent("PathwayEmailValidator", BuildXMLVariables(emailAddr, password));
	result = result.replace(/[\(\)]/g, '');

	// alert("new agent returned [" + result + "].....");
	// alert(result.length);

	// Create regexp with the validation result to test for possible error conditions
	var matcher = new RegExp(result);

	// Create a more generic pattern to look for unknown errors
	var matcher2 = /^ERR /i;

	// The result variable holds the response from the agent.
	document.forms[0].PWayTam.value = result;
	document.forms[0].RequestorName.value = result;

	// if the result doesn't match any of the expected error messages then allow request submission
	// Original test: if (result != msg1 && result != msg2 && result != msg3) {
	if (matcher2.test(result) || result.length < 1)
	{
		// alert("1 test [" + result + "]")
		if (result.length < 1) {
			alert("Missing result from authentication call");
		}
		else {
			alert(result.substring(4));
		}
	}
	else {
		// alert("2 test [" + result + "]")
		// Set the validation fields on the form.
		// If this is a new authentication, and it should be since we're here,
		// set a new cookie and hide the DIV block that contains the authentication fields.
		document.forms[0].validateMessage.value = "OK";
		var userName = getCookie("PATHwayUser");
		if (userName.length == 0) {
			setCookie("PATHwayUser", emailAddr + "|" + result, 92);
			document.getElementById('bpauth').className = 'hidden'
			document.getElementById('operations').className = 'unhidden'
		}
	}

	// Validation might be disabled, so alert the user and allow request submission
	if (document.forms[0].PWayValidateSwitch.value == "0") {
		alert("Validation is disabled, invalid submissions temporarily allowed");
		document.forms[0].validateMessage.value = "OK";
		return;
	}
}

function pathwayInit(form)
{
	// Check to see if a cookie already exists
	var userName = getCookie("PATHwayUser");
	//alert("cookie string is " + userName)

	if (userName.length > 0 && userName != "undefined") {

		// extract parts from the cookie and update fields
		document.forms[0].PWayAddr.value = userName.split("|")[0];
		document.forms[0].PWayTam.value = userName.split("|")[1];
		document.forms[0].RequestorName.value = userName.split("|")[1];
		document.forms[0].validateMessage.value = "OK";

		// switch visibility of the two sections so the auth block is hidden
		document.getElementById('bpauth').className = 'hidden'
		document.getElementById('operations').className = 'unhidden'
	}

	return;
}
