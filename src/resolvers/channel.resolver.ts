import {
  Arg, Args, Mutation, Query, Resolver,
} from 'type-graphql';
import { Inject, Service } from 'typedi';
import { CreateChannelInput, EditChannelInput } from '../input/channel.input';
import TeamService from '../services/team.service';
import UserService from '../services/user.service';
import Channel from '../entities/channel.entity';
import ChannelService from '../services/channel.service';

/**
 *
 *
 * @class ChannelResolver
 */
@Service()
@Resolver(() => Channel)
class ChannelResolver {
  /**
   * Creates an instance of ChannelResolver.
   * @param {ChannelService} channelService
   * @memberof ChannelResolver
   */
  constructor(
    @Inject() private readonly channelService: ChannelService,
    @Inject() private readonly userService: UserService,
    @Inject() private readonly teamService: TeamService,
  ) {}

  /**
   *
   *
   * @param {string} teamId
   * @return {*}  {Promise<Channel[]>}
   * @memberof ChannelResolver
   */
  @Query(() => [Channel], { nullable: 'items' })
  allChannels(
    @Arg('teamId') teamId: string,
  ): Promise<Channel[]> {
    return this.channelService.fetchExistingChannelsByTeamId(teamId);
  }

  /**
   *
   *
   * @param {CreateChannelInput} payload
   * @param {string} adminId
   * @param {string} teamId
   * @return {*}
   * @memberof ChannelResolver
   */
  @Mutation(() => Channel)
  async createChannel(
    @Args() payload: CreateChannelInput,
    @Arg('adminId') adminId: string,
    @Arg('teamId') teamId: string,
  ) {
    const adminPromise = this.userService.getById(adminId);
    const teamPromise = this.teamService.getById(teamId);
    const [admin, team] = await Promise.all([adminPromise, teamPromise]);
    return this.channelService.create(payload, admin, team);
  }

  /**
   *
   *
   * @param {EditChannelInput} payload
   * @return {*}
   * @memberof ChannelResolver
   */
  @Mutation(() => Channel)
  async editChannel(
    @Args() payload: EditChannelInput,
  ) {
    return this.channelService.edit(payload);
  }

  /**
   *
   *
   * @param {string} channelId
   * @return {*}  {Promise<Channel>}
   * @memberof ChannelResolver
   */
  @Query(() => Channel)
  channel(
    @Arg('channelId') channelId: string,
  ): Promise<Channel> {
    return this.channelService.fetchById(channelId);
  }
}

export default ChannelResolver;
