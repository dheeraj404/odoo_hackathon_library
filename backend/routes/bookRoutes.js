import { Router } from 'express';
import { checkUserAuthentication } from '../middlewares/Auth.js';
import {addNewBook,approveOrRejectIssueRequest,searchBooksByAuthor,searchBooksByGenre,searchBooksByTitle,
    getAllIssueRequests,getAllBooks,requestToIssueBook,returnBook,getBooksIssuedReturned,getAllBooksIssuedReturned,getRecommendedBooks
} from '../controllers/bookController.js'

const router = Router();

// Routes
router.post('/add-new-book', checkUserAuthentication, addNewBook);
router.post('/approve-or-reject-issue-request', checkUserAuthentication, approveOrRejectIssueRequest);
router.get('/search-books-by-author/:author', checkUserAuthentication, searchBooksByAuthor);
router.get('/search-books-by-genre/:genre', checkUserAuthentication, searchBooksByGenre);
router.get('/search-books-by-title/:title', checkUserAuthentication, searchBooksByTitle);
router.get('/get-all-issue-requests', checkUserAuthentication, getAllIssueRequests);
router.get('/get-all-books', checkUserAuthentication, getAllBooks);
router.post('/request-to-issue-book', checkUserAuthentication, requestToIssueBook);
router.post('/return-book', checkUserAuthentication, returnBook);
router.get('/get-books-issued-returned', checkUserAuthentication, getBooksIssuedReturned);
router.get('/get-all-books-issued-returned', checkUserAuthentication, getAllBooksIssuedReturned);
router.get('/get-recommended-books', checkUserAuthentication, getRecommendedBooks);

export default router; 