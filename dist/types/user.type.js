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
exports.RegisterAdminResponse = exports.AdminUser = exports.UserResponse = void 0;
const type_graphql_1 = require("type-graphql");
const user_entity_1 = __importDefault(require("../entities/user.entity"));
let UserResponse = class UserResponse extends user_entity_1.default {
};
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
exports.UserResponse = UserResponse;
let AdminUser = class AdminUser extends user_entity_1.default {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AdminUser.prototype, "teamId", void 0);
AdminUser = __decorate([
    (0, type_graphql_1.ObjectType)()
], AdminUser);
exports.AdminUser = AdminUser;
let RegisterAdminResponse = class RegisterAdminResponse extends AdminUser {
};
RegisterAdminResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], RegisterAdminResponse);
exports.RegisterAdminResponse = RegisterAdminResponse;
//# sourceMappingURL=user.type.js.map