---
name: "[BACK END] Bug Report"
about: Create issue for a bug in Back End
title: "[BACK END] Bug Report "
labels: ''
assignees: ''

---

 **----BUG1----**
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

 **----BUG2----**
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

**----BUG3----**
Sex and Occupation not saving

**Describe the bug**
When editing the sex and occupation in the patient information, it does not save the user input

**To Reproduce**
Steps to reproduce the behavior:
1.  Input npm run start in the terminal 
2.  Go to http://localhost:3000
3.  Click Patient(sidebar) -> Click any Patient
4.  Change the sex and occupation field 
5. click the save button

**Expected behavior**
The "sex" and "Occupation" field in the database should match the date entered by the user in the application.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [Windows]
 - Browser [Chrome]

**----BUG4----**
Report Page - Frequency Distribution

**Describe the bug**
Inside the Report page, if I add a month of "November" to the treatment record, The Frequency distribution does also adds it in "September"

**To Reproduce**
Steps to reproduce the behavior:
1.  Input npm run start in the terminal 
2.  Go to http://localhost:3000
3.  Click Patient(sidebar) -> Click any Patient
4.  Add a treatment record that has a Month-Date "November" 
5. Go to Report Page -> Check the Frequency Distribution -> Filter to Month "November"
6. Check the FIlter to the Month "September"

**Expected behavior**
the frequency distribution should not be added to "September" if I add a treatment record during "November"

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [Windows]
 - Browser [Chrome]




