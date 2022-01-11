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
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const errors_1 = require("../constants/errors");
const custom_error_type_1 = require("../types/custom-error.type");
const message_entity_1 = __importDefault(require("../entities/message.entity"));
let MessageService = class MessageService {
    constructor() { }
    async getById(messageId) {
        const channel = await message_entity_1.default.findOne(messageId);
        if (!channel) {
            throw new custom_error_type_1.CustomError(errors_1.ERROR_TYPE.NOT_FOUND, 'messageId', 'No message Found');
        }
        return channel;
    }
    async getAllByChannelId(channelId, paginationConfig) {
        const findOptions = {
            where: {
                sourceChannelId: channelId,
            },
            take: paginationConfig.limit,
            order: {
                createdAt: 'DESC',
            },
        };
        if (paginationConfig.cursor) {
            const cursorMessage = await this.getById(paginationConfig.cursor);
            findOptions.where.createdAt = (0, typeorm_1.LessThan)(new Date(cursorMessage.createdAt));
        }
        const messages = await message_entity_1.default.find(findOptions);
        return messages;
    }
    async create(payload) {
        const response = await message_entity_1.default.create(payload).save();
        return response;
    }
};
MessageService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], MessageService);
exports.default = MessageService;
//# sourceMappingURL=message.service.js.map