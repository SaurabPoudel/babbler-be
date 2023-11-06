import * as express from 'express';
import { loginUserHandler, logoutHandler, registerUserHandler } from '../controller/auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = express.Router();

// Register user
router.post('/register', validate(createUserSchema), registerUserHandler);

// Login user
router.post('/login', validate(loginUserSchema), loginUserHandler);

// Logout user
router.get('/logout', deserializeUser, requireUser, logoutHandler);

// Refresh access token

export default router;
