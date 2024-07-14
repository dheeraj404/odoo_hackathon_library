import mongoose from "mongoose";

import { Schema } from "mongoose";

const bookLogSchema = new Schema(
  {
    book_id: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issue_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    library_id: {
      type: Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },
    return_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["issued", "returned"],
      default: "issued",
    },
  },
  { timestamps: true }
);

const BookLog = mongoose.model("BookLog", bookLogSchema);

export default BookLog;
