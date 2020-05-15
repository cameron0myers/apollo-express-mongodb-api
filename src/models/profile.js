import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const profileSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      validate: [isEmail, 'No valid email address provided.'],
    },
    title: {
      type: String,
    },
    address: {
      state: {
        type: String,
      },
      city: {
        type: String,
      },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    strict: false,
  },
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
