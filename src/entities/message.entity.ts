/* eslint-disable no-use-before-define */
import { Field, ObjectType } from 'type-graphql';
import {
  Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { MessageSourceType } from '../types/message.type';
import Channel from './channel.entity';
import User from './user.entity';
import EntityWrapper from './wrapper';

/**
 *
 *
 * @export
 * @class User
 */
 @ObjectType({ implements: EntityWrapper })
 @Entity({ name: 'messages' })
class Message extends EntityWrapper {
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
  @Column({ name: 'source_channel_id' })
    sourceChannelId: string;

  /**
   *
   *
   * @type {Channel}
   * @memberof Message
   */
  @ManyToOne(() => Channel, (channel) => channel.channelMessage, { nullable: true })
  @Field(() => Channel)
  @JoinColumn({ name: 'source_channel_id' })
    sourceChannel: Channel;

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
   * @type {User}
   * @memberof Message
   */
  @ManyToOne(() => User, (user) => user.messageCreator)
  @Field(() => User)
  @JoinColumn({ name: 'creator_id' })
    creator: User;

  /**
   *
   *
   * @type {string}
   * @memberof Message
   */
  @Field({ nullable: true })
  @Column({ name: 'parent_message_id', nullable: true })
    parentMessageId?: string;

  /**
   *
   *
   * @type {Message}
   * @memberof Message
   */
   @OneToMany(() => Message, (message) => message.parentMessage)
   @Field(() => Message, { nullable: true })
   @JoinColumn({ name: 'child_message_id' })
     childMessages?: Message[];

  /**
   *
   *
   * @type {Message}
   * @memberof Message
   */
  @ManyToOne(() => Message, (message) => message.childMessages)
  @Field(() => Message, { nullable: true })
  @JoinColumn({ name: 'parent_message_id' })
    parentMessage?: Message;
 }

export default Message;
