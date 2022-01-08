import {
  Arg, Args, Mutation, Query, Resolver,
} from 'type-graphql';
import { Inject, Service } from 'typedi';
import { CreateMessageInput } from '../input/message.input';
import MessageService from '../services/message.service';
import Message from '../entities/message.entity';

@Service()
@Resolver(() => Message)
class MessageResolver {
  constructor(
    @Inject() private readonly messageService: MessageService,
  ) {}

  @Query(() => [Message])
  async allChannelMessages(
    @Arg('channelId') channelId: string,
  ): Promise<Message[]> {
    return this.messageService.getAllByChannelId(channelId);
  }

  /**
   *
   *
   * @param {CreateMessageInput} payload
   * @return {*}  {Promise<String>}
   * @memberof MessageResolver
   */
  @Mutation(() => String)
  async createMessage(
    @Args() payload: CreateMessageInput,
  ): Promise<String> {
    const response = await this.messageService.create(payload);
    return response;
  }
}

export default MessageResolver;
