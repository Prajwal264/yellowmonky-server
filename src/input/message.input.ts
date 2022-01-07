import { ArgsType, Field } from 'type-graphql';
import { MessageSourceType } from '../types/message.type';
import Message from '../entities/message.entity';

/**
 *
 *
 * @class CreateMessageInput
 * @implements {Partial<Team>}
 */
 @ArgsType()
class CreateMessageInput implements Partial<Message> {
  /**
   *
   *
   * @type {string}
   * @memberof CreateMessageInput
   */
  @Field()
    content: string;

  /**
   *
   *
   * @type {string}
   * @memberof CreateMessageInput
   */
  @Field()
    creatorId: string;

  /**
   *
   *
   * @type {string}
   * @memberof CreateMessageInput
   */
  @Field({ nullable: true })
    sourceChannelId?: string;

  /**
   *
   *
   * @type {MessageSourceType}
   * @memberof CreateMessageInput
   */
  @Field(() => MessageSourceType)
    sourceType: MessageSourceType;
 }

export { CreateMessageInput };
