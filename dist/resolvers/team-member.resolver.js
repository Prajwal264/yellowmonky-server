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
const channel_service_1 = __importDefault(require("../services/channel.service"));
const team_member_service_1 = __importDefault(require("../services/team-member.service"));
const team_member_entity_1 = __importDefault(require("../entities/team-member.entity"));
const team_member_type_1 = require("../types/team-member.type");
const team_member_input_1 = require("../input/team-member.input");
const team_service_1 = __importDefault(require("../services/team.service"));
let TeamMemberResolver = class TeamMemberResolver {
    constructor(userService, teamService, teamMemberService, channelService) {
        this.userService = userService;
        this.teamService = teamService;
        this.teamMemberService = teamMemberService;
        this.channelService = channelService;
    }
    allTeamMembers(teamId) {
        const members = this.teamMemberService.fetchAllByIteam(teamId);
        return members;
    }
    async createUserAndAddToTeam(payload) {
        var _a;
        const registerInput = {};
        registerInput.email = payload.email;
        registerInput.username = payload.username;
        registerInput.password = payload.password;
        const user = await this.userService.create(registerInput);
        const teamMemberInput = {};
        teamMemberInput.userId = user.id;
        teamMemberInput.teamId = payload.teamId;
        teamMemberInput.status = team_member_type_1.TeamMemberStatus.JOINED;
        teamMemberInput.role = team_member_type_1.TeamMemberRole.MEMBER;
        const teamMemberPromise = this.teamMemberService.create(teamMemberInput);
        const allChannelPromise = this.channelService.fetchExistingChannelsByTeamId(payload.teamId);
        const teamPromise = this.teamService.getById(payload.teamId);
        const [_, allChannels, __,] = await Promise.all([teamMemberPromise, allChannelPromise, teamPromise]);
        return {
            teamId: payload.teamId,
            channelId: (_a = allChannels[0]) === null || _a === void 0 ? void 0 : _a.id,
            id: user.id,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [team_member_entity_1.default]),
    __param(0, (0, type_graphql_1.Arg)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamMemberResolver.prototype, "allTeamMembers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => team_member_type_1.CreateMemberResponse),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_member_input_1.CreateUserAndAddToTeamInput]),
    __metadata("design:returntype", Promise)
], TeamMemberResolver.prototype, "createUserAndAddToTeam", null);
TeamMemberResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => team_member_entity_1.default),
    __param(0, (0, typedi_1.Inject)()),
    __param(1, (0, typedi_1.Inject)()),
    __param(2, (0, typedi_1.Inject)()),
    __param(3, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [user_service_1.default,
        team_service_1.default,
        team_member_service_1.default,
        channel_service_1.default])
], TeamMemberResolver);
exports.default = TeamMemberResolver;
//# sourceMappingURL=team-member.resolver.js.map