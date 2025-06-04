import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: { 
    type: String, 
    default: null,
  },
  age: { 
    type: Number, 
    min: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true, // optional but recommended
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
