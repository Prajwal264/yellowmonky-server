import {
  Arg, Args, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription,
} from 'type-graphql';
import { Inject, Service } from 'typedi';
import ChannelMessage from '../entities/channel-message.entity';
import { SubscriptionTopic } from '../types/subscription-topics.type';
import { CreateChannelMessageInput } from '../input/message.input';
import ChannelMessageService from '../services/channel-message.service';

/**
 *
 *
 * @class MessageResolver
 */
@Service()
@Resolver(() => ChannelMessage)
class ChannelMessageResolver {
  /**
   * Creates an instance of MessageResolver.
   * @param {MessageService} messageService
   * @memberof MessageResolver
   */
  constructor(
    @Inject() private readonly channelMessageService: ChannelMessageService,
  ) {}

  /**
   *
   *
   * @param {string} channelId
   * @return {*}  {Promise<Message[]>}
   * @memberof MessageResolver
   */
  @Query(() => [ChannelMessage])
  async allChannelMessages(
    @Arg('channelId') channelId: string,
    @Arg('limit') limit: number,
    @Arg('cursor', { nullable: true }) cursor?: string,
  ): Promise<ChannelMessage[]> {
    const paginationConfig: {
      limit: number,
      cursor?: string,
    } = {
      limit,
    };
    if (cursor) {
      paginationConfig.cursor = cursor;
    }
    return this.channelMessageService.getAllByChannelId(channelId, paginationConfig);
  }

  /**
   *
   *
   * @param {CreateMessageInput} payload
   * @return {*}  {Promise<String>}
   * @memberof MessageResolver
   */
  @Mutation(() => String)
  async createChannelMessage(
    @Args() payload: CreateChannelMessageInput,
    @PubSub() pubsub: PubSubEngine,
  ): Promise<String> {
    const message = await this.channelMessageService.create(payload);
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
    @Root() payload: ChannelMessage,
    @Arg('channelId') _channelId: string,
  ) : ChannelMessage {
    return payload;
  }
}

export default ChannelMessageResolver;
