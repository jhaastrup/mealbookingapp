import models from '../db/models';
import emailValidation from '../helpers/emailValidation';

const { User } = models;

class AuthMiddleware {
  static async signupValidation(req, res, next) {
    let errors = false;
    const {
      fullName,
      username,
      email,
      password
    } = req.body;

    const checkEmail = await User.findOne({
      where: {
        email
      },
    });

    if (!fullName) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Fullname cannot be empty',
      };
    }
    if (!username) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Username cannot be empty',
      };
    }
    if (!email) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Email cannot be empty',
      };
    }
    if (!emailValidation(email)) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Invalid email format',
      };
    }
    if (checkEmail) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Email already exists',
      };
    }
    if (!password) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Password cannot be empty',
      };
    }

    if (errors) {
      return res.status(400).send(errors);
    }

    next();
  }

  static loginValidation(req, res, next) {
    const { email, password } = req.body;
    let errors = false;
    if (!emailValidation(email)) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Invalid email format',
      };
    }
    if (!email) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Email cannot be empty',
      };
    }
    if (!password) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Password cannot be empty',
      };
    }

    if (errors) {
      return res.status(400).send(errors);
    }

    next();
  }
}

export default AuthMiddleware;
