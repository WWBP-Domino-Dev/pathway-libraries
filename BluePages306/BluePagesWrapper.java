import com.ibm.bluepages.*;
import swat.*;

import java.util.Vector;
import java.util.Iterator;
import java.util.Hashtable;

public class BluePagesWrapper {

	/**
	 * @param NotesID - Notes ID of user in LDAP format: CN=Miles Davis/OU=Mankato/O=IBM
	 * @return BluePages search result
	 */
	public static String getBPManager(String NotesID) {
		BPResults bpr; 		// Results of BluePages method
		Vector column; 		// One column of results
		String mgrEmail;		// Value extracted from column
		String CNUM;		// Variable for CNUM value

		mgrEmail = "<default>";

		bpr = BluePages.getPersonsByNotesID(NotesID);


/*		String sampleRow;	// for testing row content
		StringBuilder sb;	// for testing row content
		Hashtable h;		// for testing row content
		Iterator imap;		// for testing row content

		h = bpr.getRow(0);
		imap = h.keySet().iterator();
		sb = new StringBuilder();
		while(imap.hasNext()) {
			String key = (String) imap.next();
			sb.append(key);
			sb.append(": ");
			sb.append(h.get(key));
			sb.append("/");
		}
		sampleRow = sb.toString();
*/

		if (bpr.succeeded()) {
			if (bpr.rows() > 0) {
				// look for manager's CNUM value
				if (bpr.hasColumn("MNUM")) {
					// retrieve the manager's CNUM and use it to retrieve their record from BP
					column = bpr.getColumn("MNUM");
					CNUM = (String) column.elementAt(0);
					bpr = BluePages.getPersonByCnum(CNUM);
					if (bpr.succeeded()) {
						if (bpr.rows() > 0) {
							// retrieve the manager's internet address
							column = bpr.getColumn("INTERNET");
							mgrEmail = (String) column.elementAt(0);
						}
					}

				}
			}
			else {
				mgrEmail = "ERR: No rows returned for " + NotesID;
			}
		}
		else {
			mgrEmail = "ERR: " + bpr.getStatusMsg();
		}

		return mgrEmail;
	}


	/**
	 * @param internetAddr - Internet email address of user
	 * @return BluePages search result
	 */
	public static String getBPData(String internetAddr) {
		BPResults bpr; 		// Results of BluePages method
		Vector column; 		// One column of results
		String notesID;		// Value extracted from column
		int position;		// Used when searching id for '@' character

		notesID = "<default>";

		/**
		 * Start with an explicit search using the internet address.
		 * If the search succeeds and there is a NotesID value, then pull out the name string.
		 * if the search succeeds but there is no result, return a string with the error message.
		 */
		bpr = BluePages.getPersonsByInternet(internetAddr);
		if (bpr.succeeded()) {
			if (bpr.rows() > 0) {
				if (bpr.hasColumn("notesID")) {
					column = bpr.getColumn("notesID");
					notesID = (String) column.elementAt(0);
					if (notesID.length() == 0) {
						column = bpr.getColumn("name");
						notesID = (String) column.elementAt(0);
					}
				}
			} else {
				notesID = "ERR No BluePages match";
			}
		} else {
			notesID = "ERR " + bpr.getStatusMsg();
		}

		/**
		 * If the explicit search didn't work try a fuzzy search on only the name of the user.
		 * Same logic for testing the results applies.
		 */
		if (notesID.length() == 0) {
			position = internetAddr.indexOf("@");
			if (position > -1) {
				internetAddr = internetAddr.substring(0, position);
			}
			bpr = BluePages.getPersonsByNameFuzzy(internetAddr);
			if (bpr.succeeded()) {
				if (bpr.rows() > 0) {
					if (bpr.hasColumn("notesID")) {
						column = bpr.getColumn("notesID");
						notesID = (String) column.elementAt(0);
						if (notesID.length() == 0) {
							column = bpr.getColumn("name");
							notesID = (String) column.elementAt(0);
						}
					}
				} else {
					notesID = "ERR No BluePages match";
				}
			} else {
				notesID = "ERR " + bpr.getStatusMsg();
			}
		}

		return notesID;
	}

	/**
	 * @param internetAddr - internet email address of user
	 * @param internetPassword - intranet id password
	 * @return status indicator
	 */
	public static String idAuth(String id, String pw) {

		ReturnCode cwaReturn;	// Return object containing code and message
		String cwaReturnMsg;	// Save the return message
		int cwaReturnCode;		// Save the return code
		String bpHost = "bluepages.ibm.com";

		/**
		 * The CWA class will perform an intranet authentication call with the usual id and password.
		 */
		cwaReturn = cwa.authenticate(bpHost, id, pw);

		/**
		 * The return object has 2 parts, a message string and return code.
		 * A non-zero code will cause us to send back the failure message.
		 */
		cwaReturnMsg = cwaReturn.getMessage();
		cwaReturnCode = cwaReturn.getCode();

		if (cwaReturnCode != 0) {
			cwaReturnMsg = "ERR " + cwaReturnMsg;
		} else {
			cwaReturnMsg = "OK " + cwaReturnMsg;
		}

		return cwaReturnMsg;
	}
}
