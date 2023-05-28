import mongoose from 'mongoose';

const Application = mongoose.model("Application");
const Remarks = mongoose.model("Remarks");
const Submission = mongoose.model("Submission");
const User = mongoose.model("User");

// STUDENT !
//save clearance application with remarks and submission
const addApplication = async (req, res) => {
  try {
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
    let cust = await User.updateOne({email: req.body.email},{$set:{applications: [newApp]}})
    
    const result = await newApp.save();
    if (result._id && cust) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to add application.' });
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

const getApplicationStatusByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.query.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    //find the latest application id of user
    const latestApp = user.applications.slice(-1);
    const application = await Application.findOne({ _id: latestApp });

    //using the application id, get status
    res.send(application.status);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve applications.' });
  }
};

const updateAppStatusByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    //find the latest application id of user
    const latestApp = user.applications.slice(-1);

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
      step: 1
    };

    //find the latest application id of user
    const latestApp = user.applications.slice(-1);

    //using the application id, update status
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

const updateSubmissionLinkByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const submission = {
      link: req.body.link,
      date: Date(Date.now()),
      step: 1
    };

    //find the latest application id of user
    const latestApp = user.applications.slice(-1);

    //using the application id, update status
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

//APPROVER
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
  deleteApplication };

