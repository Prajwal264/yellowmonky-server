import { Service } from 'typedi';
import Handlebars from 'handlebars';
import fs from 'fs';
import { FindOneOptions } from 'typeorm';
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
   * `Get a team by id`.
   * @param {string} id - string
   * @returns The team object.
   */
  public async getById(id: string, findOptions?: FindOneOptions<Team>): Promise<TeamResponse> {
    const team = await Team.findOne(id, findOptions);
    if (!team) {
      throw new CustomError(ERROR_TYPE.NOT_FOUND, 'id', `Cannot fine team with id: ${id}`);
    }
    return team;
  }

  /**
 * Get all teams that a user is a member of.
 * @param {string} memberId - string - The id of the member to get teams for.
 * @returns The team list response.
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
   * "Get a team by name."
   * @param {string} name - string - The name of the team to find.
   * @returns The team object.
   */
  public async getByName(name: string): Promise<TeamResponse | undefined> {
    const team = await Team.findOne({ name });
    return team;
  }

  /**
 * Create a new team.
 * @param {CreateTeamInput} payload - CreateTeamInput
 * @param {User} owner - User
 * @returns The team object.
 */
  public async create(payload: CreateTeamInput, owner: User): Promise<TeamResponse> {
    if (payload.name) {
      const team = await this.getByName(payload.name);
      if (team) {
        throw new CustomError(ERROR_TYPE.CONFLICT, 'name', `team with name ${payload.name} already exists`);
      }
    }

    const team = await Team.create({
      name: payload.name,
      owner,
    }).save();

    return team;
  }

  /**
 * `Edit a team by id`.
 * @param {EditTeamInput} payload - EditTeamInput
 * @returns The team that was updated.
 */
  public async edit(payload: EditTeamInput): Promise<TeamResponse> {
    const team = await this.getById(payload.id);
    if (payload.name) team.name = payload.name;
    if (payload.displayPicture) team.displayPicture = payload.displayPicture;
    await Team.update(payload.id, team);
    return team;
  }

  /**
   * It takes in an emailId and a metadata object, and sends an email to the emailId with the invite
   * link.
   * @param {string} emailId - The email address of the user to send the invite to
   * @param metadata - {
   * @returns A boolean value.
   */
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
