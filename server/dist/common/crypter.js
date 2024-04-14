"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
require("dotenv/config");
var crypto = require("crypto");
var node_buffer_1 = require("node:buffer");
// AES アルゴリズム
var CRYPT_ALGO = process.env.CRYPT_ALGO;
// 事前に共有すべきパスワード
var CRYPT_PASSWORD = process.env.CRYPT_PASSWORD;
// console.log(crypto.randomBytes(32).toString('base64'))
// 事前に共有すべき SALT
var CRYPT_SALT = process.env.CRYPT_SALT;
// console.log(crypto.randomBytes(16).toString('base64'))
var encrypt = function (data) {
    // 鍵を生成
    var key = crypto.scryptSync(CRYPT_PASSWORD, CRYPT_SALT, 32);
    // IV を生成
    var bufIv = crypto.randomBytes(16);
    // 暗号器を生成
    var cipher = crypto.createCipheriv(CRYPT_ALGO, key, bufIv);
    // data を暗号化
    var bufEncryptedData = cipher.update(data);
    bufEncryptedData = node_buffer_1.Buffer.concat([bufEncryptedData, cipher.final()]);
    var iv = bufIv.toString("base64");
    var encryptedData = bufEncryptedData.toString("base64");
    return { iv: iv, encryptedData: encryptedData };
};
exports.encrypt = encrypt;
// 復号メソッド
var decrypt = function (iv, encryptedData) {
    // 鍵を生成
    var key = crypto.scryptSync(CRYPT_PASSWORD, CRYPT_SALT, 32);
    // 復号器を生成
    var decipher = crypto.createDecipheriv(CRYPT_ALGO, key, node_buffer_1.Buffer.from(iv, "base64"));
    // encryptedData を復号
    var bufDecryptedData = decipher.update(node_buffer_1.Buffer.from(encryptedData, "base64"));
    bufDecryptedData = node_buffer_1.Buffer.concat([bufDecryptedData, decipher.final()]);
    var decryptedData = bufDecryptedData.toString();
    return decryptedData;
};
exports.decrypt = decrypt;
