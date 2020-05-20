import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    company: {
      type: String,
    },
    source: {
      type: String,
    },
    platform: {
      type: String,
    }
  },
  {
    timestamps: true,
  },
); // job model

const Job = mongoose.model('Job', jobSchema);

export default Job;
