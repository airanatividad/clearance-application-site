import { signUp, login, checkIfLoggedIn } from "./auth-controller.js";
import { getAllUsers, getAllStudents, getStudentByEmail, getUserTypeByEmail, addStudent } from "./user-controller.js";

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
  app.get("/get-usertype-by-email", getUserTypeByEmail)
  app.post("/addStudent", addStudent);
}

export default setUpRoutes;