import { Service } from 'typedi';
import Handlebars from 'handlebars';
import fs from 'fs';
import { createInviteMemberToken } from '../helpers/token.helper';
import { createTransporter } from '../helpers/auth.helper';
import { CustomError } from '../types/custom-error.type';
import User from '../entities/user.entity';
import { ERROR_TYPE } from '../constants/errors';
import Team from '../entities/team.entity';
import { TeamListResponse, TeamResponse } from '../types/team.type';
import { CreateTeamInput, EditTeamInput } from '../input/team.input';

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
   * @param {string} id
   * @memberof TeamService
   */
  public async getAllByMemberId(memberId: string): Promise<TeamListResponse[]> {
    const teams = await Team.createQueryBuilder('teams')
      .leftJoin('teams.teamMembers', 'team_members')
      .where('team_members.user_id = :userId', { userId: memberId })
      .loadAllRelationIds({
        relations: ['teamMembers'],
      })
      .getMany();
    const teamListReponse = teams.map((team) => ({
      ...team,
      memberCount: team.teamMembers.length,
    }));
    return teamListReponse as any;
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
        throw new CustomError(ERROR_TYPE.CONFLICT, `team with name ${payload.name} already exists`);
      }
    }

    const team = await Team.create({
      name: payload.name,
      owner,
    }).save();

    return team;
  }

  public async edit(payload: EditTeamInput): Promise<TeamResponse> {
    const team = await this.getById(payload.id);
    if (payload.name) team.name = payload.name;
    if (payload.displayPicture) team.displayPicture = payload.displayPicture;
    await Team.update(payload.id, team);
    return team;
  }

  public async sendInvite(
    emailId: string,
    metadata: {
      team: Team,
      inviter: User
    },
  ): Promise<boolean> {
    return new Promise((resolve) => {
      fs.readFile('assets/html/join-team.hbs', async (err: any, data: any) => {
        if (!err) {
          const inviteToken = createInviteMemberToken({
            emailId,
          }, '7d');
          const clientDomain = `${process.env.CLIENT_URL}/join-team/`;
          const inviteLink = `${clientDomain}/${metadata.team.id}/?joinId=${inviteToken}`;
          try {
            const source = data.toString();
            const template = Handlebars.compile(source);
            const html = template({
              ...metadata,
              emailId,
              inviteLink,
              firstCharacter: metadata.inviter.username[0],
            });

            const transporter = await createTransporter();
            await transporter.sendMail({
              to: emailId, // list of receivers
              from: 'excitedhchips@gmail.com',
              subject: `${metadata.inviter.username} has invited you to work with them in YellowMonky`,
              html,
            });
            resolve(true);
          } catch (e) {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      });
    });
  }
}

export default TeamService;
