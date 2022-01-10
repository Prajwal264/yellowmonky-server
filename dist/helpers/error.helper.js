"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const class_validator_message_formatter_1 = require("class-validator-message-formatter");
const errors_1 = __importStar(require("../constants/errors"));
const formatError = (error) => {
    var _a, _b, _c, _d;
    if ((_b = (_a = error.extensions) === null || _a === void 0 ? void 0 : _a.exception) === null || _b === void 0 ? void 0 : _b.validationErrors) {
        const formattedErrors = class_validator_message_formatter_1.MessageFormatter.format((_d = (_c = error.extensions) === null || _c === void 0 ? void 0 : _c.exception) === null || _d === void 0 ? void 0 : _d.validationErrors);
        if (formattedErrors.length) {
            const formattedError = {};
            formattedError.message = formattedErrors[0].message;
            formattedError.extensions = {
                field: formattedErrors[0].field,
                code: errors_1.default[errors_1.ERROR_TYPE.BAD_REQUEST].statusCode,
            };
            return formattedError;
        }
    }
    return error;
};
exports.formatError = formatError;
//# sourceMappingURL=error.helper.js.map