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

@ObjectType()
export class EditTeamResponse {
  @Field()
    teamId: string;

  @Field(() => [String])
    channels: string[]; // array of channelId's for the team
}
