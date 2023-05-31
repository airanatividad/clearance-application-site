import {
  addApplication,
  deleteApplication,
  getAllApplications,
  getApplicationStatusByEmail,
  getApplicationsByEmail,
  getApplicationsByStatus,
  getCurrentApplicationByEmail,
  updateAppStatusByEmail,
  updateRemarksByEmail,
  updateSubmissionLinkByEmail,
  returnApplicationByEmail
} from './controllers/apps-controller.js';
import { checkIfLoggedIn, login, signUp } from "./controllers/auth-controller.js";
import { 
  addApprover,
  deleteUserByEmail,
  getAllStudents,
  getAllUsers,
  getStudentByEmail,
  getUserAdviserByEmail,
  getUserStatusByEmail,
  getUserTypeByEmail,
  updateUserStatus,
  getPendingStudents,
  updateAdviserByStudno,
  updateUserByEmail,
  getApproverByName } from "./controllers/user-controller.js";

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
  app.get("/get-user-status-by-email", getUserStatusByEmail);
  app.post("/add-approver", addApprover);
  app.post("/delete-user-by-email", deleteUserByEmail);
  app.post("/update-user-status-by-email", updateUserStatus);

  // applications
  app.get("/get-applications", getAllApplications);
  app.post("/add-application", addApplication);
  app.post("/delete-application", deleteApplication);
  app.get("/get-applications-by-email", getApplicationsByEmail);
  app.get("/get-app-status-by-email", getApplicationStatusByEmail);
  app.post("/update-app-status-by-email", updateAppStatusByEmail);
  app.post("/update-remarks-by-email", updateRemarksByEmail);
  app.post("/update-submission-link-by-email", updateSubmissionLinkByEmail);
  app.get("/get-current-application-by-email", getCurrentApplicationByEmail);
  app.get("/get-applications-by-status", getApplicationsByStatus);
  app.get("/get-pending-users", getPendingStudents);
  app.post("/update-adviser-by-studno",updateAdviserByStudno);
  app.post("/update-user-by-email", updateUserByEmail);
  app.get("/get-approver-by-name", getApproverByName);
  app.post("/return-application-by-email", returnApplicationByEmail);
}

export default setUpRoutes;