import mongoose from 'mongoose';

const Application = mongoose.model("Application");
const Remarks = mongoose.model("Remarks");
const Submission = mongoose.model("Submission");
const User = mongoose.model("User");

//save clearance application, remarks, and submission
//need to update User document to add reference to Application in array
const addApplication = async (req, res) => {
  const newRemark = new Remarks({
    date: Date.now(),
    step: 3,
    submission: Submission({ _id: req.body.submission_id }), //string
    commenter: User({
      _id: req.body.commenter_id, // req.body.comm_id should be in string
      fname: req.body.fname,
      mname: req.body.mname,
      lname: req.body.lname,
      email: req.body.email,
    }),
    submitter: User({ _id: req.body.submitter_id }) //string
  })

  const newSubmission = new Submission({
    link: req.body.link,
    date: Date.now(),
    step: 3,
    application: Application({ _id: req.body.app_id}), //string
    submitter: User({ _id: req.body.submitter_id }) //string
  })

  const newApp = new Application({
    status: 'Open',
    step: 3,
    remarks: [newRemark], //ref to remarks
    submission: newSubmission, //ref to submission
  });
  
  await newRemark.save();
  await newSubmission.save();
  const result = await newApp.save();

	if (result._id) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
}

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find({});
    res.send(applications);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};

const getApplicationsByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const applications = await Application.find({ _id: { $in: user.applications } });

    res.send(applications);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};


const getCurrentApplicationByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    // by date idk  
    const sortedApplications = user.applications.sort((a, b) => b.createdAt - a.createdAt);

    if (sortedApplications.length === 0) {
      return res.status(404).send({ error: 'No applications found for the user.' });
    }

    const currentApplication = sortedApplications[0];

    res.send(currentApplication);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve the latest application.' });
  }
};

// doesn't reference other documents:
// const addApplication = async (req, res) => {
//   try {
//     const { status, step, userId } = req.body;

//     const newApplication = new Application({
//       status,
//       step,
//       user: userId
//     });

//     const result = await newApplication.save();

//     if (result._id) {
//       res.send({ success: true });
//     } else {
//       res.send({ success: false });
//     }
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to add application.' });
//   }
// };

const deleteApplication = async (req, res) => {
  try {
    const { applicationId, userId } = req.query;

    const application = await Application.findOne({
      _id: applicationId,
      user: userId
    });

    if (!application) {
      return res.status(404).send({ error: 'Application not found.' });
    }

    // Delete the application
    const result = await Application.deleteOne({ _id: applicationId });

    if (result.deletedCount === 1) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete application.' });
  }
};


export { getAllApplications, getApplicationsByEmail, getCurrentApplicationByEmail, addApplication, deleteApplication };

