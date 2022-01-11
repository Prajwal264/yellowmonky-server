import { Service } from 'typedi';
import { FindManyOptions, LessThan } from 'typeorm';
import { ERROR_TYPE } from '../constants/errors';
import { CustomError } from '../types/custom-error.type';
import Message from '../entities/message.entity';
import { CreateMessageInput } from '../input/message.input';

@Service()
class MessageService {
  constructor() {}

  /**
   *
   *
   * @param {string} messageId
   * @return {*}  {Promise<Message>}
   * @memberof MessageService
   */
  public async getById(messageId: string): Promise<Message> {
    const channel = await Message.findOne(messageId);
    if (!channel) {
      throw new CustomError(ERROR_TYPE.NOT_FOUND, 'messageId', 'No message Found');
    }
    return channel;
  }

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

  public async create(payload: CreateMessageInput): Promise<Message> {
    const response = await Message.create(payload).save();
    return response;
  }
}

export default MessageService;
