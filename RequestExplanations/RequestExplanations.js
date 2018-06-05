function open_new_window(entry) {
	newwindow = open("","hoverwindow","width=700,height=500,left=200,top=30");

	// open new document
	newwindow.document.open();

	// Text of the new document
	// Replace your " with ' or \" or your document.write statements will fail
	newwindow.document.write('<html><title>PATHWay Dictionary</title><body>');

	// build common section of page
	newwindow.document.write('<table width="100%" border="0" cellspacing="0" cellpadding="0">');
	newwindow.document.write('<tr valign="top"><td width="100%"><img src="/Dept/WCC/pathway.nsf/2ee8a228b2ec9d198525760900736b6e/$Body/0.3740?OpenElement&amp;FieldElemFormat=gif" width="180" height="25"></td></tr>');
	newwindow.document.write('</table>');
	newwindow.document.write('<div align="center"></div>');
	newwindow.document.write('<table border="1">');
	newwindow.document.write('<tr valign="top"><td width="900" bgcolor="#5291EF"><div align="center"><b><font size="6">PATHway Dictionary</font></b></div></td></tr>');
	newwindow.document.write('</table><br>');

	// current sections:
	//   sk for 'Skills Needed'
	//   ef for 'Engagement Effort'
	//   fw for 'Framework' definitions
	if (entry == 'sk') {
		newwindow.document.write('<p><b><font size="3">Required Skills:</font></b><br><br>');
		newwindow.document.write('<font size="3">1. A detailed description of the skill-sets essential to enable PATHway to identify suitable resources.</font><br><br>');
		newwindow.document.write('<font size="3">Example - &quot;Full SOA / BPM methodology expertise and experience. &nbsp;Need to be able to </font><br>');
		newwindow.document.write('<font size="3">provide best practices and pitfalls of SOA/BPM implementations.&quot;</font><br>');
	}
	else if (entry == 'ef') {
		newwindow.document.write('<p><b><font size="3">Engagement Effort</font></b><font size="3">:</font><br><br>');
		newwindow.document.write('<font size="3">1. An estimation of the amount of effort that will be expended, not necessarily the </font><br>');
		newwindow.document.write('<font size="3">number of calendar days covered.</font><br>');
		newwindow.document.write('<p><font size="3">Example 1: &nbsp;Work is done for the engagement 2 days a week for three weeks. </font><br>');
		newwindow.document.write('<font size="3">That would span 3 weeks on the calendar. &nbsp;This would be described</font><br>');
		newwindow.document.write('<font size="3">as a 6 day engagement: &nbsp;(2 days) * (3 weeks) = 6 engagement days.</font><br>');
		newwindow.document.write('<p><font size="3">Example 2: Work is done 1 hour every Monday for 6 months. &nbsp;As expected,</font><br>');
		newwindow.document.write('<font size="3">that would span 6 months on the calendar. &nbsp;This would be described</font><br>');
		newwindow.document.write('<font size="3">as a 3 day engagement: &nbsp;(1 hour) * (4 weeks/month) * 6 months = 24 hours = 3 days.</font><br>');
	}
	else if (entry == 'fw') {
		newwindow.document.write('<p><b><font size="3">Framework Definitions</font></b><font size="3">:</font><br><br>');
		newwindow.document.write('<font size="3">BTF: Banking Industry Framework</font><br>');
		newwindow.document.write('<font size="3">CBRF: </font><br>');
		newwindow.document.write('<font size="3">CBRM: </font><br>');
		newwindow.document.write('<font size="3">CCI: </font><br>');
		newwindow.document.write('<font size="3">C&P IIF: Chemical &amp; Petroleum Integrated Information Framework</font><br>');
		newwindow.document.write('<font size="3">HIF: Healthcare Integration Framework</font><br>');
		newwindow.document.write('<font size="3">IIF: Integrated Information Framework</font><br>');
		newwindow.document.write('<font size="3">IPA: Insurance Process Acceleration</font><br>');
		newwindow.document.write('<font size="3">Media Hub: </font><br>');
		newwindow.document.write('<font size="3">MIF: </font><br>');
		newwindow.document.write('<font size="3">NCO: Government Network Centric Operations Framework</font><br>');
		newwindow.document.write('<font size="3">PDIF: Product Development Integration Framework</font><br>');
		newwindow.document.write('<font size="3">PFFS: </font><br>');
		newwindow.document.write('<font size="3">Retail: Retail Integration Framework</font><br>');
		newwindow.document.write('<font size="3">SAFE: Solution Architecture for Energy &amp; Utilities Framework </font><br>');
		newwindow.document.write('<font size="3">SPDE: Service Provider Delivery Environment</font><br>');
	}
	newwindow.document.write('<body></html>');

	// close the document
	newwindow.document.close();
}

// This is the function that will close the
// new window when the mouse is moved off the link
function close_window() {
	newwindow.close();
}
