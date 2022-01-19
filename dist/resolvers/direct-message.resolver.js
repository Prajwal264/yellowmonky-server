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
const direct_message_entity_1 = __importDefault(require("../entities/direct-message.entity"));
const subscription_topics_type_1 = require("../types/subscription-topics.type");
const message_input_1 = require("../input/message.input");
const direct_message_service_1 = __importDefault(require("../services/direct-message.service"));
let DirectMessageResolver = class DirectMessageResolver {
    constructor(directMessageService) {
        this.directMessageService = directMessageService;
    }
    async allDirectMessagesByRecipientId(creatorId, recipientId, limit, cursor) {
        const paginationConfig = {
            limit,
        };
        if (cursor) {
            paginationConfig.cursor = cursor;
        }
        return this.directMessageService.getAllByRecipientId(creatorId, recipientId, paginationConfig);
    }
    async createDirectMessage(payload, pubsub) {
        const message = await this.directMessageService.create(payload);
        pubsub.publish(subscription_topics_type_1.SubscriptionTopic.NEW_DIRECT_MESSAGE, message);
        return message.id;
    }
    newDirectMessage(payload, _creatorId, _recipientId) {
        return payload;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [direct_message_entity_1.default]),
    __param(0, (0, type_graphql_1.Arg)('creatorId')),
    __param(1, (0, type_graphql_1.Arg)('recipientId')),
    __param(2, (0, type_graphql_1.Arg)('limit')),
    __param(3, (0, type_graphql_1.Arg)('cursor', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", Promise)
], DirectMessageResolver.prototype, "allDirectMessagesByRecipientId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.PubSub)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_input_1.CreateDirectMessageInput,
        type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], DirectMessageResolver.prototype, "createDirectMessage", null);
__decorate([
    (0, type_graphql_1.Subscription)({
        topics: subscription_topics_type_1.SubscriptionTopic.NEW_DIRECT_MESSAGE,
        filter: ({ payload, args, }) => (args.recipientId === payload.creatorId && args.creatorId === payload.recipientId),
    }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Arg)('creatorId')),
    __param(2, (0, type_graphql_1.Arg)('recipientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [direct_message_entity_1.default, String, String]),
    __metadata("design:returntype", direct_message_entity_1.default)
], DirectMessageResolver.prototype, "newDirectMessage", null);
DirectMessageResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => direct_message_entity_1.default),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [direct_message_service_1.default])
], DirectMessageResolver);
exports.default = DirectMessageResolver;
//# sourceMappingURL=direct-message.resolver.js.map