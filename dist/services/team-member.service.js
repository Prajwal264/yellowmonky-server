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
const typedi_1 = require("typedi");
const custom_error_type_1 = require("../types/custom-error.type");
const errors_1 = require("../constants/errors");
const user_service_1 = __importDefault(require("./user.service"));
const team_service_1 = __importDefault(require("./team.service"));
const team_member_entity_1 = __importDefault(require("../entities/team-member.entity"));
let TeamMemberService = class TeamMemberService {
    constructor(userService, teamService) {
        this.userService = userService;
        this.teamService = teamService;
    }
    async getById(memberId, findOptions = {}) {
        const member = await team_member_entity_1.default.findOne(memberId, findOptions);
        if (!member) {
            throw new custom_error_type_1.CustomError(errors_1.ERROR_TYPE.BAD_REQUEST, 'id', `member with id: ${memberId} doesn't exist`);
        }
        return member;
    }
    async fetchAllByIteam(teamId) {
        const members = await team_member_entity_1.default.find({ where: { teamId }, relations: ['user'] });
        return members;
    }
    async create(payload) {
        const userPromise = this.userService.getById(payload.userId);
        const teamPromise = this.teamService.getById(payload.teamId);
        const [userResponse, teamResponse] = await Promise.all([userPromise, teamPromise]);
        const teamMemberResponse = await team_member_entity_1.default.create({
            team: teamResponse,
            user: userResponse,
            role: payload.role,
            status: payload.status,
        }).save();
        return teamMemberResponse;
    }
};
TeamMemberService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [user_service_1.default,
        team_service_1.default])
], TeamMemberService);
exports.default = TeamMemberService;
//# sourceMappingURL=team-member.service.js.map