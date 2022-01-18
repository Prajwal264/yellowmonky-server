"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const channel_message_entity_1 = __importDefault(require("../entities/channel-message.entity"));
const subscription_topics_type_1 = require("../types/subscription-topics.type");
const message_input_1 = require("../input/message.input");
const channel_message_service_1 = __importDefault(require("../services/channel-message.service"));
let ChannelMessageResolver = class ChannelMessageResolver {
    constructor(channelMessageService) {
        this.channelMessageService = channelMessageService;
    }
    async allChannelMessages(channelId, limit, cursor) {
        const paginationConfig = {
            limit,
        };
        if (cursor) {
            paginationConfig.cursor = cursor;
        }
        return this.channelMessageService.getAllByChannelId(channelId, paginationConfig);
    }
    async createChannelMessage(payload, pubsub) {
        const message = await this.channelMessageService.create(payload);
        pubsub.publish(subscription_topics_type_1.SubscriptionTopic.NEW_CHANNEL_MESSAGE, message);
        return message.id;
    }
    newChannelMessage(payload, _channelId) {
        return payload;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [channel_message_entity_1.default]),
    __param(0, (0, type_graphql_1.Arg)('channelId')),
    __param(1, (0, type_graphql_1.Arg)('limit')),
    __param(2, (0, type_graphql_1.Arg)('cursor', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], ChannelMessageResolver.prototype, "allChannelMessages", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.PubSub)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_input_1.CreateChannelMessageInput,
        type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], ChannelMessageResolver.prototype, "createChannelMessage", null);
__decorate([
    (0, type_graphql_1.Subscription)({
        topics: subscription_topics_type_1.SubscriptionTopic.NEW_CHANNEL_MESSAGE,
        filter: ({ payload, args }) => args.channelId === payload.sourceChannelId,
    }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Arg)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channel_message_entity_1.default, String]),
    __metadata("design:returntype", channel_message_entity_1.default)
], ChannelMessageResolver.prototype, "newChannelMessage", null);
ChannelMessageResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => channel_message_entity_1.default),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [channel_message_service_1.default])
], ChannelMessageResolver);
exports.default = ChannelMessageResolver;
//# sourceMappingURL=channel-message.resolver.js.map