import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  id: { type: String, default: mongoose.Types.ObjectId, unique: true },
  status: { type: String },
  step: { type: Number },
  remarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Remark' }],
  submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }
});

const SubmissionSchema = new mongoose.Schema({
  id: { type: String, default: mongoose.Types.ObjectId, unique: true },
  link: { type: String },
  date: { type: Date, default: Date.now() },
  step: { type: Number },
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application'},
  submitter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const RemarksSchema = new mongoose.Schema({
  id: { type: String, default: mongoose.Types.ObjectId, unique: true },
  date: { type: Date, default: Date.now() },
  step: { type: Number },
  submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission'},  
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submitter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('Application', applicationSchema);
mongoose.model('Submission', SubmissionSchema);
mongoose.model('Remarks', RemarksSchema);