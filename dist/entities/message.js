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
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const message_type_1 = require("../types/message.type");
const wrapper_1 = __importDefault(require("./wrapper"));
let Message = class Message extends wrapper_1.default {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => message_type_1.MessageSourceType),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "sourceType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'creator_id' }),
    __metadata("design:type", String)
], Message.prototype, "creatorId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ name: 'parent_message_id', nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "parentMessageId", void 0);
Message = __decorate([
    (0, type_graphql_1.InterfaceType)({ implements: wrapper_1.default })
], Message);
exports.default = Message;
//# sourceMappingURL=message.js.map