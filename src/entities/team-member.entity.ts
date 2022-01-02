import {
  Column,
  Entity, JoinColumn, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { TeamMemberRole, TeamMemberStatus } from '../types/team-member.type';
import EntityWrapper from './wrapper';
import Team from './team.entity';
import User from './user.entity';

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
  @Field()
  @Column()
    role: TeamMemberRole;

  /**
   *
   *
   * @type {TeamMemberStatus}
   * @memberof TeamMember
   */
  @Field()
  @Column()
    status: TeamMemberStatus;

  /**
   *
   *
   * @type {number}
   * @memberof UserTeam
   */
   @Field()
  @PrimaryColumn({ name: 'user_id' })
     userId: string;

   /**
   *
   *
   * @type {string}
   * @memberof UserTeam
   */
   @ManyToOne(() => User, (user) => user.teamMembers)
   @JoinColumn({ name: 'user_id' })
     user: User;

  /**
   *
   *
   * @type {string}
   * @memberof UserTeam
   */
  @Field()
  @PrimaryColumn({ name: 'team_id' })
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
}

export default TeamMember;
