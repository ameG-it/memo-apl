import "dotenv/config"; // eslint-disable-line import/no-extraneous-dependencies
import * as crypto from "crypto";
import { Buffer } from "node:buffer";

// AES アルゴリズム 事前に共有すべきパスワード 事前に共有すべきSALT
const { CRYPT_ALGO, CRYPT_PASSWORD, CRYPT_SALT } = process.env;

// 事前に共有すべきパスワードの生成
// console.log(crypto.randomBytes(32).toString('base64'))

// 事前に共有すべきSALTの生成
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

  const iv = bufIv.toString("base64");
  const encryptedData = bufEncryptedData.toString("base64");
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
