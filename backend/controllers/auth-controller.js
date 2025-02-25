import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// get user model registered in Mongoose
const User = mongoose.model("User");

const signUp = async (req, res) => {
  const newuser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    studno: req.body.studno,
    
    email: req.body.email,
    password: req.body.password,

    status: req.body.status,
    usertype: req.body.usertype,
    applications: req.body.applications,
    adviser: null,
  });

  if(req.body.mname){
    newuser.mname = req.body.mname;
  }

  const result = await newuser.save();

  if (result._id) {
		res.send({ success: true })
	} else {
		res.send({ success: false })
	}
}

const login = async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password;

  // Check if email exists
  const user = await User.findOne({ email })

  //  Scenario 1 & 2: FAIL - User doesn't exist, FAIL - User account not approved
  if (!user || user.status != "Approved") {
    return res.send({ success: false, reason: 'status' })
  }

  // Check if password is correct using the Schema method defined in User Schema
   user.comparePassword(password, (err, isMatch) => {
    if (err || !isMatch) {
      // Scenario 2: FAIL - Wrong password
      return res.send({ success: false, reason: 'password' });
    }

    // Scenario 3: SUCCESS - time to create a token
    const tokenPayload = {
      _id: user._id
    }

    const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

    // return the token to the client
    return res.send({ success: true, token, username: user.fname, email: email });


  })
}

const checkIfLoggedIn = async (req, res) => {

  if (!req.cookies || !req.cookies.authToken) {
    // FAIL Scenario 1 - No cookies / no authToken cookie sent
    return res.send({ isLoggedIn: false });
  }

  try {
    // try to verify the token
    const tokenPayload = jwt.verify(req.cookies.authToken, 'THIS_IS_A_SECRET_STRING');

    // check if the _id in the payload is an existing user id
    const user = await User.findById(tokenPayload._id)

    if (user) {
      // SUCCESS Scenario - User is found
      return res.send({ isLoggedIn: true })
    } else {
      // FAIL Scenario 2 - Token is valid but user id not found
      return res.send({ isLoggedIn: false })
    }
  } catch {
    // FAIL Scenario 3 - Error in validating token / Token is not valid
    return res.send({ isLoggedIn: false });
  }
}

export { signUp, login, checkIfLoggedIn };

