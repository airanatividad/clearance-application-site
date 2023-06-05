import mongoose from 'mongoose';

const User = mongoose.model("User");
const Application = mongoose.model("Application");

// ADMIN

// View pending student account application requests
// Input: N/A / { status: "Pending", usertype: 1 }
// Output: Array of pending student account application requests
const getPendingStudents = async (req, res) => {
  try {
    const student = await User.find({status: "Pending", usertype: 1});
    if (!student) {
      return res.status(404).send({ error: 'Student not found.' });
    }
    // sends array of users
    res.send(student);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
}

// Approve/Reject application for student accounts
// Input: { email: String, status: String }
// Output: { "success": Boolean }
const updateUserStatus = async (req, res) => {
  try {
    const { email, status } = req.body;
    const student = await User.findOne({ email });

    if (!student) {
      return res.status(404).send({ error: 'Student not found.' });
    }

    const result = await User.updateOne({ email: email }, { $set: { status } });

    if (result) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Failed to change user status.' });
  }
};

// Assign adviser to a student account
// Input: { email: String, adviser_id: String } adviser should be objectid of user
// Output: { "success": Boolean }
const updateAdviserByEmail = async (req, res) => {
  try {
    const { email, adviser_id } = req.body;
    const student = await User.findOne({ email });

    if (!student) {
      return res.status(404).send({ error: 'Student not found.' });
    }

    const result = await User.updateOne({ email }, { adviser: adviser_id });

    if (result) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Failed to update adviser.' });
  }
};
// Update usertype for accounts
// Input: { email: String, userType: String }
// Output: { "success": Boolean }
const updateUserType = async (req, res) => {
  try {
    const { email, usertype } = req.body;
    const student = await User.findOne({ email });

    if (!student) {
      return res.status(404).send({ error: 'Student not found.' });
    }

    const result = await User.updateOne({ email: email }, { $set: { usertype } });

    if (result) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Failed to change user status.' });
  }
};

// Create accounts for approvers
// Input: { fname: String, mname: String, lname: String, email: String, password: String, status: String, usertype: Number }
// Output: { "success": Boolean }
const addApprover = async (req, res) => {
  try {
    const { fname, mname, lname, email, password, status, usertype } = req.body;
    const newApprover = new User({ fname, mname, lname, email, password, status, usertype });

    const result = await newApprover.save();

    if (result._id) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to add approver.' });
  }
};

const getAdvisers = async (req, res) => {
  try {
    const student = await User.find({usertype: 2});
    if (!student) {
      return res.status(404).send({ error: 'Approver not found.' });
    }
    // sends array of users
    res.send(student);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve approvers.' });
  }
}

const getCOs = async (req, res) => {
  try {
    const student = await User.find({usertype: 3});
    if (!student) {
      return res.status(404).send({ error: 'Approver not found.' });
    }
    // sends array of users
    res.send(student);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve approvers.' });
  }
}

// Edit account of users
// Input: { fname: String, mname: String, lname: String, email: String, password: String, status: String, usertype: Number } does not need to input everything
// Output: { success: Boolean }
const updateUserByEmail = async (req, res) => {
  try {
    const { fname, mname, lname, email, newEmail, password, status, usertype } = req.body;
    const user = await User.updateOne({ email: email },{$set:{fname: fname, mname: mname, lname: lname, email: newEmail, password: password, status: status, usertype: usertype}})
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    if (user.acknowledged) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};

// Delete account of users
// Input: { email: String }
// Output: { success: Boolean }
const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await User.deleteOne({ email });

    if (result.deletedCount == 1){
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }

  } catch (error) {
    res.status(500).send({ error: 'Failed to delete user.' });
  }
};

// Search by Approver accounts by name
// Input: { fname: String, mname: String, lname: String } don't need to complete input
// Output: User object
const getApproverByName = async (req, res) => {
  try {
    const { fname, mname, lname } = req.query;
    const approver = await User.findOne(
      {'$or': [
        { fname: new RegExp('^'+fname+'$', "i") },
        { mname: new RegExp('^'+mname+'$', "i") },
        { lname: new RegExp('^'+lname+'$', "i") },
      ], usertype: 2 || 3 });
    if (!approver) {
      return res.status(404).send({ error: 'Approver not found.' });
    }

    res.send(approver);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};




const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve users.' });
  }
};

const getAllStudents = async (req, res) => {
    try {
      const students = await User.find({ usertype: 1 });
      res.send(students);
    } catch (error) {
      res.status(500).send({ error: 'Failed to retrieve students.' });
    }
  };

const getStudentByEmail = async (req, res) => {
  try {
    const student = await User.findOne({ email: req.query.email });
    res.send(student);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve student.' });
  }
};

const getUserTypeByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    
    if (user) {
      const { usertype } = user;
      res.send({ usertype });
    } else {
      res.status(404).send({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve user type.' });
  }
};

// Get adviser by email
// Input: ...?email=email
// Output: User object (use user.fname to get name)
const getUserAdviserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const student = await User.findOne({ email });

    if (!student) {
      return res.status(404).send({ error: 'Student not found.' });
    } 
    console.log(student.email);

    const adviserId = student.adviser;
    const users = await User.findOne({ _id: adviserId });

    if (users.length === 0) {
      return res.status(404).send({ error: 'Adviser not found.' });
    }
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve student adviser.' });
  }
};

const getUserStatusByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const student = await User.findOne({ email });

    if (!student) {
      return res.status(404).send({ error: 'Student not found.' });
    }

    const status = student.status;
    res.send(status);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve user status.' });
  }
}
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.query.email });
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve user.' });
  }
};

const getStudentByAdviserEmail = async (req, res) => {
  try {
    const user = await User.find({});
    const adviser = await User.findOne({ email: req.query.email });
    const arr = [];

    for (let i=0; i<user.length; i++) {
      if (adviser._id.equals(user[i].adviser)) {
        // if adviser is not empty or closed
        const latestApp = user[i].applications.slice(-1);
        const application = await Application.findOne({ _id: latestApp})

        if (user[i].applications.length != 0 && user[i].usertype == 1 && user[i].status == "Approved") {
          if (application.adviserStatus !== 'Closed' && application.coStatus !== 'Closed') {
            if (application.adviserStatus !== 'Cleared') {
              arr.push(user[i]);
            }
          }
        }
      }
    }

    res.send(arr);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve user.' });
  }
};

const getStudentIfClearanceOfficer = async (req, res) => {
  try {
    const user = await User.find({});
    const arr = [];

    for (let i=0; i<user.length; i++) {
      // get latest application
      const latestApp = user[i].applications.slice(-1);
      const application = await Application.findOne({ _id: latestApp})

      if (user[i].applications.length != 0 && user[i].usertype == 1 && user[i].status == "Approved") {
        if (application.adviserStatus !== 'Closed' && application.coStatus !== 'Closed') {
          if (application.adviserStatus === 'Cleared' && application.coStatus !== 'Cleared') {
            arr.push(user[i]);
          }
        }
      }
    }

    res.send(arr);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve user.' });
  }
};

export { 
  getUserByEmail,
  getAllUsers,
  getAllStudents,
  getStudentByEmail,
  getUserTypeByEmail,
  getUserAdviserByEmail,
  getUserStatusByEmail,
  addApprover,
  deleteUserByEmail,
  updateUserStatus,
  getPendingStudents,
  updateAdviserByEmail,
  updateUserByEmail,
  getApproverByName,
  getAdvisers,
  getCOs,
  updateUserType,
  getStudentByAdviserEmail,
  getStudentIfClearanceOfficer };


