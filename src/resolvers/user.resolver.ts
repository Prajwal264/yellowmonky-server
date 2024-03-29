import {
  Args,
  Mutation, Query, Resolver,
} from 'type-graphql';
import { Inject, Service } from 'typedi';
import UserService from '../services/user.service';
import TeamService from '../services/team.service';
import TeamMemberService from '../services/team-member.service';
import { RegisterAdminResponse, UserResponse } from '../types/user.type';
import { TeamMemberRole, TeamMemberStatus } from '../types/team-member.type';
import User from '../entities/user.entity';
import { LoginInput, RegisterInput } from '../input/user.input';
import { CreateTeamMemberInput } from '../input/team-member.input';

/**
 *
 *
 * @class UserResolver
 */
@Service()
@Resolver(() => User)
class UserResolver {
  /**
   * Creates an instance of UserResolver.
   * @param {UserService} userService
   * @param {TeamService} teamService
   * @param {TeamMemberService} teamMemberService
   * @memberof UserResolver
   */
  constructor(
    @Inject()
    private readonly userService: UserService,
    @Inject()
    private readonly teamService: TeamService,
    @Inject()
    private readonly teamMemberService: TeamMemberService,
  ) {}

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
   * @return {*}  {Promise<Partial<RegisterAdminResponse>>}
   * @memberof UserResolver
   */
  @Mutation(() => RegisterAdminResponse)
  async registerAdmin(@Args() payload: RegisterInput): Promise<Partial<RegisterAdminResponse>> {
    const userResponse = await this.userService.create(payload);
    const teamResponse = await this.teamService.create({}, userResponse);

    const createTeamMemberPayload: CreateTeamMemberInput = {} as CreateTeamMemberInput;
    createTeamMemberPayload.role = TeamMemberRole.ADMIN;
    createTeamMemberPayload.status = TeamMemberStatus.JOINED;
    createTeamMemberPayload.userId = userResponse.id;
    createTeamMemberPayload.teamId = teamResponse.id;
    await this.teamMemberService.create(createTeamMemberPayload);

    return { ...userResponse, teamId: teamResponse.id };
  }

  /**
   *
   *
   * @param {LoginInput} payload
   * @return {*}
   * @memberof UserResolver
   */
  @Mutation(() => UserResponse)
  async login(
    @Args() payload: LoginInput,
  ) {
    const loginResponse = await this.userService.verify(payload);
    return loginResponse;
  }
}

export default UserResolver;
