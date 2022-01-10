import { ArgsType, Field } from 'type-graphql';
import { TeamMemberRole, TeamMemberStatus } from '../types/team-member.type';
import TeamMember from '../entities/team-member.entity';
import { RegisterInput } from './user.input';

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
  @Field({ defaultValue: TeamMemberRole.MEMBER })
    role: TeamMemberRole;

  /**
   *
   *
   * @type {string}
   * @memberof CreateTeamInput
   */
  @Field({ defaultValue: TeamMemberStatus.INVITED })
    status: TeamMemberStatus;
}

@ArgsType()
class CreateUserAndAddToTeamInput extends RegisterInput {
  @Field()
    teamId: string;
}

export { CreateTeamMemberInput, CreateUserAndAddToTeamInput };
