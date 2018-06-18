# Technical Description of library subroutine PathwayDatabaseArchive

This routine is called by a scheduled agent that runs every weekend.

## Step 1 - Clean archive database

Delete really old cruft from archive, emails older than 5 years, request documents older than 6 years.

```
searchReq = {(Form = "Memo" | Form = "Reply") & (@Adjust(@Created; } & x1 & {; 0; 0; 0; 0; 0) < @Now) & ! @IsAvailable(PWarchived)}
searchReq = {(Form = "PWayData") & (@Adjust(@Created; } & x1 & {; 0; 0; 0; 0; 0) < @Now) & ! @IsAvailable(PWarchived)}
```

## Step 2 - Generate arrays of candidate documents

There is a loop that starts searching further in the past and keeps coming forward until it finds at least 300 mail documents and at least 100 request documents.  The search will also stop if it gets closer than 3 years in the past.  Meaning:

    Current date = March 1, 2018.

Don't archive documents from Jan 1, 2015 - Mar 1, 2018.   This is a moving target that always has to be calculated at run time.

## Step 3 - Copy to archive

Loop through both document collections and copy to archive

```
Set docArch = doc.CopyToDatabase(dbArch)
```

For the email documents also add them to any requestor folder they may be in.

## Step 4 - Post-processing

Flag all archived documents to bypass future archive runs.
The search formulas:

```
searchReq = {(Form = "Memo" | Form = "Reply") & (@Adjust(@Created; } & x1 & {; 0; 0; 0; 0; 0) < @Now) & ! @IsAvailable(__PWarchived__)}
```
