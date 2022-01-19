import { Service } from 'typedi';
import { FindManyOptions, In, LessThan } from 'typeorm';
import { ERROR_TYPE } from '../constants/errors';
import { CustomError } from '../types/custom-error.type';
import { CreateDirectMessageInput } from '../input/message.input';
import DirectMessage from '../entities/direct-message.entity';

/**
 *
 *
 * @class DirectMessageService
 */
@Service()
class DirectMessageService {
  /**
   * Creates an instance of DirectMessageService.
   * @memberof DirectMessageService
   */
  constructor() {}

  /**
 * Get a message by its id.
 * @param {string} messageId - string
 * @returns The message object.
 */
  public async getById(messageId: string): Promise<DirectMessage> {
    const directMessage = await DirectMessage.findOne(messageId);
    if (!directMessage) {
      throw new CustomError(ERROR_TYPE.NOT_FOUND, 'messageId', 'No message Found');
    }
    return directMessage;
  }

  /**
 * Get all messages in a channel.
 * @param {string} channelId - The ID of the channel to get messages from.
 * @param paginationConfig - {
 * @returns An array of messages.
 */
  public async getAllByRecipientId(userId: string, recipientId: string, paginationConfig: {
    limit: number,
    cursor?: string,
  }): Promise<DirectMessage[]> {
    const findOptions: FindManyOptions = {
      where: {
        creatorId: In([userId, recipientId]),
        recipientId: In([userId, recipientId]),
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
    const messages = await DirectMessage
      .createQueryBuilder('direct_messages')
      .where('direct_messages.creator_id = :creatorId AND direct_messages.recipient_id = :recipientId', {
        creatorId: userId,
        recipientId,
      })
      .orWhere('direct_messages.creator_id = :recipientId AND direct_messages.recipient_id = :creatorId', {
        creatorId: userId,
        recipientId,
      })
      .take(paginationConfig.limit)
      .orderBy('created_at', 'DESC')
      .getMany();
    return messages;
  }

  /**
   * Create a new message.
   * @param {CreateMessageInput} payload - CreateMessageInput
   * @returns The message that was created.
  */
  public async create(payload: CreateDirectMessageInput): Promise<DirectMessage> {
    const response = await DirectMessage.create(payload).save();
    return response;
  }
}

export default DirectMessageService;
