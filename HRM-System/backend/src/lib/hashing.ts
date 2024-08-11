import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';
import { Logger } from '@nestjs/common';

class CryptoService {
  private readonly logger = new Logger(CryptoService.name);
  private key: Buffer;

  constructor() {
    const password = process.env.HASH_PASSWORD;
    this.key = scryptSync(password, 'salt', 32);
  }

  async encryptMessage(message: string): Promise<string> {
    try {
      const iv = randomBytes(16);
      const cipher = createCipheriv('aes-256-ctr', this.key, iv);
      const encryptedMessage = Buffer.concat([
        cipher.update(message),
        cipher.final(),
      ]);
      return `${iv.toString('hex')}:${encryptedMessage.toString('hex')}`;
    } catch (error) {
      this.logger.error('Error encrypting message:', error);
      throw error;
    }
  }

  async decryptMessage(encryptedText: string): Promise<string> {
    try {
      const [ivHex, encryptedMessageHex] = encryptedText.split(':');
      const iv = Buffer.from(ivHex, 'hex');
      const encryptedMessage = Buffer.from(encryptedMessageHex, 'hex');
      const decipher = createDecipheriv('aes-256-ctr', this.key, iv);
      const decryptedData = Buffer.concat([
        decipher.update(encryptedMessage),
        decipher.final(),
      ]);
      return decryptedData.toString();
    } catch (error) {
      this.logger.error('Error decrypting message:', error);
      throw error;
    }
  }
}

export default CryptoService;
