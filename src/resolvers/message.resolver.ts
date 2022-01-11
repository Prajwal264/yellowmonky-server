import {
  Arg, Args, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription,
} from 'type-graphql';
import { Inject, Service } from 'typedi';
import { SubscriptionTopic } from '../types/subscription-topics.type';
import { CreateMessageInput } from '../input/message.input';
import MessageService from '../services/message.service';
import Message from '../entities/message.entity';

/**
 *
 *
 * @class MessageResolver
 */
@Service()
@Resolver(() => Message)
class MessageResolver {
  /**
   * Creates an instance of MessageResolver.
   * @param {MessageService} messageService
   * @memberof MessageResolver
   */
  constructor(
    @Inject() private readonly messageService: MessageService,
  ) {}

  /**
   *
   *
   * @param {string} channelId
   * @return {*}  {Promise<Message[]>}
   * @memberof MessageResolver
   */
  @Query(() => [Message])
  async allChannelMessages(
    @Arg('channelId') channelId: string,
    @Arg('limit') limit: number,
    @Arg('cursor', { nullable: true }) cursor?: string,
  ): Promise<Message[]> {
    const paginationConfig: {
      limit: number,
      cursor?: string,
    } = {
      limit,
    };
    if (cursor) {
      paginationConfig.cursor = cursor;
    }
    return this.messageService.getAllByChannelId(channelId, paginationConfig);
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
    @PubSub() pubsub: PubSubEngine,
  ): Promise<String> {
    const message = await this.messageService.create(payload);
    pubsub.publish(SubscriptionTopic.NEW_CHANNEL_MESSAGE, message);
    return message.id;
  }

  /**
   *
   *
   * @param {Message} payload
   * @return {*}  {Message}
   * @memberof MessageResolver
   */
  @Subscription({
    topics: SubscriptionTopic.NEW_CHANNEL_MESSAGE,
    filter: ({ payload, args }) => args.channelId === payload.sourceChannelId,
  })
  newChannelMessage(
    @Root() payload: Message,
    @Arg('channelId') _channelId: string,
  ) : Message {
    return payload;
  }
}

export default MessageResolver;
