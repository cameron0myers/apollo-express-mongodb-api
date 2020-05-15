import mongoose from 'mongoose';
import { fieldSchema } from './application';

const profileSchema = new mongoose.Schema(
  {
    fields: [fieldSchema],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
