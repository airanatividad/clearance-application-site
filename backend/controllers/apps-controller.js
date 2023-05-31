import mongoose from 'mongoose';

const Application = mongoose.model("Application");
const User = mongoose.model("User");

// STUDENT

// Open a clearance application
// Input: { email: String, remark: String, commenter: String, link: String }
// Output: { success: Boolean }
const addApplication = async (req, res) => {
  try {
    //save clearance application with remarks and submission
    const newApp = new Application({
      status: 'Open',
      step: 1,
      remarks: [{
        remark: req.body.remark,
        date: Date(Date.now()),
        commenter: req.body.commenter, //email
        step: 1
      }],
      submission: {
        link: req.body.link,
        date: Date(Date.now()),
        step: 1
      },
    });

    //update application array in User. update using email
    let user = await User.updateOne({email: req.body.email},{$push:{applications: [newApp]}})
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const result = await newApp.save();
    if (result._id && user) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to add application.' });
  }
}

// Update/Close a clearance application
// Approve application at current step (Cleared)
// Input: { email: String, status: String (Open/Pending/Closed/Cleared) }
// Output: { success: Boolean }
const updateAppStatusByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    //find the latest application id of user
    const latestApp = user.applications.slice(-1);
    if (user.applications.length == 0) {
      res.send({ error: 'No application found.' });
    }

    //using the application id, update status
    const application = await Application.updateOne({_id: latestApp},{$set:{status: req.body.status}})
    if (application.acknowledged) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};

// View status of clearance applications
// Input: /...?email=String
// Output: { String (Open/Pending/Closed/Cleared) }
const getApplicationStatusByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.query.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    //find the latest application id of user
    const latestApp = user.applications.slice(-1);
    if (user.applications.length == 0) {
      res.send({ error: 'No application found.' });
    }

    const application = await Application.findOne({ _id: latestApp });

    //using the application id, get status
    res.send(application.status);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};

// Resubmit a returned application at the current step
// Input: { email: String, remark: String, commenter: String, step: Number }
// Output: { success: Boolean }
const updateRemarksByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const remarks = {
      remark: req.body.remark,
      date: Date(Date.now()),
      commenter: req.body.commenter, //email
      step: Number(req.body.step)
    };

    //find the latest application id of user
    const latestApp = user.applications.slice(-1);

    //using the application id, update remarks
    const application = await Application.updateOne({ _id: latestApp },{$push:{remarks: remarks}})
    if (application.acknowledged) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};
// Input: { email: String, link: String, step: Number }
// Output: { success: Boolean }
const updateSubmissionLinkByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const submission = {
      link: req.body.link,
      date: Date(Date.now()),
      step: Number(req.body.step)
    };

    //find the latest application id of user
    const latestApp = user.applications.slice(-1);

    //using the application id, update submission
    const application = await Application.updateOne({ _id: latestApp },{$set:{submission: submission}})
    if (application.acknowledged) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};


// APPROVER

// See list of pending applications that require his/her attention
// Input: /...?status=Pending
// Output: { success: Boolean }
const getApplicationsByStatus = async (req, res) => {
  try {
    const application = await Application.find({status: req.query.status});
    if (!application) {
      return res.status(404).send({ error: 'Application not found.' });
    }
    // sends array of applications
    res.send(application);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};

// See any links/info submitted by the student at ANY step (this means Clearance officer can also see what was submitted to the academic adviser)
// See remarks given to the student at ANY step (this means any remarks can be seen by any approver in the approval chain, even if they didn’t give the remark)
// for (let app in res.body) {
//   console.log(res.body[app].remarks) //get remarks
//   console.log(res.body[app].submission) //get submission
// }
// Input: N/A
// Output: Array of applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find({});
    res.send(applications);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};

// Return application at current step with remarks
// Input: { email: String, remark: String, commenter: String, step: Number, status: String }
// email is student, commenter is approver
// Output: { success: Boolean }
const returnApplicationByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const remarks = {
      remark: req.body.remark,
      date: Date(Date.now()),
      commenter: req.body.commenter, //email
      step: Number(req.body.step)
    };

    //find the latest application id of user
    const latestApp = user.applications.slice(-1);
    if (user.applications.length == 0) {
      res.send({ error: 'No application found.' });
    }

    //using the application id, update remarks
    const appRemarks = await Application.updateOne({ _id: latestApp },{$push:{remarks: remarks}})

    //using the application id, update status
    const appStatus = await Application.updateOne({_id: latestApp},{$set:{status: req.body.status}})
    if (appRemarks.acknowledged && appStatus.acknowledged) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};



// Delete application
// Input: { ? }
// Output: { success: Boolean }
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

// Get application using email
// Input: /...?email=String
// Output: Application object
const getApplicationsByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.query.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    // sends array of application id
    res.send(user.applications);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};

// Get current application using email
// Input: /...?email=String
// Output: Application object
const getCurrentApplicationByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    // last pushed application in the array
    const latestApp = user.applications.slice(-1);
    if (user.applications.length == 0) {
      res.send({ error: 'No application found.' });
    }

    const application = await Application.findOne({ _id: latestApp });
    res.send(application);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve the latest application.' });
  }
};

export {
  addApplication,
  getAllApplications,
  getApplicationsByEmail,
  getCurrentApplicationByEmail,
  getApplicationStatusByEmail,
  updateAppStatusByEmail,
  updateRemarksByEmail,
  updateSubmissionLinkByEmail,
  getApplicationsByStatus,
  deleteApplication,
  returnApplicationByEmail
};

