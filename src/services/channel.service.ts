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
  public async getByName(name: string): Promise<ChannelResponse | undefined> {
    const team = await Channel.findOne({ name });
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
      const channel = await this.getByName(payload.name);
      if (channel) {
        throw new CustomError(ERROR_TYPE.CONFLICT, `channel with name ${payload.name} already exists`);
      }
    }

    const channel = await Channel.create({
      name: payload.name,
      team,
      admin,
    }).save();

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