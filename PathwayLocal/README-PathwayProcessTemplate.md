# Technical Description of library subroutine PathwayProcessTemplate

This routine is called by view action Pathway/Process New Request

After a web request has been processed by the WebRequestProcessor agent and is now visible in the Inbox, this routine will create the official request document and assign a new request number.

## Step 1 - Stage reply document

After processing is done an email will be sent to the requestor with some fixed text and the new request number.  An important part of this is to set the Principal field so the email is coming from a common identity, not the user's.

```
Set docShow = dbServer.CreateDocument
Call docShow.Replaceitemvalue("Principal", PRINCIPAL)

aReqResp("Line1a") = "This is a confirmation that IBM Cloud PATHway has recently received your Resource Request.  The Request ID"
aReqResp("Line1b") = " and it is currently under review.  If approved, PATHway will assign the appropriate resource. " & NEWLINE & NEWLINE & _
...
```

## Step 2 - Validate Input

A separate routine PathwayTemplateDialog() is called to allow the user to review and validate the request input.  

## Step 3 - Generate new request

There is a global profile document that contains, among other things, the current request number.  That number is retrieved and used as the base for calculating new request numbers.  Note that there is a locking process used when updating the global profile document.   This was put in place when there were multiple users processing requests.  The locking class is defined in library file PathwayCommon/DocumentLock.

```
Dim lockObj As New DocumentLock

Set view = dbServer.GetView(v_PROFILE)
Set docProfile = view.GetFirstDocument
Call lockObj.lockDocuments(docProfile)
```

It's possible for the request to specify multiple partners.  So, requests are generated by looping through the list of partner names, incrementing the current request number for each.  

```
ForAll partnerEntry In doc.Getfirstitem("PWayISV").Values
  nReq = nReq + 1
```

A single Reply document is created with information on the new request(s) and sent to the requestor.  

## Step 4 - Update profile

The global profile document is updated with the new request id and unlocked for

```
If (lockObj.checkLock) Then
  Call docProfile.ReplaceItemValue(f_CNTR, nReq)
...

Sub_Exit:
If Not (lockObj Is Nothing) Then
  Call lockObj.releaseDocuments(False)
```