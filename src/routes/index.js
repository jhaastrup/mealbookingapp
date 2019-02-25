import express from 'express';
import authRouter from './authRouter';
import mealRouter from './mealRouter';

const routers = express.Router();

routers.use('/auth', authRouter);

routers.use('/meals', mealRouter);

export default routers;
