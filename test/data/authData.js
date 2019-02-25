/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';

dotenv.config();

export const adminLogin = {
  email: process.env.ADMINEMAIL,
  password: process.env.ADMINPASS,
};

export const userLogin = {
  email: 'janet@gmail.com',
  password: 'janetto',
};
