import { Service } from 'typedi';
import { compare, hash } from 'bcrypt';
import errors, { ERROR_TYPE } from '../constants/errors';
import { UserResponse } from '../types/user.type';
import { LoginInput, RegisterInput } from '../input/user.input';
import User from '../entities/user.entity';

/**
 *
 *
 * @class UserService
 */
@Service()
class UserService {
  /**
   *
   *
   * @return {*}
   * @memberof UserService
   */
  async list() {
    return User.find();
  }

  /**
   *
   *
   * @private
   * @param {string} password
   * @return {*}
   * @memberof UserService
   */
  private async hashPassword(password: string) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  }

  /**
   *
   *
   * @private
   * @param {string} password
   * @param {string} userPassword
   * @return {*}  {Promise<boolean>}
   * @memberof UserService
   */
  private async comparePasswords(password: string, userPassword: string): Promise<boolean> {
    return compare(password, userPassword);
  }

  /**
   *
   *
   * @param {string} email
   * @memberof UserService
   */
  public async getByEmail(email: string): Promise<UserResponse> {
    const user = await User.findOne({ email });
    return {
      data: user,
    };
  }

  /**
   *
   *
   * @param {RegisterInput} payload
   * @memberof UserService
   */
  async create(payload: RegisterInput): Promise<UserResponse> {
    const {
      email, username, password,
    } = payload;
    // if (!email) {
    //   return {
    //     errors: [{
    //       field: 'email',
    //       message: 'Email cannot be empty',
    //       statusCode: errors[ERROR_TYPE.BAD_REQUEST].statusCode,
    //     }],
    //   };
    // }
    // if (!username) {
    //   return {
    //     errors: [{
    //       field: 'username',
    //       message: 'Username cannot be empty',
    //       statusCode: errors[ERROR_TYPE.BAD_REQUEST].statusCode,
    //     }],
    //   };
    // }
    // if (!password) {
    //   return {
    //     errors: [{
    //       field: 'password',
    //       message: 'Password cannot be empty',
    //       statusCode: errors[ERROR_TYPE.BAD_REQUEST].statusCode,
    //     }],
    //   };
    // }
    // if (!accountType) {
    //   return {
    //     errors: [{
    //       field: 'accountType',
    //       message: 'accountType cannot be empty',
    //       statusCode: errors[ERROR_TYPE.BAD_REQUEST].statusCode,
    //     }],
    //   };
    // }
    // check if the user already exists
    const userResponse = await this.getByEmail(email);
    if (userResponse.data) {
      return {
        errors: [{
          field: 'email',
          message: `User with email: ${email} already exists`,
          statusCode: errors[ERROR_TYPE.CONFLICT].statusCode,
        }],
      };
    }
    const hashedPassword = await this.hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();

    return { data: user };
  }

  /**
   *
   *
   * @param {LoginInput} payload
   * @return {*}  {Promise<UserResponse>}
   * @memberof UserService
   */
  async verify(payload: LoginInput): Promise<UserResponse> {
    const { email, password } = payload;
    const userResponse = await this.getByEmail(email);
    if (!userResponse.data) {
      return {
        errors: [{
          field: 'email',
          message: `User with email: ${email} doesn't exist`,
          statusCode: errors[ERROR_TYPE.CONFLICT].statusCode,
        }],
      };
    }

    const validUser = await this.comparePasswords(password, userResponse.data.password);
    if (!validUser) {
      return {
        errors: [{
          field: 'password',
          ...errors[ERROR_TYPE.UNAUTHORIZED],
        }],
      };
    }
    return userResponse;
  }
}

export default UserService;
