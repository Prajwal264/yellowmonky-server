import { Service } from 'typedi';
import { FindManyOptions, LessThan } from 'typeorm';
import { ERROR_TYPE } from '../constants/errors';
import { CustomError } from '../types/custom-error.type';
import Message from '../entities/message.entity';
import { CreateMessageInput } from '../input/message.input';

/**
 *
 *
 * @class MessageService
 */
@Service()
class MessageService {
  /**
   * Creates an instance of MessageService.
   * @memberof MessageService
   */
  constructor() {}

  /**
 * Get a message by its id.
 * @param {string} messageId - string
 * @returns The message object.
 */
  public async getById(messageId: string): Promise<Message> {
    const channel = await Message.findOne(messageId);
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
  }): Promise<Message[]> {
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
    const messages = await Message.find(findOptions);
    return messages;
  }

  /**
   * Create a new message.
   * @param {CreateMessageInput} payload - CreateMessageInput
   * @returns The message that was created.
  */
  public async create(payload: CreateMessageInput): Promise<Message> {
    const response = await Message.create(payload).save();
    return response;
  }
}

export default MessageService;
