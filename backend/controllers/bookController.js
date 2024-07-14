import User from "../models/user.js";
import Library from "../models/library.js";
import Book from "../models/book.js";
import BookLog from "../models/bookLog.js";
import { checkUserAuthentication } from "../middlewares/Auth.js";
import { mailSender } from "../utils/mailSender.js";
import IssueRequest from "../models/issueRequest.js";
// add a new book
export const addNewBook = async (req, res) => {
  try {
    const {
      title,
      authors,
      ISBN,
      publisher,
      genre,
      description,
      year,
      small_icon,
      large_icon,
      quantity,
    } = req.body;
    const user = req.user;
    const library_id = user.library_id;
    console.log(user);
    const book = await Book.create({
      title,
      authors,
      ISBN,
      publisher,
      genre,
      description,
      year,
      small_icon,
      large_icon,
      library_id,
      quantity,
    });
    res.status(200).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get all books
export const getAllBooks = async (req, res) => {
  try {
    const user = req.user;
    const books = await Book.find({ library_id: user.library_id });
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// search book by title
export const searchBooksByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const user = req.user;
    const books = await Book.find({
      title: { $regex: title, $options: "i" },
      library_id: user.library_id,
    });
    if (books.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// search books on author
export const searchBooksByAuthor = async (req, res) => {
  try {
    const { author } = req.params;
    const user = req.user;
    const books = await Book.find({
      authors: { $regex: author, $options: "i" },
      library_id: user.library_id,
    });
    if (books.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//search books by genre
export const searchBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const user = req.user;
    const books = await Book.find({
      genre: { $regex: genre, $options: "i" },
      library_id: user.library_id,
    });
    if (books.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// request to issue a book only by a student user and only if quantity > 0

export const requestToIssueBook = async (req, res) => {
  try {
    const { book_id } = req.params;
    const book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    if (book.quantity === 0) {
      return res.status(400).json({
        success: false,
        message: "Book is not available",
      });
    }
    const user = req.user;
    const issueRequest = await IssueRequest.create({
      book_id,
      user_id: user._id,
      library_id: user.library_id,
    });
    res.status(200).json({
      success: true,
      message: "Request sent successfully",
      data: issueRequest,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// get all issue requests to a librarian only
export const getAllIssueRequests = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "librarian") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
    const issueRequests = await IssueRequest.find({
      library_id: user.library_id,
    });
    res.status(200).json({
      success: true,
      message: "Issue requests fetched successfully",
      data: issueRequests,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// approve or reject issue request by librarian only
export const approveOrRejectIssueRequest = async (req, res) => {
  try {
    const { request_id } = req.params;
    const { status } = req.body;
    const user = req.user;
    if (user.role !== "librarian") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
    const issueRequest = await IssueRequest.findById(request_id);
    if (!issueRequest) {
      return res.status(404).json({
        success: false,
        message: "Issue request not found",
      });
    }
    if (issueRequest.library_id.toString() !== user.library_id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
    if (status === "approved") {
      await Book.findByIdAndUpdate(issueRequest.book_id, {
        $inc: { quantity: -1 },
      });
      const bookPayload = {
        book_id: issueRequest.book_id,
        user_id: issueRequest.user_id,
        library_id: issueRequest.library_id,
        return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      };
      await BookLog.create(bookPayload);
    }
    await IssueRequest.findByIdAndUpdate(request_id, { status });

    res.status(200).json({
      success: true,
      message: "Request updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get all books issued returned of all students only to admin and librarian
export const getAllBooksIssuedReturned = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin" && user.role !== "librarian") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
    const books = await BookLog.find({ library_id: user.library_id });
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get all books issued/returned of a user from params

export const getBooksIssuedReturned = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const books = await BookLog.find({ user_id });
    let data = [];
    for (let i = 0; i < books.length; i++) {
      const book = await Book.findById(books[i].book_id);
      data.push({
        book_id: book._id,
        title: book.title,
        issue_date: books[i].issue_date,
        return_date: books[i].return_date,
        status: books[i].status,
        user_id: user._id,
        user_name: user.name,
      });
    }
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// return a book by user done by a librarian only
export const returnBook = async (req, res) => {
  try {
    const { booklog_id, user_id } = req.params;
    const user = req.user;
    if (user.role !== "librarian") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
    const bookLog = await BookLog.findById(booklog_id);
    if (!bookLog) {
      return res.status(404).json({
        success: false,
        message: "Book log not found",
      });
    }
    if (bookLog.user_id.toString() !== user_id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
    await bookLog.updateOne({ status: "returned" });
    await Book.findByIdAndUpdate(bookLog.book_id, {
      $inc: { quantity: 1 },
    });
    res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get recommended books based on user previous issue requests ,issues and returns ..send books of all those authors and same genre
export const getRecommendedBooks = async (req, res) => {
  try {
    const user = req.user;
    const issueRequests = await IssueRequest.find({ user_id: user._id });
    const bookLogs = await BookLog.find({ user_id: user._id });
    const books = await Book.find({
      $or: [
        { authors: { $in: issueRequests.map((request) => request.author) } },
        { genre: { $in: issueRequests.map((request) => request.genre) } },
        { authors: { $in: bookLogs.map((log) => log.author) } },
        { genre: { $in: bookLogs.map((log) => log.genre) } },
      ],
    });
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
