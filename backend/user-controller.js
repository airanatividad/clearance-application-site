import mongoose from 'mongoose';

const User = mongoose.model("User");

const getAllUsers= async (req, res) => {
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

const addStudent = async (req, res) => {
  try {
    const { fname, mname, lname, studno, email, password, usertype, applications, adviser } = req.body;
    const newStudent = new User({ fname, mname, lname, studno, email, password, usertype, applications, adviser });

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

export { getAllUsers, getAllStudents, getStudentByEmail, getUserTypeByEmail, addStudent };
