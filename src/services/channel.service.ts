import { Inject, Service } from 'typedi';
import Team from '../entities/team.entity';
import User from '../entities/user.entity';
import { CustomError } from '../types/custom-error.type';
import Channel from '../entities/channel.entity';
import { ERROR_TYPE } from '../constants/errors';
import { CreateChannelInput, EditChannelInput } from '../input/channel.input';
import { ChannelResponse } from '../types/channel.type';
import TeamService from './team.service';

/**
 *
 *
 * @class ChannelService
 */
@Service()
class ChannelService {
  /**
   * Creates an instance of ChannelService.
   * @param {TeamService} teamService
   * @memberof ChannelService
   */
  constructor(
    @Inject() private readonly teamService: TeamService,
  ) {}

  /**
 * `Get a channel by id`.
 * @param {string} channelId - string - The id of the channel to get.
 * @returns The channel object.
 */
  public async getById(channelId: string): Promise<ChannelResponse> {
    const channel = await Channel.findOne(channelId);
    if (!channel) {
      throw new CustomError(ERROR_TYPE.BAD_REQUEST, 'id', `channel with id: ${channelId} doesn't exist`);
    }
    return channel;
  }

  /**
   *
   *
   * @param {string} name
   * @memberof ChannelService
   */
  public async getByName(name: string, teamId: string): Promise<ChannelResponse | undefined> {
    const channel = await Channel.findOne({ name, teamId });
    return channel;
  }

  /**
 * Create a new channel.
 * @param {CreateChannelInput} payload - CreateChannelInput
 * @param {User} admin - User
 * @param {Team} team - Team
 * @returns The channel object.
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
 * "Edit a channel."
 * @param {EditChannelInput} payload - EditChannelInput
 * @returns The channel object.
 */
  public async edit(
    payload: EditChannelInput,
  ): Promise<ChannelResponse> {
    const channel = await this.getById(payload.channelId);
    const team = await this.teamService.getById(channel?.teamId!);
    if (payload.name) {
      const existingChannel = await this.getByName(payload.name, team.id);
      if (existingChannel) {
        throw new CustomError(ERROR_TYPE.CONFLICT, `channel with name ${payload.name} already exists`);
      }
      channel.name = payload.name;
    }
    if (payload.description) {
      channel.description = payload.description;
    }
    if (payload.topics) {
      channel.topics = payload.topics;
    }
    await Channel.update(payload.channelId, channel);
    return channel;
  }

  /**
   * `Fetch a channel by its id.`
   * @param {string} channelId - string - The channelId of the channel to fetch.
   * @returns The channel object.
 */
  public async fetchById(channelId: string): Promise<Channel> {
    const channel = await Channel.findOne(channelId);
    if (!channel) {
      throw new CustomError(ERROR_TYPE.NOT_FOUND, 'channelId', 'No Channel Found');
    }
    return channel;
  }

  /**
 * "Fetch all channels from the database that belong to a specific team."
 * @param {string} teamId - The team ID of the team to fetch channels for.
 * @returns An array of channels.
 */
  public async fetchExistingChannelsByTeamId(teamId: string): Promise<Channel[]> {
    const allChannels = await Channel.find({ teamId });
    return allChannels;
  }
}

export default ChannelService;
