---
name: "[BACK END] Bug Report"
about: Create issue for a bug in Back End
title: "[BACK END] Bug Report "
labels: ''
assignees: ''

---

**----BUG1----**
First Patient in the database

**Describe the bug**
The first patient recorded in the database is missing from the application

**To Reproduce**
Steps to reproduce the behavior:
1. Go to MongoDB Compass
2. Check the patient data in the database
3. Notice that the first patient does not appear in the application

**Expected behavior**
All patient records in the database should be visible in the application

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [Windows]
 - Browser [Chrome]
 
 **----BUG2----**
Last Dental Visit Field

**Describe the bug**
The "Last Dental Visit" field in the database does not correctly capture the date entered by the user in the application when creating a patient

**To Reproduce**
Steps to reproduce the behavior:
1.  Input npm run start in the terminal 
2.  Go to http://localhost:3000
3.  Click Patient(sidebar) -> Create Patient 
4.  Fill out all the Information -> Click Submit
5. Check the Last Dental Visit Field in the database

**Expected behavior**
The "Last Dental Visit" field in the database should match the date entered by the user in the application.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [Windows]
 - Browser [Chrome]

 **----BUG3----**
Medical History Not Saving

**Describe the bug**
Cannot Save Medical History Information

**To Reproduce**
Steps to reproduce the behavior:
1.  Input npm run start in the terminal 
2.  Go to http://localhost:3000
3.  Click Patient(sidebar) -> Click any Patient
4. Fill out the required Medical History Information -> Click Save Medical History Changes button

**Expected behavior**
The medical history information should be saved to the database when clicking the "Save Medical History Changes" button.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [Windows]
 - Browser [Chrome]



