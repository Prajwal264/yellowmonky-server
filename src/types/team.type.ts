import { Field, ObjectType } from 'type-graphql';
import Team from '../entities/team.entity';

/**
 *
 *
 * @export
 * @class TeamResponse
 */
@ObjectType()
export class TeamResponse extends Team {
}

/**
 *
 *
 * @export
 * @class TeamListResponse
 * @extends {TeamResponse}
 */
@ObjectType()
export class TeamListResponse extends TeamResponse {
  /**
   *
   *
   * @type {number}
   * @memberof TeamListResponse
   */
  @Field()
    memberCount: string;
}

@ObjectType()
export class EditTeamResponse {
  @Field()
    teamId: string;

  @Field(() => [String])
    channels: string[]; // array of channelId's for the team
}
