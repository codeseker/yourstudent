const firebaseData = {
  regNo: "regNo",
  fullName: "fullName",
  gender: "gender",
  status: "status",
  fatherName: "fatherName",
  course: "course",
  branch: "branch",
  section: "section",
  college: "college",
  dob: "dob",
  medium: "medium",
  universityRollNo: "universityRollNo",
  tenthMaxMarks: "tenthMaxMarks",
  tenthMarksObtained: "tenthMarksObtained",
  tenthPercentage: "tenthPercentage",
  tenthMedium: "tenthMedium",
  tenthYearOfPass: "tenthYearOfPass",
  tenthBoardName: "tenthBoardName",
  twelfthMaxMarks: "twelfthMaxMarks",
  twelfthMarksObtained: "twelfthMarksObtained",
  twelfthPercentage: "twelfthPercentage",
  twelfthMedium: "twelfthMedium",
  twelfthYearOfPass: "twelfthYearOfPass",
  twelfthBoardName: "twelfthBoardName",
  diplomaMaxMarks: "diplomaMaxMarks",
  diplomaMarksObtained: "diplomaMarksObtained",
  diplomaPercentage: "diplomaPercentage",
  diplomaBoardName: "diplomaBoardName",
  diplomaCollegeNameLocation: "diplomaCollegeNameLocation",
  sem1Marks: "sem1Marks",
  sem1Percentage: "sem1Percentage",
  sem1Backlogs: "sem1BackLogs",
  sem2Marks: "sem2Marks",
  sem2Percentage: "sem2Percentage",
  sem2Backlogs: "sem2Backlogs",
  sem3Marks: "sem3Marks",
  sem3Percentage: "sem3Percentage",
  sem3Backlogs: "sem3Backlogs",
  sem4Marks: "sem4Marks",
  sem4Percentage: "sem4Percentage",
  sem4Backlogs: "sem4Backlogs",
  sem5Marks: "sem5Marks",
  sem5Percentage: "sem5Percentage",
  sem5Backlogs: "sem5Backlogs",
  sem6Marks: "sem6Marks",
  sem6Percentage: "sem6Percentage",
  sem6Backlogs: "sem6Backlogs",
  sem7Marks: "sem7Marks",
  sem7Percentage: "sem7Percentage",
  sem7Backlogs: "sem7Backlogs",
  sem8Marks: "sem8Marks",
  sem8Percentage: "sem8Percentage",
  sem8Backlogs: "sem8Backlogs",
  cgpa: "cgpa",
  obtainedMarks: "obtainedMarks",
  maxMarks: "maxMarks",
  ugPercentage: "ugPercentage",
  tenthAndTwelfthGap: "tenthAndTwelfthGap",
  twelfthAndUgGap: "twelfthAndUgGap",
  academicGap: "academicGap",
  totalBacklogs: "totalBacklogs",
  mobileNumber: "mobileNumber",
  fatherMobileNo: "fatherMobileNo",
  alternateMobileNo: "alternateMobileNo",
  primaryEmailId: "primaryEmailId",
  alternateEmailId: "alternateEmailId",
  motherName: "motherName",
  permanentAddress: "permanentAddress",
  homeTown: "homeTown",
  hostellerOrDayscholar: "hostellerOrDayscholar",
  state: "state",
};

export const mapResponseToFirebaseData = (response: any) => {
  // Utility function to handle undefined values
  const handleUndefined = (value: any) => (value !== undefined ? value : "");

  return {
    [firebaseData.regNo]: handleUndefined(response["Reg. No."]),
    [firebaseData.fullName]: handleUndefined(response["Name of Student"]),
    [firebaseData.gender]: handleUndefined(response.Gender),
    [firebaseData.status]: handleUndefined(response.Status),
    [firebaseData.fatherName]: handleUndefined(response["Father's Name"]),
    [firebaseData.branch]: handleUndefined(response.Branch),
    [firebaseData.section]: handleUndefined(response.Section),
    [firebaseData.college]: handleUndefined(response.College),
    [firebaseData.dob]: handleUndefined(response["DOB\r\n(DD-MM-YY)"]),
    [firebaseData.medium]: handleUndefined(response["Medium\r\nHindi/English"]),
    [firebaseData.universityRollNo]: handleUndefined(
      response["University \r\nRoll No."]
    ),
    [firebaseData.tenthMaxMarks]: handleUndefined(
      response["10th\r\nMax Marks"]
    ),
    [firebaseData.tenthMarksObtained]: handleUndefined(
      response["10th\r\nMarks Obtained"]
    ),
    [firebaseData.tenthPercentage]: handleUndefined(response["10th\r\n%"]),
    [firebaseData.tenthMedium]: handleUndefined(
      response["10th Medium\r\nHindi/English"]
    ),
    [firebaseData.tenthYearOfPass]: handleUndefined(
      response["10th (Secondary) \r\nYear of pass"]
    ),
    [firebaseData.tenthBoardName]: handleUndefined(
      response["10th\r\nBoard Name"]
    ),
    [firebaseData.twelfthMaxMarks]: handleUndefined(
      response["12th\r\nMax Marks"]
    ),
    [firebaseData.twelfthMarksObtained]: handleUndefined(
      response["12th\r\nMarks Obtained"]
    ),
    [firebaseData.twelfthPercentage]: handleUndefined(response["12th\r\n%"]),
    [firebaseData.twelfthMedium]: handleUndefined(
      response["12th Medium\r\nHindi/English"]
    ),
    [firebaseData.twelfthYearOfPass]: handleUndefined(
      response["12th\r\n(Sr. Secondary)\r\nYear of pass"]
    ),
    [firebaseData.twelfthBoardName]: handleUndefined(
      response["12th\r\nBoard Name"]
    ),
    [firebaseData.sem1Marks]: handleUndefined(response["SEM-1\r\nMarks"]),
    [firebaseData.sem1Percentage]: handleUndefined(
      response["SEM-1\r\nPerc(%)"]
    ),
    [firebaseData.sem1Backlogs]: handleUndefined(response["SEM-1\r\nBacklogs"]),
    [firebaseData.sem2Marks]: handleUndefined(response["SEM-2\r\nMarks"]),
    [firebaseData.sem2Percentage]: handleUndefined(
      response["SEM-2\r\nPerc(%)"]
    ),
    [firebaseData.sem2Backlogs]: handleUndefined(response["SEM-2\r\nBacklogs"]),
    [firebaseData.sem3Marks]: handleUndefined(response["SEM-3\r\nMarks"]),
    [firebaseData.sem3Percentage]: handleUndefined(
      response["SEM-3\r\nPerc(%)"]
    ),
    [firebaseData.sem3Backlogs]: handleUndefined(response["SEM-3\r\nBacklogs"]),
    [firebaseData.sem4Marks]: handleUndefined(response["SEM-4\r\nMarks"]),
    [firebaseData.sem4Percentage]: handleUndefined(
      response["SEM-4\r\nPerc(%)"]
    ),
    [firebaseData.sem4Backlogs]: handleUndefined(response["SEM-4\r\nBacklogs"]),
    [firebaseData.sem5Marks]: handleUndefined(response["SEM-5\r\nMarks"]),
    [firebaseData.sem5Percentage]: handleUndefined(
      response["SEM-5\r\nPerc(%)"]
    ),
    [firebaseData.sem5Backlogs]: handleUndefined(response["SEM-5\r\nBacklogs"]),
    [firebaseData.sem6Marks]: handleUndefined(response["SEM-6\r\nMarks"]),
    [firebaseData.sem6Percentage]: handleUndefined(
      response["SEM-6\r\nPerc(%)"]
    ),
    [firebaseData.sem6Backlogs]: handleUndefined(response["SEM-6\r\nBacklogs"]),
    [firebaseData.sem7Marks]: handleUndefined(response["SEM-7\r\nMarks"]),
    [firebaseData.sem7Percentage]: handleUndefined(
      response["SEM-7\r\nPerc(%)"]
    ),
    [firebaseData.sem7Backlogs]: handleUndefined(response["SEM-7\r\nBacklogs"]),
    [firebaseData.sem8Marks]: handleUndefined(response["SEM-8\r\nMarks"]),
    [firebaseData.sem8Percentage]: handleUndefined(
      response["SEM-8\r\nPerc(%)"]
    ),
    [firebaseData.sem8Backlogs]: handleUndefined(response["SEM-8\r\nBacklogs"]),
    [firebaseData.cgpa]: handleUndefined(response.CGPA),
    [firebaseData.obtainedMarks]: handleUndefined(
      response["Obtained\r\nMarks"]
    ),
    [firebaseData.maxMarks]: handleUndefined(response["Max\r\nMarks"]),
    [firebaseData.ugPercentage]: handleUndefined(response["UG%"]),
    [firebaseData.tenthAndTwelfthGap]: handleUndefined(
      response["10th & 12th Gap"]
    ),
    [firebaseData.twelfthAndUgGap]: handleUndefined(response["12th & UG Gap"]),
    [firebaseData.academicGap]: handleUndefined(
      response["Academic Gap \r\n(in years)"]
    ),
    [firebaseData.totalBacklogs]: handleUndefined(
      response["Total\r\nBacklogs"]
    ),
    [firebaseData.mobileNumber]: handleUndefined(response["Mobile No.\r\n1"]),
    [firebaseData.fatherMobileNo]: handleUndefined(
      response["Father's \r\nMobile No."]
    ),
    [firebaseData.primaryEmailId]: handleUndefined(
      response["Primary E-mail ID"]
    ),
    [firebaseData.motherName]: handleUndefined(response["Mother's Name"]),
    [firebaseData.permanentAddress]: handleUndefined(
      response["Permanenet Address"]
    ),
    [firebaseData.homeTown]: handleUndefined(
      response["Home Town\r\n(Native Place)"]
    ),
    [firebaseData.hostellerOrDayscholar]: handleUndefined(
      response["HOSTELLER /\r\nDAYSCHOLAR"]
    ),
    [firebaseData.state]: handleUndefined(response.State),
  };
};

export default firebaseData;
