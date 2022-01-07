import {
  Column, Entity, OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IsEmail } from 'class-validator';
import EntityWrapper from './wrapper';
import TeamMember from './team-member.entity';
import Team from './team.entity';
import Channel from './channel.entity';
import Message from './message.entity';

/**
 *
 *
 * @export
 * @class User
 */
@ObjectType({ implements: EntityWrapper })
@Entity({ name: 'users' })
class User extends EntityWrapper {
  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field()
  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid Email' })
    email: string;

  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field()
  @Column()
    username: string;

  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Column()
    password: string;

  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field({ nullable: true })
  @Column({ name: 'profile_image', nullable: true })
    profileImage?: string;

  /**
   *
   *
   * @type {Channel[]}
   * @memberof User
   */
  @OneToMany(() => Channel, (channel) => channel.admin)
    channelAdmin: Channel[];

  /**
   *
   *
   * @type {Team[]}
   * @memberof User
   */
  @OneToMany(() => Message, (message) => message.creator)
    messageCreator: Message[];

  /**
   *
   *
   * @type {Team[]}
   * @memberof User
   */
  @OneToMany(() => Team, (team) => team.owner)
    teamOwner: Team[];

  /**
   *
   *
   * @type {TeamMember[]}
   * @memberof User
   */
  @OneToMany(() => TeamMember, (teamMember) => teamMember.user)
    teamMembers: TeamMember[];
}

export default User;
