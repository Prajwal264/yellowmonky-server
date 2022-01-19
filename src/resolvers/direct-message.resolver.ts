import {
  Arg, Args, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription,
} from 'type-graphql';
import { Inject, Service } from 'typedi';
import DirectMessage from '../entities/direct-message.entity';
import { SubscriptionTopic } from '../types/subscription-topics.type';
import { CreateDirectMessageInput } from '../input/message.input';
import DirectMessageService from '../services/direct-message.service';

/**
 *
 *
 * @class MessageResolver
 */
@Service()
@Resolver(() => DirectMessage)
class DirectMessageResolver {
  /**
   * Creates an instance of DirectMessageResolver.
   * @param {DirectMessageService} directMessageService
   * @memberof DirectMessageResolver
   */
  constructor(
    @Inject() private readonly directMessageService: DirectMessageService,
  ) {}

  /**
   *
   *
   * @param {string} creatorId
   * @param {string} recipientId
   * @param {number} limit
   * @param {string} [cursor]
   * @return {*}  {Promise<DirectMessage[]>}
   * @memberof DirectMessageResolver
   */
  @Query(() => [DirectMessage])
  async allDirectMessagesByRecipientId(
    @Arg('creatorId') creatorId: string,
    @Arg('recipientId') recipientId: string,
    @Arg('limit') limit: number,
    @Arg('cursor', { nullable: true }) cursor?: string,
  ): Promise<DirectMessage[]> {
    const paginationConfig: {
      limit: number,
      cursor?: string,
    } = {
      limit,
    };
    if (cursor) {
      paginationConfig.cursor = cursor;
    }
    return this.directMessageService.getAllByRecipientId(creatorId, recipientId, paginationConfig);
  }

  /**
   *
   *
   * @param {CreateDirectMessageInput} payload
   * @param {PubSubEngine} pubsub
   * @return {*}  {Promise<String>}
   * @memberof DirectMessageResolver
   */
  @Mutation(() => String)
  async createDirectMessage(
    @Args() payload: CreateDirectMessageInput,
    @PubSub() pubsub: PubSubEngine,
  ): Promise<String> {
    const message = await this.directMessageService.create(payload);
    pubsub.publish(SubscriptionTopic.NEW_DIRECT_MESSAGE, message);
    return message.id;
  }

  /**
   *
   *
   * @param {DirectMessage} payload
   * @param {string} _creatorId
   * @param {string} _recipientId
   * @return {*}  {DirectMessage}
   * @memberof DirectMessageResolver
   */
  @Subscription({
    topics: SubscriptionTopic.NEW_DIRECT_MESSAGE,
    filter: ({
      payload,
      args,
    }) => (args.creatorId === payload.creatorId && args.recipientId === payload.recipientId),
  })
  newDirectMessage(
    @Root() payload: DirectMessage,
    @Arg('creatorId') _creatorId: string,
    @Arg('recipientId') _recipientId: string,
  ) : DirectMessage {
    return payload;
  }
}

export default DirectMessageResolver;
