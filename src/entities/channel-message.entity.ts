/* eslint-disable no-use-before-define */
import { Field, ObjectType } from 'type-graphql';
import {
  Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import Channel from './channel.entity';
import Message from './message';
import TeamMember from './team-member.entity';
import EntityWrapper from './wrapper';

/**
 *
 *
 * @class ChannelMessage
 * @extends {Message}
 */
@ObjectType({ implements: [Message, EntityWrapper] })
@Entity({ name: 'channel_messages' })
class ChannelMessage extends Message {
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
   * @type {User}
   * @memberof Message
   */
    @ManyToOne(() => TeamMember, (teamMember) => teamMember.channelMessageCreator)
    @Field(() => TeamMember)
    @JoinColumn({ name: 'creator_id' })
      creator: TeamMember;

    /**
   *
   *
   * @type {Message}
   * @memberof Message
   */
   @OneToMany(() => ChannelMessage, (message) => message.parentMessage)
   @Field(() => ChannelMessage, { nullable: true })
   @JoinColumn({ name: 'child_message_id' })
     childMessages?: ChannelMessage[];

   /**
   *
   *
   * @type {Message}
   * @memberof Message
   */
   @ManyToOne(() => ChannelMessage, (message) => message.childMessages)
   @Field(() => ChannelMessage, { nullable: true })
   @JoinColumn({ name: 'parent_message_id' })
     parentMessage?: ChannelMessage;
}

export default ChannelMessage;
