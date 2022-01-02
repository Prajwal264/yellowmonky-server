import { ArgsType, Field } from 'type-graphql';
import Team from '../entities/team.entity';

/**
 *
 *
 * @class CreateTeamInput
 * @implements {Partial<Team>}
 */
@ArgsType()
class CreateTeamInput implements Partial<Team> {
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
    displayPicture?: string;
}

export { CreateTeamInput };
