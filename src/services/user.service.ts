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
   * it returns a list of all users.
   * @returns The list of users.
  */
  async list() {
    return User.find();
  }

  /**
 * `Hash a password using 12 rounds of bcrypt.`
 * @param {string} password - The password to be hashed.
 * @returns The hashed password.
 */
  private async hashPassword(password: string) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  }

  /**
 * Compare the password provided by the user with the password stored in the database.
 * @param {string} password - The password that the user is attempting to authenticate with.
 * @param {string} userPassword - The password that was entered by the user.
 * @returns A boolean value.
 */
  private async comparePasswords(password: string, userPassword: string): Promise<boolean> {
    return compare(password, userPassword);
  }

  /**
 * `Get a user by id`.
 * @param {string} id - string - The id of the user to get.
 * @returns The user object.
 */
  public async getById(id: string): Promise<UserResponse> {
    const user = await User.findOne(id);
    if (!user) {
      throw new CustomError(ERROR_TYPE.NOT_FOUND, 'id');
    }
    return user;
  }

  /**
 * "Get a user by their email address."
 * @param {string} email - string - The email of the user to find.
 * @returns The user object.
 */
  public async getByEmail(email: string): Promise<UserResponse | undefined> {
    const user = await User.findOne({ email });
    return user;
  }

  /**
   * Create a new user.
   * @param {RegisterInput} payload - RegisterInput
   * @returns The user object.
  */
  async create(payload: RegisterInput): Promise<UserResponse> {
    const {
      email, username, password,
    } = payload;
    // check if the user already exists
    const userResponse = await this.getByEmail(email);
    if (userResponse) {
      throw new CustomError(ERROR_TYPE.CONFLICT, 'email', `User with ${email} already exists`);
    }
    const hashedPassword = await this.hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }

  /**
   * Given a user's email and password, return the user's information if the password is correct.
   * @param {LoginInput} payload - LoginInput
   * @returns The user response.
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
