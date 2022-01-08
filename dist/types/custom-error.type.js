"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const errors_1 = __importDefault(require("../constants/errors"));
const error_type_1 = __importDefault(require("./error.type"));
class CustomError extends error_type_1.default {
    constructor(errorType, field, customMessage) {
        super();
        const error = errors_1.default[errorType];
        throw new apollo_server_core_1.ApolloError(customMessage || error.message, String(error.statusCode), {
            field,
        });
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom-error.type.js.map