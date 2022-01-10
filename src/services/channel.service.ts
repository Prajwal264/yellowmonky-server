import { Service } from 'typedi';
import Team from '../entities/team.entity';
import User from '../entities/user.entity';
import { CustomError } from '../types/custom-error.type';
import Channel from '../entities/channel.entity';
import { ERROR_TYPE } from '../constants/errors';
import { CreateChannelInput } from '../input/channel.input';
import { ChannelResponse } from '../types/channel.type';

/**
 *
 *
 * @class ChannelService
 */
@Service()
class ChannelService {
  /**
   *
   *
   * @param {string} name
   * @memberof ChannelService
   */
  public async getByName(name: string, teamId: string): Promise<ChannelResponse | undefined> {
    const team = await Channel.findOne({ name, teamId });
    return team;
  }

  /**
   *
   *
   * @memberof ChannelService
   */
  public async create(
    payload: CreateChannelInput,
    admin: User,
    team: Team,
  ): Promise<ChannelResponse> {
    if (payload.name) {
      const channel = await this.getByName(payload.name, team.id);
      if (channel) {
        throw new CustomError(ERROR_TYPE.CONFLICT, `channel with name ${payload.name} already exists`);
      }
    }

    const channel = await Channel.create({
      name: payload.name,
      description: payload.description || '',
      team,
      admin,
    }).save();

    return channel;
  }

  /**
   *
   *
   * @param {string} channelId
   * @return {*}  {Promise<Channel>}
   * @memberof ChannelService
   */
  public async fetchById(channelId: string): Promise<Channel> {
    const channel = await Channel.findOne(channelId);
    if (!channel) {
      throw new CustomError(ERROR_TYPE.NOT_FOUND, 'channelId', 'No Channel Found');
    }
    return channel;
  }

  /**
   *
   *
   * @param {string} teamId
   * @memberof ChannelService
   */
  public async fetchExistingChannelsByTeamId(teamId: string): Promise<Channel[]> {
    const allChannels = await Channel.find({ teamId });
    return allChannels;
  }
}

export default ChannelService;
