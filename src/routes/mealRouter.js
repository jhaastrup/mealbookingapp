import express from 'express';
import MealMiddleware from '../middlewares/MealMiddleware';
import MealController from '../controllers/MealController';
import Token from '../helpers/Token';

const mealRouter = express.Router();

mealRouter.post(
  '/',
  Token.verifyToken,
  MealMiddleware.validateCreateMeal,
  MealController.createMeal,
);

export default mealRouter;
