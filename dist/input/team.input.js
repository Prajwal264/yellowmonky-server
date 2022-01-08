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
exports.InvitedMemberInput = exports.EditTeamInput = exports.CreateTeamInput = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
let CreateTeamInput = class CreateTeamInput {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateTeamInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], CreateTeamInput.prototype, "channels", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    (0, class_validator_1.IsEmail)({}, { each: true }),
    __metadata("design:type", Array)
], CreateTeamInput.prototype, "members", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateTeamInput.prototype, "displayPicture", void 0);
CreateTeamInput = __decorate([
    (0, type_graphql_1.ArgsType)()
], CreateTeamInput);
exports.CreateTeamInput = CreateTeamInput;
let EditTeamInput = class EditTeamInput extends CreateTeamInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EditTeamInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EditTeamInput.prototype, "ownerId", void 0);
EditTeamInput = __decorate([
    (0, type_graphql_1.ArgsType)()
], EditTeamInput);
exports.EditTeamInput = EditTeamInput;
let InvitedMemberInput = class InvitedMemberInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], InvitedMemberInput.prototype, "inviterId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], InvitedMemberInput.prototype, "inviteeEmail", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], InvitedMemberInput.prototype, "teamId", void 0);
InvitedMemberInput = __decorate([
    (0, type_graphql_1.ArgsType)()
], InvitedMemberInput);
exports.InvitedMemberInput = InvitedMemberInput;
//# sourceMappingURL=team.input.js.map