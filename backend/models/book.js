import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  library_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  small_icon: {
    type: String,
  },
  large_icon: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
