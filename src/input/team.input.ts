import { IsEmail } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import Team from '../entities/team.entity';

/**
 *
 *
 * @class CreateTeamInput
 * @implements {Partial<Team>}
 */
@ArgsType()
class CreateTeamInput implements Partial<Team> {
  /**
   *
   *
   * @type {string}
   * @memberof CreateTeamInput
   */
  @Field({ nullable: true })
    name?: string;

  /**
   *
   *
   * @type {string}
   * @memberof CreateTeamInput
   */
  @Field(() => [String], { nullable: 'itemsAndList' })
    channels?: string[];

  /**
   *
   *
   * @type {[string]}
   * @memberof CreateTeamInput
   */
  @Field(() => [String], { nullable: 'itemsAndList' })
  @IsEmail({}, { each: true })
    members?: [string];

  /**
   *
   *
   * @type {string}
   * @memberof CreateTeamInput
   */
  @Field({ nullable: true })
    displayPicture?: string;
}

/**
 *
 *
 * @class EditTeamInput
 * @extends {CreateTeamInput}
 */
@ArgsType()
class EditTeamInput extends CreateTeamInput {
  /**
   *
   *
   * @type {string}
   * @memberof EditTeamInput
   */
  @Field()
    id: string;

  /**
   *
   *
   * @type {string}
   * @memberof EditTeamInput
   */
  @Field()
    ownerId: string;
}

/**
 *
 *
 * @class CreateTeamInput
 */
 @ArgsType()
class InvitedMemberInput {
  /**
  *
  *
  * @type {[string]}
  * @memberof CreateTeamInput
  */
  @Field(() => String)
    inviterId: string;

   /**
    *
    *
    * @type {[string]}
    * @memberof CreateTeamInput
    */
   @Field(() => String)
   @IsEmail()
     inviteeEmail: string;

   /**
    *
    *
    * @type {string}
    * @memberof CreateTeamInput
    */
   @Field()
     teamId: string;
 }

export {
  CreateTeamInput,
  EditTeamInput,
  InvitedMemberInput,
};
