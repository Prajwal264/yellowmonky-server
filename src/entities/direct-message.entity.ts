/* eslint-disable no-use-before-define */
import { Field, ObjectType } from 'type-graphql';
import {
  Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
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
@Entity({ name: 'direct_messages' })
class DirectMessage extends Message {
   /**
   *
   *
   * @type {string}
   * @memberof DirectMessage
   */
   @Field()
   @Column({ name: 'recipient_id' })
     recipientId: string;

   /**
    *
    *
    * @type {Channel}
    * @memberof DirectMessage
    */
   @ManyToOne(() => TeamMember, (teamMember) => teamMember.directMessageRecipient, {
     nullable: true,
   })
   @Field(() => TeamMember)
   @JoinColumn({ name: 'recipient_id' })
     recipient: TeamMember;

   /**
   *
   *
   * @type {User}
   * @memberof DirectMessage
   */
    @ManyToOne(() => TeamMember, (teamMember) => teamMember.directMessageCreator)
    @Field(() => TeamMember)
    @JoinColumn({ name: 'creator_id' })
      creator: TeamMember;

    /**
   *
   *
   * @type {DirectMessage}
   * @memberof DirectMessage
   */
   @OneToMany(() => DirectMessage, (message) => message.parentMessage)
   @Field(() => DirectMessage, { nullable: true })
   @JoinColumn({ name: 'child_message_id' })
     childMessages?: DirectMessage[];

   /**
   *
   *
   * @type {Message}
   * @memberof Message
   */
   @ManyToOne(() => DirectMessage, (message) => message.childMessages)
   @Field(() => DirectMessage, { nullable: true })
   @JoinColumn({ name: 'parent_message_id' })
     parentMessage?: DirectMessage;
}

export default DirectMessage;
