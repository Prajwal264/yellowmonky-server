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
exports.EditTeamResponse = exports.TeamResponse = void 0;
const type_graphql_1 = require("type-graphql");
const team_entity_1 = __importDefault(require("../entities/team.entity"));
let TeamResponse = class TeamResponse extends team_entity_1.default {
};
TeamResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], TeamResponse);
exports.TeamResponse = TeamResponse;
let EditTeamResponse = class EditTeamResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EditTeamResponse.prototype, "teamId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], EditTeamResponse.prototype, "channels", void 0);
EditTeamResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], EditTeamResponse);
exports.EditTeamResponse = EditTeamResponse;
//# sourceMappingURL=team.type.js.map