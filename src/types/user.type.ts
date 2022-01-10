import { Field, ObjectType } from 'type-graphql';
import User from '../entities/user.entity';

/**
 *
 *
 * @export
 * @class UserResponse
 */
@ObjectType()
export class UserResponse extends User {}

@ObjectType()
export class AdminUser extends User {
  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field(() => String)
    teamId: string;
}

/**
 *
 *
 * @export
 * @class RegisterAdminResponse
 */
@ObjectType()
export class RegisterAdminResponse extends AdminUser {
}
