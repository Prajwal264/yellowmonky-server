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
  /**
   * Creates an instance of TeamMemberService.
   * @param {UserService} userService
   * @param {TeamService} teamService
   * @memberof TeamMemberService
   */
  constructor(
    @Inject()
    private readonly userService: UserService,
    private readonly teamService: TeamService,
  ) {}

  /**
   *
   *
   * @param {string} teamId
   * @return {*}
   * @memberof TeamMemberService
   */
  public async fetchAllByIteam(teamId: string): Promise<TeamMember[]> {
    const members = await TeamMember.find({ where: { teamId }, relations: ['user'] });
    return members;
  }

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
