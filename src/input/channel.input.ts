import { ArgsType, Field } from 'type-graphql';
import Channel from '../entities/channel.entity';

/**
 *
 *
 * @class CreateTeamInput
 * @implements {Partial<Team>}
 */
@ArgsType()
class CreateChannelInput implements Partial<Channel> {
  /**
   *
   *
   * @type {string}
   * @memberof CreateTeamInput
   */
  @Field({ nullable: true })
    name?: string;

  /**
   *
   *
   * @type {string}
   * @memberof CreateTeamInput
   */
  @Field({ nullable: true })
    description?: string;

  /**
   *
   *
   * @type {string}
   * @memberof CreateTeamInput
   */
  @Field({ nullable: true })
    topics?: string;
}
/**
 *
 *
 * @class CreateTeamInput
 * @implements {Partial<Team>}
 */
@ArgsType()
class EditChannelInput extends CreateChannelInput {
  /**
   *
   *
   * @type {string}
   * @memberof CreateTeamInput
   */
  @Field()
    channelId: string;
}

export { CreateChannelInput, EditChannelInput };
