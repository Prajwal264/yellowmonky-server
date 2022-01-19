import { Inject, Service } from 'typedi';
import { FindOneOptions } from 'typeorm';
import { CustomError } from '../types/custom-error.type';
import { ERROR_TYPE } from '../constants/errors';
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

  public async getById(memberId: string, findOptions: FindOneOptions = {}): Promise<TeamMember> {
    const member = await TeamMember.findOne(memberId, findOptions);
    if (!member) {
      throw new CustomError(ERROR_TYPE.BAD_REQUEST, 'id', `member with id: ${memberId} doesn't exist`);
    }
    return member;
  }

  /**
 * "Fetch all team members by team id."
 * @param {string} teamId - The teamId of the team to fetch the members of.
 * @returns The TeamMember object.
 */
  public async fetchAllByIteam(teamId: string): Promise<TeamMember[]> {
    const members = await TeamMember.find({ where: { teamId }, relations: ['user'] });
    return members;
  }

  /**
   * Create a new team member.
   * @param {CreateTeamMemberInput} payload - CreateTeamMemberInput
   * @returns The team member that was created.
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
    return teamMemberResponse;
  }
}

export default TeamMemberService;
