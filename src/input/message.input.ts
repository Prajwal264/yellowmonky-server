import {
  ArgsType,
  Field,
} from 'type-graphql';
import { MessageSourceType } from '../types/message.type';
import ChannelMessage from '../entities/channel-message.entity';

/**
 *
 *
 * @class CreateMessageInput
 * @implements {Partial<Team>}
 */

@ArgsType()
class CreateChannelMessageInput implements Partial<ChannelMessage> {
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
   * @type {MessageSourceType}
   * @memberof CreateMessageInput
   */
  @Field(() => MessageSourceType)
    sourceType: MessageSourceType;

  /**
   *
   *
   * @type {string}
   * @memberof CreateChannelMessageInput
   */
  @Field({ nullable: true })
    sourceChannelId?: string;
}
export { CreateChannelMessageInput };
