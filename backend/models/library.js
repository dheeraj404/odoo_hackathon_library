import mongoose from "mongoose";

const { Schema } = mongoose;

const librarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    library_code: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Library = mongoose.model("Library", librarySchema);

export default Library;
