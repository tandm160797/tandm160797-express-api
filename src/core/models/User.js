import bcrypt from 'bcryptjs';
import Mongoose, { Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String
  },
  {
    timestamps: true
  }
);

userSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt : true
});

userSchema.methods.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

userSchema.methods.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

export default Mongoose.model('User', userSchema);
