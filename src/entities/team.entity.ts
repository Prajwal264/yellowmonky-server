import {
  Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import EntityWrapper from './wrapper';
import TeamMember from './team-member.entity';
import User from './user.entity';

/**
 *
 *
 * @export
 * @class User
 */
@ObjectType({ implements: EntityWrapper })
@Entity({ name: 'teams' })
class Team extends EntityWrapper {
  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field({ defaultValue: '', nullable: true })
  @Column({ default: '' })
    name?: string;

  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field({ nullable: true })
  @Column({ name: 'display_picture', nullable: true })
    displayPicture?: string;

  /**
   *
   *
   * @type {string}
   * @memberof Team
   */
  @Field()
  @Column({ name: 'owner_id' })
    ownerId: string;

  /**
   *
   *
   * @type {User}
   * @memberof Team
   */
  @ManyToOne(() => User, (user) => user.teamOwner)
  @JoinColumn({ name: 'owner_id' })
    owner: User;

  /**
   *
   *
   * @type {TeamMember[]}
   * @memberof Team
   */
  @OneToMany(() => TeamMember, (teamMember) => teamMember.team)
    teamMembers: TeamMember[];
}

export default Team;
