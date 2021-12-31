import { ArgsType, Field } from 'type-graphql';
import User from '../entities/user.entity';

/**
 *
 *
 * @class RegisterInput
 * @implements {Partial<User>}
 */
@ArgsType()
class RegisterInput implements Partial<User> {
  /**
   *
   *
   * @type {string}
   * @memberof RegisterInput
   */
  @Field()
    username: string;

  /**
   *
   *
   * @type {string}
   * @memberof RegisterInput
   */
  @Field()
    password: string;

  /**
   *
   *
   * @type {string}
   * @memberof RegisterInput
   */
  @Field()
    email: string;
}

/**
 *
 *
 * @class LoginInput
 * @implements {Partial<User>}
 */
@ArgsType()
class LoginInput implements Partial<User> {
    /**
     *
     *
     * @type {string}
     * @memberof LoginInput
     */
    @Field()
      email: string;

   /**
    *
    *
    * @type {string}
    * @memberof LoginInput
    */
   @Field()
     password: string;
}

// eslint-disable-next-line import/prefer-default-export
export { RegisterInput, LoginInput };
