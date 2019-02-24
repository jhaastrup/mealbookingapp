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
    })
      .then((response) => {
        const { dataValues } = response;
        const payload = {
          id: dataValues.id,
          username: dataValues.username,
          fullName: dataValues.fullName,
          email: dataValues.email,
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
}

export default AuthController;
