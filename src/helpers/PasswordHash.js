import bcrypt from 'bcryptjs';

class PasswordHash {
  static hash(password, salt) {
    return bcrypt.hashSync(password, salt);
  }
}

export default PasswordHash;
