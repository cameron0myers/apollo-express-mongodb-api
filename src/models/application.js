import mongoose from 'mongoose';

export const fieldSchema = new mongoose.Schema({ name: { type: String }, value: { type: String } });

const applicationSchema = new mongoose.Schema(
  {
    fields: [fieldSchema],
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
); // application model for mongodb
// I used array for fields because the fields are dynamic

const Application = mongoose.model('Application', applicationSchema);

export default Application;
