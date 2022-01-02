import { Inject, Service } from 'typedi';
import { CreateTeamMemberInput } from '../input/team-member.input';
import UserService from './user.service';
import TeamService from './team.service';
import TeamMember from '../entities/team-member.entity';

/**
 *
 *
 * @class TeamMemberService
 */
@Service()
class TeamMemberService {
  constructor(
    @Inject()
    private readonly userService: UserService,
    private readonly teamService: TeamService,
  ) {}

  /**
   *
   *
   * @param {CreateTeamMemberInput} payload
   * @return {*}
   * @memberof TeamMemberService
   */
  public async create(payload: CreateTeamMemberInput) {
    const userPromise = this.userService.getById(payload.userId);
    const teamPromise = this.teamService.getById(payload.teamId);
    const [userResponse, teamResponse] = await Promise.all([userPromise, teamPromise]);
    const teamMemberResponse = await TeamMember.create({
      team: teamResponse,
      user: userResponse,
      role: payload.role,
      status: payload.status,
    }).save();
    return {
      data: teamMemberResponse,
    };
  }
}

export default TeamMemberService;
