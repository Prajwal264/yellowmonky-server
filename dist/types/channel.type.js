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
exports.ChannelResponse = void 0;
const type_graphql_1 = require("type-graphql");
const channel_entity_1 = __importDefault(require("../entities/channel.entity"));
let ChannelResponse = class ChannelResponse extends channel_entity_1.default {
};
ChannelResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ChannelResponse);
exports.ChannelResponse = ChannelResponse;
//# sourceMappingURL=channel.type.js.map