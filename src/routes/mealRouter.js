import express from 'express';
import MealMiddleware from '../middlewares/MealMiddleware';
import MealController from '../controllers/MealController';
import Token from '../helpers/Token';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const mealRouter = express.Router();

mealRouter.post(
  '/',
  Token.verifyToken,
  AuthMiddleware.validateAdmin,
  MealMiddleware.validateCreateMeal,
  MealController.createMeal,
);

mealRouter.get(
  '/',
  Token.verifyToken,
  AuthMiddleware.validateAdmin,
  MealController.getAllMeals,
);

export default mealRouter;
