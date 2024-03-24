import "dotenv/config";
import crypto = require("crypto");
import { Buffer } from "node:buffer";

// AES アルゴリズム
const CRYPT_ALGO: string = process.env.CRYPT_ALGO;

// 事前に共有すべきパスワード
const CRYPT_PASSWORD: string = process.env.CRYPT_PASSWORD;
// console.log(crypto.randomBytes(32).toString('base64'))

// 事前に共有すべき SALT
const CRYPT_SALT: string = process.env.CRYPT_SALT;
// console.log(crypto.randomBytes(16).toString('base64'))

export const encrypt = (data: string) => {
  // 鍵を生成
  const key: Buffer = crypto.scryptSync(CRYPT_PASSWORD, CRYPT_SALT, 32);

  // IV を生成
  const bufIv: Buffer = crypto.randomBytes(16);

  // 暗号器を生成
  const cipher: crypto.Cipher = crypto.createCipheriv(CRYPT_ALGO, key, bufIv);

  // data を暗号化
  let bufEncryptedData: Buffer = cipher.update(data);
  bufEncryptedData = Buffer.concat([bufEncryptedData, cipher.final()]);

  let iv: string = bufIv.toString("base64");
  let encryptedData: string = bufEncryptedData.toString("base64");
  return { iv, encryptedData };
};

// 復号メソッド
export const decrypt = (iv: string, encryptedData: string) => {
  // 鍵を生成
  const key: Buffer = crypto.scryptSync(CRYPT_PASSWORD, CRYPT_SALT, 32);
  // 復号器を生成
  const decipher: crypto.Decipher = crypto.createDecipheriv(
    CRYPT_ALGO,
    key,
    Buffer.from(iv, "base64")
  );
  // encryptedData を復号
  let bufDecryptedData: Buffer = decipher.update(
    Buffer.from(encryptedData, "base64")
  );
  bufDecryptedData = Buffer.concat([bufDecryptedData, decipher.final()]);
  const decryptedData: string = bufDecryptedData.toString();
  return decryptedData;
};
