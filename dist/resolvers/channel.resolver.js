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
const channel_input_1 = require("../input/channel.input");
const team_service_1 = __importDefault(require("../services/team.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
const channel_entity_1 = __importDefault(require("../entities/channel.entity"));
const channel_service_1 = __importDefault(require("../services/channel.service"));
let ChannelResolver = class ChannelResolver {
    constructor(channelService, userService, teamService) {
        this.channelService = channelService;
        this.userService = userService;
        this.teamService = teamService;
    }
    allChannels(teamId) {
        return this.channelService.fetchExistingChannelsByTeamId(teamId);
    }
    async createChannel(payload, adminId, teamId) {
        const adminPromise = this.userService.getById(adminId);
        const teamPromise = this.teamService.getById(teamId);
        const [admin, team] = await Promise.all([adminPromise, teamPromise]);
        return this.channelService.create(payload, admin, team);
    }
    async editChannel(payload) {
        return this.channelService.edit(payload);
    }
    channel(channelId) {
        return this.channelService.fetchById(channelId);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [channel_entity_1.default], { nullable: 'items' }),
    __param(0, (0, type_graphql_1.Arg)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "allChannels", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => channel_entity_1.default),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('adminId')),
    __param(2, (0, type_graphql_1.Arg)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channel_input_1.CreateChannelInput, String, String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "createChannel", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => channel_entity_1.default),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channel_input_1.EditChannelInput]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "editChannel", null);
__decorate([
    (0, type_graphql_1.Query)(() => channel_entity_1.default),
    __param(0, (0, type_graphql_1.Arg)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "channel", null);
ChannelResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(() => channel_entity_1.default),
    __param(0, (0, typedi_1.Inject)()),
    __param(1, (0, typedi_1.Inject)()),
    __param(2, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [channel_service_1.default,
        user_service_1.default,
        team_service_1.default])
], ChannelResolver);
exports.default = ChannelResolver;
//# sourceMappingURL=channel.resolver.js.map