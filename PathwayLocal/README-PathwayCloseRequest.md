# Technical Description of library subroutine PathwayCloseRequest

This routine is called by view action Pathway/CloseRequest.  It closes the request, which entails providing additional details on the proposed engagement, including the technical resources assigned to the request.

## Step 1 - Load the engagement rate

Load and lock the global profile.  This document contains a rate value that is used when calculating projected returns.

```
Set view = db.GetView("Pathway Global Profile")
Set docProfile = view.GetFirstDocument
nRate = docProfile.GetItemValue(f_PWRATE)(0)
```

## Step 2 - Validate the close

A subform is presented to the user, "PWayClose".  It provides additional details that need to be provided.

### Example fields:
* Resource Provider organization
* Assigned Resource(s), up to 3
* Revenue - Source, Cost, Amount
* Funding - Funding manager, Rate, T&L
* Product
* Sponsor

## Step 3 - Calculate funding and such

See Mural page https://app.mural.co/t/dougsteam4182/m/dougsteam4182/1529331753439/0fba00e0fe063820f2a04759f7e5748c7da06113 for a visual representation of how the request set is created.

1. Call library subroutine PathwayCalcDuration() to calculate number of business days and ending date
2. Call library subroutine PathwayCloseAllocProviders() to calculate utilization values for assigned resources
3. Call library subroutine PATHwayReqValue() to calculate the funding values based on default rate and utilization of assigned resources

## Step 4 - Final steps

1. Call function PathwayCreateWWBPProject() to conditionally create a corresponding document in the WCC Projects database
2. Create a new supplemental request document for each engagement date
3. Send email to requestor with button to create a personal calendar entry 
