import mongoose from "mongoose";

const { Schema } = mongoose;

interface IMemo {
  user: mongoose.Schema.Types.ObjectId;
  icon: string;
  title: string;
  description: string;
  position: number;
  favorite: boolean;
  favoritePosition: number;
}

const memoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "タイトルなし",
    required: true,
  },
  description: {
    type: String,
    default: "説明なし",
  },
  position: {
    type: Number,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
});

const Memo = mongoose.model<IMemo>("Memo", memoSchema);

export { memoSchema, Memo, IMemo };
