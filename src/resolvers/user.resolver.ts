import {
  Args,
  Mutation, Query, Resolver,
} from 'type-graphql';
import { Inject, Service } from 'typedi';
import { UserResponse } from '../types/user.type';
import UserService from '../services/user.service';
import User from '../entities/user.entity';
import { LoginInput, RegisterInput } from '../input/user.input';

/**
 *
 *
 * @class UserResolver
 */
@Service()
@Resolver(() => User)
class UserResolver {
  constructor(@Inject() private readonly userService: UserService) {}

  /**
   *
   *
   * @return {*}  {Promise<User[]>}
   * @memberof UserResolver
   */
  @Query(() => [User], { nullable: 'items' })
  async getUsers(): Promise<User[]> {
    return this.userService.list();
  }

    /**
     *
     *
     * @param {RegisterInput} payload
     * @return {*}  {Promise<UserResponse>}
     * @memberof UserResolver
     */
    @Mutation(() => UserResponse)
  async register(@Args() payload: RegisterInput): Promise<UserResponse> {
    const userResponse = this.userService.create(payload);
    return userResponse;
  }

     @Mutation(() => UserResponse)
    async login(
       @Args() payload: LoginInput,
    ) {
      const loginResponse = await this.userService.verify(payload);
      return loginResponse;
    }
}

export default UserResolver;
