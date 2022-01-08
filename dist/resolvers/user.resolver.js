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
const user_service_1 = __importDefault(require("../services/user.service"));
const team_service_1 = __importDefault(require("../services/team.service"));
const team_member_service_1 = __importDefault(require("../services/team-member.service"));
const user_type_1 = require("../types/user.type");
const team_member_type_1 = require("../types/team-member.type");
const user_entity_1 = __importDefault(require("../entities/user.entity"));
const user_input_1 = require("../input/user.input");
let UserResolver = class UserResolver {
    constructor(userService, teamService, teamMemberService) {
        this.userService = userService;
        this.teamService = teamService;
        this.teamMemberService = teamMemberService;
    }
    async getUsers() {
        return this.userService.list();
    }
    async registerAdmin(payload) {
        const userResponse = await this.userService.create(payload);
        const teamResponse = await this.teamService.create({}, userResponse);
        const createTeamMemberPayload = {};
        createTeamMemberPayload.role = team_member_type_1.TeamMemberRole.ADMIN;
        createTeamMemberPayload.status = team_member_type_1.TeamMemberStatus.JOINED;
        createTeamMemberPayload.userId = userResponse.id;
        createTeamMemberPayload.teamId = teamResponse.id;
        await this.teamMemberService.create(createTeamMemberPayload);
        return Object.assign(Object.assign({}, userResponse), { teamId: teamResponse.id });
    }
    async login(payload) {
        const loginResponse = await this.userService.verify(payload);
        return loginResponse;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [user_entity_1.default], { nullable: 'items' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_type_1.RegisterAdminResponse),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "registerAdmin", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_type_1.UserResponse),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => user_entity_1.default),
    __param(0, (0, typedi_1.Inject)()),
    __param(1, (0, typedi_1.Inject)()),
    __param(2, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [user_service_1.default,
        team_service_1.default,
        team_member_service_1.default])
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=user.resolver.js.map