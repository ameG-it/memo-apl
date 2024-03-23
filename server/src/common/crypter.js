import "dotenv/config";
import crypto from "crypto";
import { Buffer } from "node:buffer";

// AES アルゴリズム
const CRYPT_ALGO = process.env.CRYPT_ALGO;

// 事前に共有すべきパスワード
const CRYPT_PASSWORD = process.env.CRYPT_PASSWORD;
// console.log(crypto.randomBytes(32).toString('base64'))

// 事前に共有すべき SALT
const CRYPT_SALT = process.env.CRYPT_SALT;
// console.log(crypto.randomBytes(16).toString('base64'))

export const encrypt = (data) => {
  // 鍵を生成
  const key = crypto.scryptSync(CRYPT_PASSWORD, CRYPT_SALT, 32);

  // IV を生成
  const bufIv = crypto.randomBytes(16);

  // 暗号器を生成
  const cipher = crypto.createCipheriv(CRYPT_ALGO, key, bufIv);

  // data を暗号化
  let bufEncryptedData = cipher.update(data);
  bufEncryptedData = Buffer.concat([bufEncryptedData, cipher.final()]);

  let iv = bufIv.toString("base64");
  let encryptedData = bufEncryptedData.toString("base64");
  return { iv, encryptedData };
};

// 復号メソッド
export const decrypt = (iv, encryptedData) => {
  // 鍵を生成
  const key = crypto.scryptSync(CRYPT_PASSWORD, CRYPT_SALT, 32);
  // 復号器を生成
  const decipher = crypto.createDecipheriv(
    CRYPT_ALGO,
    key,
    Buffer.from(iv, "base64")
  );
  // encryptedData を復号
  let decryptedData = decipher.update(Buffer.from(encryptedData, "base64"));
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);
  decryptedData = decryptedData.toString();
  return decryptedData;
};
