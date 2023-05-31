import mongoose from 'mongoose';

const User = mongoose.model("User");

const getAllUsers = async (req, res) => {
  try {
    const students = await User.find({});
    res.send(students);
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

const getPendingUsers = async (req, res) => {
  try {
    const user = await User.find({status: "Pending"});
    if (!user) {
      return res.status(404).send({ error: 'Application not found.' });
    }
    // sends array of applications
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
}

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

const addStudent = async (req, res) => {
  try {
    const { fname, mname, lname, studno, email, password, status, usertype, applications, adviser } = req.body;
    const newStudent = new User({ fname, mname, lname, studno, email, password, status, usertype, applications, adviser });

    const result = await newStudent.save();

    if (result._id) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to add student.' });
  }
};

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

const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await User.deleteOne({ email });

    if(result.deletedCount == 1){
      res.send({ success: true });
    } else {
      res.send({ success: false });
     }

  } catch (error) {
    res.status(500).send({ error: 'Failed to delete user.' });
  }
};

export { 
  getAllUsers,
  getAllStudents,
  getStudentByEmail,
  getUserTypeByEmail,
  getUserAdviserByEmail,
  getUserStatusByEmail,
  addStudent,
  deleteUserByEmail,
  updateUserStatus,
  getPendingUsers,
  updateAdviserByStudno };



