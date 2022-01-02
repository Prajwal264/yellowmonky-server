import { ArgsType, Field } from 'type-graphql';
import { TeamRole } from '../types/team-member.type';
import TeamMember from '../entities/team-member.entity';

/**
 *
 *
 * @class CreateTeamInput
 * @implements {Partial<Team>}
 */
@ArgsType()
class CreateTeamMemberInput implements Partial<TeamMember> {
  /**
   *
   *
   * @type {string}
   * @memberof CreateTeamMemberInput
   */
  @Field(() => String)
    userId: string;

  /**
   *
   *
   * @type {string}
   * @memberof CreateTeamMemberInput
   */
  @Field(() => String)
    teamId: string;

  /**
   *
   *
   * @type {string}
   * @memberof CreateTeamInput
   */
  @Field({ defaultValue: TeamRole.MEMBER })
    role: TeamRole;
}

export { CreateTeamMemberInput };
