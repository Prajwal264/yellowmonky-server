import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
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
@Entity({ name: 'channels' })
class Channel extends EntityWrapper {
  /**
   *
   *
   * @type {string}
   * @memberof Channel
   */
  @Field()
  @Column()
    name: string;

  /**
   *
   *
   * @type {string}
   * @memberof Channel
   */
  @Field({ nullable: true })
  @Column({ nullable: true })
    description?: string;

  /**
   *
   *
   * @type {string}
   * @memberof Channel
   */
  @Field()
  @PrimaryColumn({ name: 'admin_id' })
    adminId: string;

  /**
   *
   *
   * @type {User}
   * @memberof Channel
   */
  @ManyToOne(() => User, (user) => user.channelAdmin)
  @JoinColumn({ name: 'admin_id' })
    admin: User;

  /**
   *
   *
   * @type {string}
   * @memberof Channel
   */
  @Field()
  @PrimaryColumn({ name: 'team_id' })
    teamId: string;

  /**
   *
   *
   * @type {Team}
   * @memberof Channel
   */
  @ManyToOne(() => Team, (team) => team.teamChannels)
  @JoinColumn({ name: 'team_id' })
    team: Team;
}

export default Channel;