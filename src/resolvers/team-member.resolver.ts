import { Arg, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import TeamMemberService from '../services/team-member.service';
import TeamMember from '../entities/team-member.entity';

/**
 *
 *
 * @class TeamMemberResolver
 */
@Service()
@Resolver(() => TeamMember)
class TeamMemberResolver {
  /**
   * Creates an instance of TeamMemberResolver.
   * @param {TeamMemberService} teamMemberService
   * @memberof TeamMemberResolver
   */
  constructor(
    @Inject() private readonly teamMemberService: TeamMemberService,
  ) {}

  /**
   *
   *
   * @param {string} teamId
   * @return {*}  {Promise<TeamMember[]>}
   * @memberof TeamMemberResolver
   */
  @Query(() => [TeamMember])
  allTeamMembers(
    @Arg('teamId') teamId: string,
  ): Promise<TeamMember[]> {
    const members = this.teamMemberService.fetchAllByIteam(teamId);
    return members;
  }
}

export default TeamMemberResolver;
