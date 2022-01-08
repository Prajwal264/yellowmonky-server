"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSourceType = void 0;
const type_graphql_1 = require("type-graphql");
var MessageSourceType;
(function (MessageSourceType) {
    MessageSourceType["CHANNEL"] = "CHANNEL";
    MessageSourceType["DIRECT_MESSAGE"] = "DIRECT_MESSAGE";
})(MessageSourceType = exports.MessageSourceType || (exports.MessageSourceType = {}));
(0, type_graphql_1.registerEnumType)(MessageSourceType, {
    name: 'MessageSourceType',
    description: 'The source type of the message',
});
//# sourceMappingURL=message.type.js.map