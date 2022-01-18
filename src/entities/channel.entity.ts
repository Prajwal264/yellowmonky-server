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
import ChannelMessage from './channel-message.entity';
/**
 *
 *
 * @export
 * @class User
 */
@ObjectType({ implements: EntityWrapper })
@Entity({ name: 'channels' })
abstract class Channel extends EntityWrapper {
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
  @Field({ nullable: true })
  @Column({ nullable: true })
    topics?: string;

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
  @OneToMany(() => ChannelMessage, (message) => message.sourceChannel)
  @JoinColumn()
    channelMessage: ChannelMessage[];

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
