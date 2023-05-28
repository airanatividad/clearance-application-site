import { 
  addApplication,
  getAllApplications,
  getApplicationsByEmail,
  getCurrentApplicationByEmail,
  getApplicationStatusByEmail,
  updateAppStatusByEmail,
  updateRemarksByEmail,
  updateSubmissionLinkByEmail,
  getApplicationsByStatus,
  deleteApplication } from './controllers/apps-controller.js';
import { checkIfLoggedIn, login, signUp } from "./controllers/auth-controller.js";
// import { getAllRemarks } from './controllers/remarks-controller.js';
// import { getAllSubmissions } from './controllers/sub-controller.js';
import { addStudent, deleteUserByEmail, getAllStudents, getAllUsers, getStudentByEmail, getUserAdviserByEmail, getUserTypeByEmail } from "./controllers/user-controller.js";

const setUpRoutes = (app) => {
  app.get("/", (req, res) => { res.send("API Home") });

    // for auth
  app.post("/signup", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);

    // user
  app.get("/get-users", getAllUsers);
  app.get("/get-students", getAllStudents);
  app.get("/get-student-by-email", getStudentByEmail);
  app.get("/get-usertype-by-email", getUserTypeByEmail);
  app.get("/get-user-adviser-by-email", getUserAdviserByEmail);
  app.post("/addStudent", addStudent);
  app.post("/delete-user-by-email", deleteUserByEmail);

  // applications
  app.get("/get-applications", getAllApplications);
  app.post("/add-application", addApplication);
  app.post("/delete-application", deleteApplication);
  app.get("/get-applications-by-email", getApplicationsByEmail);
  app.get("/get-app-status-by-email", getApplicationStatusByEmail);
  app.post("/update-app-status-by-email", updateAppStatusByEmail);
  app.post("/update-remarks-by-email", updateRemarksByEmail);
  app.post("/update-submission-link-by-email", updateSubmissionLinkByEmail);
  app.post("/get-current-application-by-email", getCurrentApplicationByEmail);

  //for approver
  app.get("/get-applications-by-status", getApplicationsByStatus);
  // remarks
  // app.get("/get-remarks", getAllRemarks);
  
  // submissions
  // app.get("/get-submissions", getAllSubmissions);

}

export default setUpRoutes;