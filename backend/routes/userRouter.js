import { Router } from 'express';
import { registerLibraryWithAdmin,login,getProfile,registerNewUser } from '../controllers/userController.js';
import { checkUserAuthentication } from '../middlewares/Auth.js';

const router = Router();

// Routes
router.post('/login', login);
router.get('/profile', checkUserAuthentication, getProfile);
router.post('/register', registerLibraryWithAdmin);
router.post('/register-new-user', registerNewUser);
export default router;
