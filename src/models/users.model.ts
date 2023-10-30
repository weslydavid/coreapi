import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { required: true, type: String, unique: true },
  name: {
    required: true,
    type: String,
  },
  password: { required: true, type: String },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
