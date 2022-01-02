import { Service } from 'typedi';
import { compare, hash } from 'bcrypt';
import { CustomError } from '../types/custom-error.type';
import { ERROR_TYPE } from '../constants/errors';
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
  public async getById(id: string): Promise<UserResponse> {
    const user = await User.findOne(id);
    if (!user) {
      throw new CustomError(ERROR_TYPE.NOT_FOUND, 'id');
    }
    return user;
  }

  /**
   *
   *
   * @param {string} email
   * @memberof UserService
   */
  public async getByEmail(email: string): Promise<UserResponse | undefined> {
    const user = await User.findOne({ email });
    return user;
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
    // check if the user already exists
    const userResponse = await this.getByEmail(email);
    if (userResponse) {
      throw new CustomError(ERROR_TYPE.CONFLICT, `User with ${email} already exists`);
    }
    const hashedPassword = await this.hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
  // signup - create a team, admin
  // create-team - teamname, channels, members

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
    if (!userResponse) {
      throw new CustomError(ERROR_TYPE.NOT_FOUND, 'email');
    }
    const validUser = await this.comparePasswords(password, userResponse.password);
    if (!validUser) {
      throw new CustomError(ERROR_TYPE.UNAUTHORIZED, 'password');
    }
    return userResponse;
  }
}

export default UserService;
