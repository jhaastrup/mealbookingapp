import bcrypt from 'bcryptjs';

class PasswordHash {
  static hash(password, salt) {
    return bcrypt.hashSync(password, salt);
  }

  static compare(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
}

export default PasswordHash;
