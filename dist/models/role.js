"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
});
schema.methods.toJSON = function () {
    const _a = this.toObject(), { _id, __v } = _a, props = __rest(_a, ["_id", "__v"]);
    return Object.assign(Object.assign({}, props), { id: _id });
};
const modelRole = (0, mongoose_1.model)('Role', schema);
exports.default = modelRole;
//# sourceMappingURL=role.js.map