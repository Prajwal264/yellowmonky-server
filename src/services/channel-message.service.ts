import { Service } from 'typedi';
import { FindManyOptions, LessThan } from 'typeorm';
import ChannelMessage from '../entities/channel-message.entity';
import { ERROR_TYPE } from '../constants/errors';
import { CustomError } from '../types/custom-error.type';
import { CreateChannelMessageInput } from '../input/message.input';

/**
 *
 *
 * @class ChannelMessageService
 */
@Service()
class ChannelMessageService {
  /**
   * Creates an instance of ChannelMessageService.
   * @memberof ChannelMessageService
   */
  constructor() {}

  /**
 * Get a message by its id.
 * @param {string} messageId - string
 * @returns The message object.
 */
  public async getById(messageId: string): Promise<ChannelMessage> {
    const channel = await ChannelMessage.findOne(messageId);
    if (!channel) {
      throw new CustomError(ERROR_TYPE.NOT_FOUND, 'messageId', 'No message Found');
    }
    return channel;
  }

  /**
 * Get all messages in a channel.
 * @param {string} channelId - The ID of the channel to get messages from.
 * @param paginationConfig - {
 * @returns An array of messages.
 */
  public async getAllByChannelId(channelId: string, paginationConfig: {
    limit: number,
    cursor?: string,
  }): Promise<ChannelMessage[]> {
    const findOptions: FindManyOptions = {
      where: {
        sourceChannelId: channelId,
      },
      take: paginationConfig.limit,
      order: {
        createdAt: 'DESC',
      },
    };
    if (paginationConfig.cursor) {
      const cursorMessage = await this.getById(paginationConfig.cursor);
      findOptions.where.createdAt = LessThan(new Date(cursorMessage.createdAt));
    }
    const messages = await ChannelMessage.find(findOptions);
    return messages;
  }

  /**
   * Create a new message.
   * @param {CreateMessageInput} payload - CreateMessageInput
   * @returns The message that was created.
  */
  public async create(payload: CreateChannelMessageInput): Promise<ChannelMessage> {
    const response = await ChannelMessage.create(payload).save();
    return response;
  }
}

export default ChannelMessageService;
