import mongoose from 'mongoose';

const User = mongoose.model("User");

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
// Input: { studno: String, adviser_id: String } adviser should be objectid of user
// Output: { "success": Boolean }
const updateAdviserByStudno = async (req, res) => {
  try {
    const user = await User.updateOne({ studno: req.body.studno },{$set:{adviser: User({ _id: req.body.adviser_id })}})
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

// Edit account of users
// Input: { fname: String, mname: String, lname: String, email: String, password: String, status: String, usertype: Number } does not need to input everything
// Output: { success: Boolean }
const updateUserByEmail = async (req, res) => {
  try {
    const { fname, mname, lname, email, password, status, usertype } = req.body;
    const user = await User.updateOne({ email: email },{$set:{fname: fname, mname: mname, lname: lname, password: password, status: status, usertype: usertype}})
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

const getUserAdviserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const student = await User.findOne({ email });

    if (!student) {
      return res.status(404).send({ error: 'Student not found.' });
    }
    console.log(student.email);

    const adviserId = student.adviser;
    const users = await User.find({ _id: adviserId });

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

export { 
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
  updateAdviserByStudno,
  updateUserByEmail,
  getApproverByName };



