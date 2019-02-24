import express from 'express';
import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const authRouter = express.Router();

authRouter.post(
  '/signup',
  AuthMiddleware.signupValidation,
  AuthController.signup
);

authRouter.post(
  '/login',
  AuthMiddleware.loginValidation,
  AuthController.login
);

export default authRouter;
