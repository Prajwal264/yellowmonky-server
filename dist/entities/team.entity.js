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
const wrapper_1 = __importDefault(require("./wrapper"));
const team_member_entity_1 = __importDefault(require("./team-member.entity"));
const user_entity_1 = __importDefault(require("./user.entity"));
const channel_entity_1 = __importDefault(require("./channel.entity"));
let Team = class Team extends wrapper_1.default {
};
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: '', nullable: true }),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ name: 'display_picture', nullable: true }),
    __metadata("design:type", String)
], Team.prototype, "displayPicture", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'owner_id' }),
    __metadata("design:type", String)
], Team.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, (user) => user.teamOwner),
    (0, typeorm_1.JoinColumn)({ name: 'owner_id' }),
    __metadata("design:type", user_entity_1.default)
], Team.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_member_entity_1.default, (teamMember) => teamMember.team),
    __metadata("design:type", Array)
], Team.prototype, "teamMembers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => channel_entity_1.default, (channel) => channel.team),
    __metadata("design:type", Array)
], Team.prototype, "teamChannels", void 0);
Team = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: wrapper_1.default }),
    (0, typeorm_1.Entity)({ name: 'teams' })
], Team);
exports.default = Team;
//# sourceMappingURL=team.entity.js.map