import crypto from 'node:crypto';
import envConfig from '../../config/env.config.js';
export const decrypt = (cipher) => {
  const [iv, encryptedText] = cipher.split(':');
  const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY||envConfig.ENCRYPTION_KEY,"hex");

  const bufferedIv = Buffer.from(iv, 'hex');


  const decipherObject = crypto.createDecipheriv(
    'aes-256-cbc',
    ENCRYPTION_KEY,
    bufferedIv
  );


  let decipherText = decipherObject.update(encryptedText, 
   /**encod the input*/ 'hex', 
   /**encod the output*/'utf-8');

  decipherText += decipherObject.final('utf-8');

  return decipherText;
};







/*

import CryptoJS from "crypto-js";
import { ENCRYPTION_KEY } from "../../common/config/config.js";

export default function encryption(text) {
  return  CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}
  
*/