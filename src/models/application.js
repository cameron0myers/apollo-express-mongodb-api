import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    strict: false,
  },
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;
