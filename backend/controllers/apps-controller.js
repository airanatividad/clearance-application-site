import mongoose from 'mongoose';

const Application = mongoose.model("Application");
const User = mongoose.model("User");

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



const addApplication = async (req, res) => {
  try {
    const { status, step, userId } = req.body;

    const newApplication = new Application({
      status,
      step,
      user: userId
    });

    const result = await newApplication.save();

    if (result._id) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to add application.' });
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


export { getAllApplications, getApplicationsByEmail, getCurrentApplicationByEmail, addApplication, deleteApplication };

