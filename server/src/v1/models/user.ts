import mongoose from "mongoose";

const { Schema } = mongoose;

interface IUser {
  username: string;
  password: string;
  passwordIv: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordIv: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export { userSchema, User, IUser };
