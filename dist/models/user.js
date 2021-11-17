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
    role: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'Role'
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
});
schema.methods.toJSON = function () {
    const _a = this.toObject(), { _id, __v, password } = _a, _b = _a.role, { _id: id } = _b, propsRole = __rest(_b, ["_id"]), props = __rest(_a, ["_id", "__v", "password", "role"]);
    return Object.assign(Object.assign({}, props), { id: _id, role: Object.assign(Object.assign({}, propsRole), { id }) });
};
const modelUser = (0, mongoose_1.model)('User', schema);
exports.default = modelUser;
//# sourceMappingURL=user.js.map