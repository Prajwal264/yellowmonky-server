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
const bcrypt_1 = require("bcrypt");
const custom_error_type_1 = require("../types/custom-error.type");
const errors_1 = require("../constants/errors");
const user_entity_1 = __importDefault(require("../entities/user.entity"));
let UserService = class UserService {
    async list() {
        return user_entity_1.default.find();
    }
    async hashPassword(password) {
        const hashedPassword = await (0, bcrypt_1.hash)(password, 12);
        return hashedPassword;
    }
    async comparePasswords(password, userPassword) {
        return (0, bcrypt_1.compare)(password, userPassword);
    }
    async getById(id) {
        const user = await user_entity_1.default.findOne(id);
        if (!user) {
            throw new custom_error_type_1.CustomError(errors_1.ERROR_TYPE.NOT_FOUND, 'id');
        }
        return user;
    }
    async getByEmail(email) {
        const user = await user_entity_1.default.findOne({ email });
        return user;
    }
    async create(payload) {
        const { email, username, password, } = payload;
        const userResponse = await this.getByEmail(email);
        if (userResponse) {
            throw new custom_error_type_1.CustomError(errors_1.ERROR_TYPE.CONFLICT, 'email', `User with ${email} already exists`);
        }
        const hashedPassword = await this.hashPassword(password);
        const user = await user_entity_1.default.create({
            username,
            email,
            password: hashedPassword,
        }).save();
        return user;
    }
    async verify(payload) {
        const { email, password } = payload;
        const userResponse = await this.getByEmail(email);
        if (!userResponse) {
            throw new custom_error_type_1.CustomError(errors_1.ERROR_TYPE.NOT_FOUND, 'email');
        }
        const validUser = await this.comparePasswords(password, userResponse.password);
        if (!validUser) {
            throw new custom_error_type_1.CustomError(errors_1.ERROR_TYPE.UNAUTHORIZED, 'password');
        }
        return userResponse;
    }
};
UserService = __decorate([
    (0, typedi_1.Service)()
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map