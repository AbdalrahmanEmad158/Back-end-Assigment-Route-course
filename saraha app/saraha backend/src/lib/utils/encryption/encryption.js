import envConfig from '../../config/env.config.js';
import crypto from 'node:crypto';




export const encrypt = (plainText) => {
  const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY||envConfig.ENCRYPTION_KEY,"hex");
const IV_LENGTH = Number(process.env.IV_LENGTH)||envConfig.IV_LENGTH;
م

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipherObject = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let cipherText = cipherObject.update(plainText,
    /**encod the input*/ 'utf-8',
    /**encod the output*/ 'hex');
  cipherText += cipherObject.final('hex');
return iv.toString('hex') + ':' + cipherText;
};
 












/*

import CryptoJS from "crypto-js";
import { ENCRYPTION_KEY } from "../../common/config/config.js";

export default function encryption(text) {
  return  CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}
  
*/