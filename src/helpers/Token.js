import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Token {
  static generateToken(payload, expires) {
    const token = jwt.sign(
      payload,
      process.env.TOKENSECRET,
      { expiresIn: expires }
    );
    return token;
  }

  static async verifyToken(req, res, next) {
    const token = req.headers.authorization
      || req.headers['x-access-token'] || req.query.token || req.body.token;
    if (!token) {
      return res.status(401).send({
        status: 'error',
        message: 'No token provided',
      });
    }
    try {
      const authUser = await jwt.verify(token, process.env.TOKENSECRET);
      req.authUser = authUser;
      return next();
    } catch (error) {
      return res.status(401).send({
        status: 'error',
        message: 'Unauthorized token',
      });
    }
  }
}

export default Token;
