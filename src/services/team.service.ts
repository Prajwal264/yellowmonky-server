import { Service } from 'typedi';
import { CustomError } from '../types/custom-error.type';
import User from '../entities/user.entity';
import { ERROR_TYPE } from '../constants/errors';
import Team from '../entities/team.entity';
import { TeamResponse } from '../types/team.type';
import { CreateTeamInput } from '../input/team.input';

/**
 *
 *
 * @class TeamService
 */
@Service()
class TeamService {
  /**
   *
   *
   * @param {string} id
   * @memberof TeamService
   */
  public async getById(id: string): Promise<TeamResponse> {
    const team = await Team.findOne(id);
    if (!team) {
      throw new CustomError(ERROR_TYPE.NOT_FOUND, 'id');
    }
    return team;
  }

  /**
   *
   *
   * @param {string} name
   * @memberof TeamService
   */
  public async getByName(name: string): Promise<TeamResponse | undefined> {
    const team = await Team.findOne({ name });
    return team;
  }

  /**
   *
   *
   * @memberof TeamService
   */
  public async create(payload: CreateTeamInput, owner: User): Promise<TeamResponse> {
    if (payload.name) {
      const team = await this.getByName(payload.name);
      if (team) {
        throw new CustomError(ERROR_TYPE.NOT_FOUND, `team with name ${payload.name} already exists`);
      }
    }

    const team = await Team.create({
      name: payload.name,
      owner,
    }).save();

    return team;
  }
}

export default TeamService;
