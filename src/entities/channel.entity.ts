import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import EntityWrapper from './wrapper';
import Team from './team.entity';
import User from './user.entity';
import Message from './message.entity';
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
  @Column({ name: 'admin_id' })
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
  @Column({ name: 'team_id' })
    teamId: string;

  /**
   *
   *
   * @type {Team}
   * @memberof Channel
   */
  @OneToMany(() => Message, (message) => message.sourceChannel)
  @JoinColumn()
    channelMessage: Message[];

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
