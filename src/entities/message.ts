/* eslint-disable no-use-before-define */
import { Field, InterfaceType } from 'type-graphql';
import {
  Column,
} from 'typeorm';
import { MessageSourceType } from '../types/message.type';
import EntityWrapper from './wrapper';

/**
 *
 *
 * @export
 * @class User
 */
@InterfaceType({ implements: EntityWrapper })
abstract class Message extends EntityWrapper {
  /**
   *
   *
   * @type {string}
   * @memberof Channel
   */
  @Field()
  @Column()
    content: string;

  /**
   *
   *
   * @type {MessageSourceType}
   * @memberof Message
   */
  @Field(() => MessageSourceType)
  @Column()
    sourceType: MessageSourceType;

  /**
   *
   *
   * @type {string}
   * @memberof Message
   */
  @Field()
  @Column({ name: 'creator_id' })
    creatorId: string;

  /**
   *
   *
   * @type {string}
   * @memberof Message
   */
  @Field({ nullable: true })
  @Column({ name: 'parent_message_id', nullable: true })
    parentMessageId?: string;
}

export default Message;
