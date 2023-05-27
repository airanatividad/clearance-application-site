import mongoose from 'mongoose';

const Application = mongoose.model("Application");

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Application.find({});
    res.send(submissions);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve remarks.' });
  }
};

export { getAllSubmissions };

