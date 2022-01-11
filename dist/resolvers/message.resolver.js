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
const subscription_topics_type_1 = require("../types/subscription-topics.type");
const message_input_1 = require("../input/message.input");
const message_service_1 = __importDefault(require("../services/message.service"));
const message_entity_1 = __importDefault(require("../entities/message.entity"));
let MessageResolver = class MessageResolver {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async allChannelMessages(channelId, limit, cursor) {
        const paginationConfig = {
            limit,
        };
        if (cursor) {
            paginationConfig.cursor = cursor;
        }
        return this.messageService.getAllByChannelId(channelId, paginationConfig);
    }
    async createMessage(payload, pubsub) {
        const message = await this.messageService.create(payload);
        pubsub.publish(subscription_topics_type_1.SubscriptionTopic.NEW_CHANNEL_MESSAGE, message);
        return message.id;
    }
    newChannelMessage(payload, _channelId) {
        return payload;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [message_entity_1.default]),
    __param(0, (0, type_graphql_1.Arg)('channelId')),
    __param(1, (0, type_graphql_1.Arg)('limit')),
    __param(2, (0, type_graphql_1.Arg)('cursor', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "allChannelMessages", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.PubSub)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_input_1.CreateMessageInput,
        type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
__decorate([
    (0, type_graphql_1.Subscription)({
        topics: subscription_topics_type_1.SubscriptionTopic.NEW_CHANNEL_MESSAGE,
        filter: ({ payload, args }) => args.channelId === payload.sourceChannelId,
    }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Arg)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_entity_1.default, String]),
    __metadata("design:returntype", message_entity_1.default)
], MessageResolver.prototype, "newChannelMessage", null);
MessageResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => message_entity_1.default),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [message_service_1.default])
], MessageResolver);
exports.default = MessageResolver;
//# sourceMappingURL=message.resolver.js.map