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
}

export default Token;
