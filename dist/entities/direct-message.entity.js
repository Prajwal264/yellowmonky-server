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
var DirectMessage_1;
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const message_1 = __importDefault(require("./message"));
const team_member_entity_1 = __importDefault(require("./team-member.entity"));
const wrapper_1 = __importDefault(require("./wrapper"));
let DirectMessage = DirectMessage_1 = class DirectMessage extends message_1.default {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'recipient_id' }),
    __metadata("design:type", String)
], DirectMessage.prototype, "recipientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_member_entity_1.default, (teamMember) => teamMember.directMessageRecipient, {
        nullable: true,
    }),
    (0, type_graphql_1.Field)(() => team_member_entity_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'recipient_id' }),
    __metadata("design:type", team_member_entity_1.default)
], DirectMessage.prototype, "recipient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_member_entity_1.default, (teamMember) => teamMember.directMessageCreator),
    (0, type_graphql_1.Field)(() => team_member_entity_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'creator_id' }),
    __metadata("design:type", team_member_entity_1.default)
], DirectMessage.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DirectMessage_1, (message) => message.parentMessage),
    (0, type_graphql_1.Field)(() => DirectMessage_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'child_message_id' }),
    __metadata("design:type", Array)
], DirectMessage.prototype, "childMessages", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DirectMessage_1, (message) => message.childMessages),
    (0, type_graphql_1.Field)(() => DirectMessage_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_message_id' }),
    __metadata("design:type", DirectMessage)
], DirectMessage.prototype, "parentMessage", void 0);
DirectMessage = DirectMessage_1 = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: [message_1.default, wrapper_1.default] }),
    (0, typeorm_1.Entity)({ name: 'direct_messages' })
], DirectMessage);
exports.default = DirectMessage;
//# sourceMappingURL=direct-message.entity.js.map