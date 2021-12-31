import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IsEmail } from 'class-validator';
import EntityWrapper from './wrapper';

/**
 *
 *
 * @export
 * @class User
 */
@ObjectType({ implements: EntityWrapper })
@Entity({ name: 'users' })
class User extends EntityWrapper {
  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field()
  @Column()
    username: string;

  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field()
  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid Email' })
    email: string;

  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Column()
    password: string;

  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field({ nullable: true })
  @Column({ name: 'profile_image', nullable: true })
    profileImage?: string;
}

export default User;
