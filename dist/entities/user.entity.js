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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const wrapper_1 = __importDefault(require("./wrapper"));
const team_member_entity_1 = __importDefault(require("./team-member.entity"));
const team_entity_1 = __importDefault(require("./team.entity"));
const channel_entity_1 = __importDefault(require("./channel.entity"));
const message_entity_1 = __importDefault(require("./message.entity"));
let User = class User extends wrapper_1.default {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid Email' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ name: 'profile_image', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => channel_entity_1.default, (channel) => channel.admin),
    __metadata("design:type", Array)
], User.prototype, "channelAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.default, (message) => message.creator),
    __metadata("design:type", Array)
], User.prototype, "messageCreator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_entity_1.default, (team) => team.owner),
    __metadata("design:type", Array)
], User.prototype, "teamOwner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_member_entity_1.default, (teamMember) => teamMember.user),
    __metadata("design:type", Array)
], User.prototype, "teamMembers", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: wrapper_1.default }),
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
exports.default = User;
//# sourceMappingURL=user.entity.js.map