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
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const token_helper_1 = require("../helpers/token.helper");
const auth_helper_1 = require("../helpers/auth.helper");
const custom_error_type_1 = require("../types/custom-error.type");
const errors_1 = require("../constants/errors");
const team_entity_1 = __importDefault(require("../entities/team.entity"));
let TeamService = class TeamService {
    async getById(id) {
        const team = await team_entity_1.default.findOne(id);
        if (!team) {
            throw new custom_error_type_1.CustomError(errors_1.ERROR_TYPE.NOT_FOUND, 'id');
        }
        return team;
    }
    async getAllByMemberId(memberId) {
        const teams = await team_entity_1.default.createQueryBuilder('teams')
            .leftJoin('teams.teamMembers', 'team_members')
            .where('team_members.user_id = :userId', { userId: memberId })
            .loadAllRelationIds({
            relations: ['teamMembers'],
        })
            .getMany();
        const teamListReponse = teams.map((team) => (Object.assign(Object.assign({}, team), { memberCount: team.teamMembers.length })));
        return teamListReponse;
    }
    async getByName(name) {
        const team = await team_entity_1.default.findOne({ name });
        return team;
    }
    async create(payload, owner) {
        if (payload.name) {
            const team = await this.getByName(payload.name);
            if (team) {
                throw new custom_error_type_1.CustomError(errors_1.ERROR_TYPE.CONFLICT, `team with name ${payload.name} already exists`);
            }
        }
        const team = await team_entity_1.default.create({
            name: payload.name,
            owner,
        }).save();
        return team;
    }
    async edit(payload) {
        const team = await this.getById(payload.id);
        if (payload.name)
            team.name = payload.name;
        if (payload.displayPicture)
            team.displayPicture = payload.displayPicture;
        await team_entity_1.default.update(payload.id, team);
        return team;
    }
    async sendInvite(emailId, metadata) {
        return new Promise((resolve) => {
            fs_1.default.readFile('assets/html/join-team.hbs', async (err, data) => {
                if (!err) {
                    const inviteToken = (0, token_helper_1.createInviteMemberToken)({
                        emailId,
                    }, '7d');
                    const clientDomain = `${process.env.CLIENT_URL}/join-team/`;
                    const inviteLink = `${clientDomain}/${metadata.team.id}/?joinId=${inviteToken}`;
                    try {
                        const source = data.toString();
                        const template = handlebars_1.default.compile(source);
                        const html = template(Object.assign(Object.assign({}, metadata), { emailId,
                            inviteLink, firstCharacter: metadata.inviter.username[0] }));
                        const transporter = await (0, auth_helper_1.createTransporter)();
                        await transporter.sendMail({
                            to: emailId,
                            from: 'excitedhchips@gmail.com',
                            subject: `${metadata.inviter.username} has invited you to work with them in YellowMonky`,
                            html,
                        });
                        resolve(true);
                    }
                    catch (e) {
                        resolve(false);
                    }
                }
                else {
                    resolve(false);
                }
            });
        });
    }
};
TeamService = __decorate([
    (0, typedi_1.Service)()
], TeamService);
exports.default = TeamService;
//# sourceMappingURL=team.service.js.map