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
const channel_service_1 = __importDefault(require("../services/channel.service"));
const team_service_1 = __importDefault(require("../services/team.service"));
const team_input_1 = require("../input/team.input");
const team_entity_1 = __importDefault(require("../entities/team.entity"));
const team_type_1 = require("../types/team.type");
const user_service_1 = __importDefault(require("../services/user.service"));
let TeamResolver = class TeamResolver {
    constructor(userService, teamService, channelService) {
        this.userService = userService;
        this.teamService = teamService;
        this.channelService = channelService;
    }
    team(id) {
        return this.teamService.getById(id);
    }
    async allTeams(userId) {
        const teams = await this.teamService.getAllByMemberId(userId);
        return teams;
    }
    async editTeam(payload) {
        var _a, _b;
        const teamId = payload.id;
        const adminId = payload.ownerId;
        const editTeamPayload = {
            id: teamId,
            ownerId: payload.ownerId,
            name: payload.name,
            displayPicture: payload.displayPicture,
        };
        const editTeamPromise = this.teamService.edit(editTeamPayload);
        const existingChannelsPromise = this.channelService.fetchExistingChannelsByTeamId(teamId);
        const adminPromise = this.userService.getById(adminId);
        const teamPromise = this.teamService.getById(teamId);
        const [_, existingChannels, admin, team] = await Promise.all([
            editTeamPromise,
            existingChannelsPromise,
            adminPromise,
            teamPromise,
        ]);
        const channelPromises = [];
        const generalExists = existingChannels.some((channel) => channel.name === 'general');
        if (!generalExists) {
            const createChannelPayload = {
                name: 'general',
            };
            const generalChannelPromise = this.channelService.create(createChannelPayload, admin, team);
            channelPromises.push(generalChannelPromise);
        }
        if ((_a = payload.channels) === null || _a === void 0 ? void 0 : _a.length) {
            const newChannelPromises = payload.channels.reduce((acc, cur) => {
                const createChannelPayload = {
                    name: cur,
                };
                const channelPromise = this.channelService.create(createChannelPayload, admin, team);
                acc.push(channelPromise);
                return acc;
            }, []);
            channelPromises.push(...newChannelPromises);
        }
        const channels = await Promise.all(channelPromises);
        existingChannels.push(...channels);
        if ((_b = payload.members) === null || _b === void 0 ? void 0 : _b.length) {
            const memberInvitePromises = payload.members
                .map((member) => this.teamService.sendInvite(member, { team, inviter: admin }));
            Promise.all(memberInvitePromises);
        }
        return {
            teamId,
            channels: existingChannels.map((channel) => channel.id),
        };
    }
    async inviteMembers(payload) {
        const teamPromise = this.teamService.getById(payload.teamId);
        const inviterPromise = this.userService.getById(payload.inviterId);
        const [team, inviter] = await Promise.all([teamPromise, inviterPromise]);
        const invitePromises = payload.inviteeEmails
            .map((email) => this.teamService.sendInvite(email, { team, inviter }));
        await Promise.all(invitePromises);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => team_entity_1.default),
    __param(0, (0, type_graphql_1.Arg)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "team", null);
__decorate([
    (0, type_graphql_1.Query)(() => [team_type_1.TeamListResponse]),
    __param(0, (0, type_graphql_1.Arg)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "allTeams", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => team_type_1.EditTeamResponse),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_input_1.EditTeamInput]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "editTeam", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_input_1.InvitedMembersInput]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "inviteMembers", null);
TeamResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => team_entity_1.default),
    __param(0, (0, typedi_1.Inject)()),
    __param(1, (0, typedi_1.Inject)()),
    __param(2, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [user_service_1.default,
        team_service_1.default,
        channel_service_1.default])
], TeamResolver);
exports.default = TeamResolver;
//# sourceMappingURL=team.resolver.js.map