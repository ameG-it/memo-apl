"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordIv: {
        type: String,
        required: true,
    },
});
exports.userSchema = userSchema;
var User = mongoose_1.default.model("User", userSchema);
exports.User = User;
