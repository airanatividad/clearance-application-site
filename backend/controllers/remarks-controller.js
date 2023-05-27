import mongoose from 'mongoose';

const Application = mongoose.model("Application");

const getAllRemarks = async (req, res) => {
  try {
    const remarks = await Application.find({});
    res.send(remarks);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve remarks.' });
  }
};

const getRemarksInApplication = async (req, res) => {}

export { getAllRemarks };

