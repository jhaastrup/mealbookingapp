import express from 'express';
import authRouter from './authRouter';

const routers = express.Router();

routers.use('/auth', authRouter);

export default routers;
