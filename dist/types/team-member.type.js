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
exports.CreateMemberResponse = exports.TeamMemberStatus = exports.TeamMemberRole = void 0;
const type_graphql_1 = require("type-graphql");
var TeamMemberRole;
(function (TeamMemberRole) {
    TeamMemberRole["ADMIN"] = "ADMIN";
    TeamMemberRole["MEMBER"] = "MEMBER";
})(TeamMemberRole = exports.TeamMemberRole || (exports.TeamMemberRole = {}));
var TeamMemberStatus;
(function (TeamMemberStatus) {
    TeamMemberStatus["JOINED"] = "JOINED";
    TeamMemberStatus["INVITED"] = "INVITED";
    TeamMemberStatus["REJECTED"] = "REJECTED";
})(TeamMemberStatus = exports.TeamMemberStatus || (exports.TeamMemberStatus = {}));
(0, type_graphql_1.registerEnumType)(TeamMemberRole, {
    name: 'TeamMemberRole',
    description: 'The team member role type',
});
(0, type_graphql_1.registerEnumType)(TeamMemberStatus, {
    name: 'TeamMemberStatus',
    description: 'The team member status type',
});
let CreateMemberResponse = class CreateMemberResponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMemberResponse.prototype, "teamId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMemberResponse.prototype, "channelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMemberResponse.prototype, "id", void 0);
CreateMemberResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], CreateMemberResponse);
exports.CreateMemberResponse = CreateMemberResponse;
//# sourceMappingURL=team-member.type.js.map