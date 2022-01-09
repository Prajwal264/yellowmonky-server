"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const custom_error_type_1 = require("../types/custom-error.type");
const channel_entity_1 = __importDefault(require("../entities/channel.entity"));
const errors_1 = require("../constants/errors");
let ChannelService = class ChannelService {
    async getByName(name, teamId) {
        const team = await channel_entity_1.default.findOne({ name, teamId });
        return team;
    }
    async create(payload, admin, team) {
        if (payload.name) {
            const channel = await this.getByName(payload.name, team.id);
            if (channel) {
                throw new custom_error_type_1.CustomError(errors_1.ERROR_TYPE.CONFLICT, `channel with name ${payload.name} already exists`);
            }
        }
        const channel = await channel_entity_1.default.create({
            name: payload.name,
            team,
            admin,
        }).save();
        return channel;
    }
    async fetchById(channelId) {
        const channel = await channel_entity_1.default.findOne(channelId);
        if (!channel) {
            throw new custom_error_type_1.CustomError(errors_1.ERROR_TYPE.NOT_FOUND, 'channelId', 'No Channel Found');
        }
        return channel;
    }
    async fetchExistingChannelsByTeamId(teamId) {
        const allChannels = await channel_entity_1.default.find({ teamId });
        return allChannels;
    }
};
ChannelService = __decorate([
    (0, typedi_1.Service)()
], ChannelService);
exports.default = ChannelService;
//# sourceMappingURL=channel.service.js.map