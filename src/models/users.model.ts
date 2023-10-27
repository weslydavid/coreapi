import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
