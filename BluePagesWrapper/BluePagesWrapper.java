import swat.*;
import com.ibm.bluepages.*;

import java.util.Vector;

public class BluePagesWrapper {

	/**
	 * @param internetAddr - internet email address of user
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
	public static String getAuth(String internetAddr, String internetPassword) {

		ReturnCode cwaReturn;	// Return object containing code and message
		String cwaReturnMsg;	// Save the return message
		int cwaReturnCode;		// Save the return code
		String bpHost = "bluepages.ibm.com";

		/**
		 * The CWA class will perform an intranet authentication call with the usual id and password.
		 */
		cwaReturn = cwa.authenticate(bpHost, internetAddr,
				internetPassword);

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
