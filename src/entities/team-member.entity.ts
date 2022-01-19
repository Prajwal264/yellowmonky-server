import {
  Column,
  Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { TeamMemberRole, TeamMemberStatus } from '../types/team-member.type';
import EntityWrapper from './wrapper';
import Team from './team.entity';
import User from './user.entity';
import ChannelMessage from './channel-message.entity';
import DirectMessage from './direct-message.entity';

/**
 *
 *
 * @export
 * @class User
 */
@ObjectType({ implements: EntityWrapper })
@Entity({ name: 'team_members' })
class TeamMember extends EntityWrapper {
  /**
   *
   *
   * @type {TeamRole}
   * @memberof TeamMember
   */
  @Field(() => TeamMemberRole)
  @Column()
    role: TeamMemberRole;

  /**
   *
   *
   * @type {TeamMemberStatus}
   * @memberof TeamMember
   */
  @Field(() => TeamMemberStatus)
  @Column()
    status: TeamMemberStatus;

  /**
   *
   *
   * @type {number}
   * @memberof UserTeam
   */
   @Field()
  @Column({ name: 'user_id' })
     userId: string;

   /**
   *
   *
   * @type {string}
   * @memberof UserTeam
   */
   @ManyToOne(() => User, (user) => user.teamMembers)
   @Field(() => User)
   @JoinColumn({ name: 'user_id' })
     user: User;

  /**
   *
   *
   * @type {string}
   * @memberof UserTeam
   */
  @Field()
  @Column({ name: 'team_id' })
    teamId: string;

  /**
   *
   *
   * @type {string}
   * @memberof UserTeam
   */
  @ManyToOne(() => Team, (team) => team.teamMembers)
  @JoinColumn({ name: 'team_id' })
    team: Team;

  /**
   *
   *
   * @type {Team[]}
   * @memberof User
   */
  @OneToMany(() => DirectMessage, (message) => message.recipient)
    directMessageRecipient: DirectMessage[];

  /**
   *
   *
   * @type {Team[]}
   * @memberof User
   */
   @OneToMany(() => DirectMessage, (message) => message.creator)
     directMessageCreator: DirectMessage[];

  /**
   *
   *
   * @type {Team[]}
   * @memberof User
   */
  @OneToMany(() => ChannelMessage, (message) => message.creator)
    channelMessageCreator: ChannelMessage[];
}

export default TeamMember;
