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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ChannelMessage_1;
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const channel_entity_1 = __importDefault(require("./channel.entity"));
const message_1 = __importDefault(require("./message"));
const team_member_entity_1 = __importDefault(require("./team-member.entity"));
const wrapper_1 = __importDefault(require("./wrapper"));
let ChannelMessage = ChannelMessage_1 = class ChannelMessage extends message_1.default {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'source_channel_id' }),
    __metadata("design:type", String)
], ChannelMessage.prototype, "sourceChannelId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channel_entity_1.default, (channel) => channel.channelMessage, { nullable: true }),
    (0, type_graphql_1.Field)(() => channel_entity_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'source_channel_id' }),
    __metadata("design:type", channel_entity_1.default)
], ChannelMessage.prototype, "sourceChannel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_member_entity_1.default, (teamMember) => teamMember.channelMessageCreator),
    (0, type_graphql_1.Field)(() => team_member_entity_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'creator_id' }),
    __metadata("design:type", team_member_entity_1.default)
], ChannelMessage.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ChannelMessage_1, (message) => message.parentMessage),
    (0, type_graphql_1.Field)(() => ChannelMessage_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'child_message_id' }),
    __metadata("design:type", Array)
], ChannelMessage.prototype, "childMessages", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ChannelMessage_1, (message) => message.childMessages),
    (0, type_graphql_1.Field)(() => ChannelMessage_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_message_id' }),
    __metadata("design:type", ChannelMessage)
], ChannelMessage.prototype, "parentMessage", void 0);
ChannelMessage = ChannelMessage_1 = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: [message_1.default, wrapper_1.default] }),
    (0, typeorm_1.Entity)({ name: 'channel_messages' })
], ChannelMessage);
exports.default = ChannelMessage;
//# sourceMappingURL=channel-message.entity.js.map