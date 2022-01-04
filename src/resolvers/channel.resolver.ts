import { Arg, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
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
