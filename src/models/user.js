import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.findByLogin = async function (login) {
  const user = await this.findOne({
    username: login,
  });

  return user;
};

userSchema.pre('remove', function (next) {
  Promise.all([
    this.model('profile').deleteMany({ userId: this._id }),
    this.model('application').deleteMany({ userId: this._id }),
  ]).then(next);
});

const User = mongoose.model('User', userSchema);

export default User;
