import { Field, ObjectType } from 'type-graphql';
import User from '../entities/user.entity';
import Error from './error.type';

@ObjectType()
export class UserResponse {
  @Field({ nullable: true })
    data?: User;

  @Field(() => [Error], { nullable: true })
    errors?: Error[];
}
