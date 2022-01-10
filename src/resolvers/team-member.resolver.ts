import {
  Arg, Args, Mutation, Query, Resolver,
} from 'type-graphql';
import { Inject, Service } from 'typedi';
import UserService from '../services/user.service';
import { RegisterInput } from '../input/user.input';
import ChannelService from '../services/channel.service';
import TeamMemberService from '../services/team-member.service';
import TeamMember from '../entities/team-member.entity';
import { CreateMemberResponse, TeamMemberRole, TeamMemberStatus } from '../types/team-member.type';
import { CreateTeamMemberInput, CreateUserAndAddToTeamInput } from '../input/team-member.input';
import TeamService from '../services/team.service';

/**
 *
 *
 * @class TeamMemberResolver
 */
@Service()
@Resolver(() => TeamMember)
class TeamMemberResolver {
  /**
   * Creates an instance of TeamMemberResolver.
   * @param {TeamMemberService} teamMemberService
   * @memberof TeamMemberResolver
   */
  constructor(
    @Inject() private readonly userService: UserService,
    @Inject() private readonly teamService: TeamService,
    @Inject() private readonly teamMemberService: TeamMemberService,
    @Inject() private readonly channelService: ChannelService,
  ) {}

  /**
   *
   *
   * @param {string} teamId
   * @return {*}  {Promise<TeamMember[]>}
   * @memberof TeamMemberResolver
   */
  @Query(() => [TeamMember])
  allTeamMembers(
    @Arg('teamId') teamId: string,
  ): Promise<TeamMember[]> {
    const members = this.teamMemberService.fetchAllByIteam(teamId);
    return members;
  }

  /**
   *
   *
   * @param {CreateUserAndAddToTeamInput} payload
   * @return {*}  {Promise<CreateMemberResponse>}
   * @memberof TeamMemberResolver
   */
  @Mutation(() => CreateMemberResponse)
  async createUserAndAddToTeam(
    @Args() payload: CreateUserAndAddToTeamInput,
  ): Promise<CreateMemberResponse> {
    const registerInput = {} as RegisterInput;
    registerInput.email = payload.email;
    registerInput.username = payload.username;
    registerInput.password = payload.password;
    const user = await this.userService.create(registerInput);
    const teamMemberInput = {} as CreateTeamMemberInput;
    teamMemberInput.userId = user.id;
    teamMemberInput.teamId = payload.teamId;
    teamMemberInput.status = TeamMemberStatus.JOINED;
    teamMemberInput.role = TeamMemberRole.MEMBER;
    const teamMemberPromise = this.teamMemberService.create(teamMemberInput);
    const allChannelPromise = this.channelService.fetchExistingChannelsByTeamId(payload.teamId);
    const teamPromise = this.teamService.getById(payload.teamId); // need to implement transactions
    const [
      _,
      allChannels,
      __,
    ] = await Promise.all([teamMemberPromise, allChannelPromise, teamPromise]);
    return {
      teamId: payload.teamId,
      channelId: allChannels[0]?.id,
      id: user.id,
    };
  }
}

export default TeamMemberResolver;
