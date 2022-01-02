import { ArgsType, Field } from 'type-graphql';
import Channel from '../entities/channel.entity';

/**
 *
 *
 * @class CreateTeamInput
 * @implements {Partial<Team>}
 */
 @ArgsType()
class CreateChannelInput implements Partial<Channel> {
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
   @Field({ nullable: true })
     displayPicture?: string;
 }

export { CreateChannelInput };
