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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserAndAddToTeamInput = exports.CreateTeamMemberInput = void 0;
const type_graphql_1 = require("type-graphql");
const team_member_type_1 = require("../types/team-member.type");
const user_input_1 = require("./user.input");
let CreateTeamMemberInput = class CreateTeamMemberInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateTeamMemberInput.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateTeamMemberInput.prototype, "teamId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: team_member_type_1.TeamMemberRole.MEMBER }),
    __metadata("design:type", String)
], CreateTeamMemberInput.prototype, "role", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: team_member_type_1.TeamMemberStatus.INVITED }),
    __metadata("design:type", String)
], CreateTeamMemberInput.prototype, "status", void 0);
CreateTeamMemberInput = __decorate([
    (0, type_graphql_1.ArgsType)()
], CreateTeamMemberInput);
exports.CreateTeamMemberInput = CreateTeamMemberInput;
let CreateUserAndAddToTeamInput = class CreateUserAndAddToTeamInput extends user_input_1.RegisterInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateUserAndAddToTeamInput.prototype, "teamId", void 0);
CreateUserAndAddToTeamInput = __decorate([
    (0, type_graphql_1.ArgsType)()
], CreateUserAndAddToTeamInput);
exports.CreateUserAndAddToTeamInput = CreateUserAndAddToTeamInput;
//# sourceMappingURL=team-member.input.js.map