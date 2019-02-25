import models from '../db/models';
import Token from '../helpers/Token';
import PasswordHash from '../helpers/PasswordHash';

const { User } = models;

class AuthController {
  static signup(req, res) {
    const {
      fullName,
      username,
      email,
      password
    } = req.body;

    const hashPassword = PasswordHash.hash(password, 10);

    User.create({
      fullName,
      username,
      email,
      password: hashPassword,
      userType: 'user',
    })
      .then((response) => {
        const { dataValues } = response;
        const payload = {
          id: dataValues.id,
          username: dataValues.username,
          fullName: dataValues.fullName,
          email: dataValues.email,
          userType: dataValues.userType,
        };
        const token = Token.generateToken(payload, '365d');
        res.status(201).json({
          statusText: 'Created',
          status: 201,
          message: 'Signup successful',
          data: {
            token
          }
        });
      })
      .catch(() => {
        res.status(500).json({
          statusText: 'Internal server error',
          status: 500,
          message: 'A server error occured'
        });
      });
  }

  static login(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      },
    })
      .then((response) => {
        if (!response) {
          return res.status(400).json({
            statusText: 'Bad Request',
            status: 400,
            message: 'Your credentials are incorrect'
          });
        }
        const { dataValues } = response;
        const userPassword = dataValues.password;

        if (!PasswordHash.compare(password, userPassword)) {
          res.status(400).json({
            statusText: 'Bad Request',
            status: 400,
            message: 'Your credentials are incorrect'
          });
        } else {
          const user = {
            id: dataValues.id,
            username: dataValues.username,
            fullName: dataValues.fullName,
            email: dataValues.email,
            userType: dataValues.userType,
          };
          const token = Token.generateToken(user, '365d');
          res.status(200).json({
            statusText: 'Ok',
            status: 200,
            message: 'Logged in successfully',
            data: {
              token,
              user,
            }
          });
        }
      });
  }
}

export default AuthController;
