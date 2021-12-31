import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
class Error {
  /**
   *
   *
   * @type {number}
   * @memberof Error
   */
  @Field(() => Int)
    statusCode: number;

  /**
   *
   *
   * @type {string}
   * @memberof Error
   */
  @Field(() => String)
    message: string;

  /**
   *
   *
   * @type {string}
   * @memberof Error
   */
  @Field(() => String, { nullable: true })
    field?: string;
}

export default Error;
