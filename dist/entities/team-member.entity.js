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
const team_member_type_1 = require("../types/team-member.type");
const wrapper_1 = __importDefault(require("./wrapper"));
const team_entity_1 = __importDefault(require("./team.entity"));
const user_entity_1 = __importDefault(require("./user.entity"));
let TeamMember = class TeamMember extends wrapper_1.default {
};
__decorate([
    (0, type_graphql_1.Field)(() => team_member_type_1.TeamMemberRole),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeamMember.prototype, "role", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => team_member_type_1.TeamMemberStatus),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeamMember.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], TeamMember.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, (user) => user.teamMembers),
    (0, type_graphql_1.Field)(() => user_entity_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.default)
], TeamMember.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'team_id' }),
    __metadata("design:type", String)
], TeamMember.prototype, "teamId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.default, (team) => team.teamMembers),
    (0, typeorm_1.JoinColumn)({ name: 'team_id' }),
    __metadata("design:type", team_entity_1.default)
], TeamMember.prototype, "team", void 0);
TeamMember = __decorate([
    (0, type_graphql_1.ObjectType)({ implements: wrapper_1.default }),
    (0, typeorm_1.Entity)({ name: 'team_members' })
], TeamMember);
exports.default = TeamMember;
//# sourceMappingURL=team-member.entity.js.map