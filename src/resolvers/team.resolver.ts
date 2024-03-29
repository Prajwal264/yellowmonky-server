import {
  Arg,
  Args, Mutation, Query, Resolver,
} from 'type-graphql';
import { Inject, Service } from 'typedi';
import { ChannelResponse } from '../types/channel.type';
import ChannelService from '../services/channel.service';
import TeamService from '../services/team.service';
import { EditTeamInput, InvitedMembersInput } from '../input/team.input';
import Team from '../entities/team.entity';
import { EditTeamResponse, TeamListResponse, TeamResponse } from '../types/team.type';
import UserService from '../services/user.service';

/**
 *
 *
 * @class TeamResolver
 */
@Service()
@Resolver(() => Team)
class TeamResolver {
  /**
   * Creates an instance of TeamResolver.
   * @param {UserService} userService
   * @param {TeamService} teamService
   * @param {ChannelService} channelService
   * @memberof TeamResolver
   */
  constructor(
    @Inject() private readonly userService: UserService,
    @Inject() private readonly teamService: TeamService,
    @Inject() private readonly channelService: ChannelService,
  ) {}

  /**
   *
   *
   * @param {string} id
   * @return {*}  {Promise<TeamResponse>}
   * @memberof TeamResolver
   */
  @Query(() => Team)
  team(
    @Arg('teamId') id: string,
  ): Promise<TeamResponse> {
    return this.teamService.getById(id);
  }

  /**
   *
   *
   * @param {string} userId
   * @return {*}  {Promise<TeamListResponse[]>}
   * @memberof TeamResolver
   */
  @Query(() => [TeamListResponse])
  async allTeams(
    @Arg('userId') userId: string,
  ): Promise<TeamListResponse[]> {
    const teams = await this.teamService.getAllByMemberId(userId);
    return teams;
  }

  /**
   *
   *
   * @private
   * @param {CreateTeamInput} payload
   * @memberof TeamResolver
   */
  @Mutation(() => EditTeamResponse)
  async editTeam(
    @Args() payload: EditTeamInput,
  ): Promise<EditTeamResponse> {
    const teamId = payload.id;
    const adminId = payload.ownerId;
    const editTeamPayload: EditTeamInput = {
      id: teamId,
      ownerId: payload.ownerId,
      name: payload.name,
      displayPicture: payload.displayPicture,
    };
    console.log(editTeamPayload);
    // update team info
    const editTeamPromise = this.teamService.edit(editTeamPayload);
    // create channels
    const existingChannelsPromise = this.channelService.fetchExistingChannelsByTeamId(teamId);
    const adminPromise = this.userService.getById(adminId);
    const teamPromise = this.teamService.getById(teamId);
    const [_, existingChannels, admin, team] = await Promise.all([
      editTeamPromise,
      existingChannelsPromise,
      adminPromise,
      teamPromise,
    ]);
    const channelPromises: Promise<ChannelResponse>[] = [];
    const generalExists = existingChannels.some((channel) => channel.name === 'general');
    if (!generalExists) {
      const createChannelPayload = {
        name: 'general',
      };
      const generalChannelPromise = this.channelService.create(createChannelPayload, admin, team);
      channelPromises.push(generalChannelPromise);
    }
    if (payload.channels?.length) {
      const newChannelPromises = payload.channels.reduce((acc: Promise<ChannelResponse>[], cur) => {
        const createChannelPayload = {
          name: cur,
        };
        const channelPromise = this.channelService.create(createChannelPayload, admin, team);
        acc.push(channelPromise);
        return acc;
      }, []);
      channelPromises.push(...newChannelPromises);
    }
    const channels = await Promise.all(channelPromises);
    existingChannels.push(...channels);
    // invite members
    if (payload.members?.length) {
      const memberInvitePromises = payload.members
        .map((member) => this.teamService.sendInvite(member, { team, inviter: admin }));
      Promise.all(memberInvitePromises); // no need to wait
    }
    return {
      teamId,
      channels: existingChannels.map((channel) => channel.id),
    };
  }

  /**
   *
   *
   * @param {InvitedMembersInput} payload
   * @return {*}
   * @memberof TeamResolver
   */
  @Mutation(() => Boolean)
  async inviteMembers(
    @Args() payload: InvitedMembersInput,
  ) {
    const teamPromise = this.teamService.getById(payload.teamId);
    const inviterPromise = this.userService.getById(payload.inviterId);
    const [team, inviter] = await Promise.all([teamPromise, inviterPromise]);
    const invitePromises = payload.inviteeEmails
      .map((email) => this.teamService.sendInvite(email, { team, inviter }));
    await Promise.all(invitePromises);
    return true;
  }
}

export default TeamResolver;
