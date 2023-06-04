import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  adviserStatus: { type: String },
  coStatus: { type: String },
  step: { type: Number },
  remarks: { type: Array, default: [{}] },
  submission: { type: Object }
});

mongoose.model('Application', ApplicationSchema);
