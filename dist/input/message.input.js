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
exports.CreateDirectMessageInput = exports.CreateChannelMessageInput = void 0;
const type_graphql_1 = require("type-graphql");
const message_type_1 = require("../types/message.type");
let CreateChannelMessageInput = class CreateChannelMessageInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateChannelMessageInput.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateChannelMessageInput.prototype, "creatorId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => message_type_1.MessageSourceType),
    __metadata("design:type", String)
], CreateChannelMessageInput.prototype, "sourceType", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateChannelMessageInput.prototype, "sourceChannelId", void 0);
CreateChannelMessageInput = __decorate([
    (0, type_graphql_1.ArgsType)()
], CreateChannelMessageInput);
exports.CreateChannelMessageInput = CreateChannelMessageInput;
let CreateDirectMessageInput = class CreateDirectMessageInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateDirectMessageInput.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateDirectMessageInput.prototype, "creatorId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => message_type_1.MessageSourceType),
    __metadata("design:type", String)
], CreateDirectMessageInput.prototype, "sourceType", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateDirectMessageInput.prototype, "recipientId", void 0);
CreateDirectMessageInput = __decorate([
    (0, type_graphql_1.ArgsType)()
], CreateDirectMessageInput);
exports.CreateDirectMessageInput = CreateDirectMessageInput;
//# sourceMappingURL=message.input.js.map