import CryptoJS from 'crypto-js';

// 加密密钥，建议放在环境变量中
const SECRET_KEY = import.meta.env.VITE_CRYPTO_KEY || 'your-secret-key';

export const crypto = {
  /**
   * AES加密
   * @param data - 需要加密的数据
   */
  encrypt(data: unknown): string {
    const dataStr = JSON.stringify(data);
    return CryptoJS.AES.encrypt(dataStr, SECRET_KEY).toString();
  },

  /**
   * AES解密
   * @param encryptedData - 加密后的数据
   */
  decrypt(encryptedData: string): unknown {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  },
};
