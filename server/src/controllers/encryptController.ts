import { Request, Response } from 'express';
import EncryptionLog from '../models/EncryptionLog';
import { CaesarCipher } from '../algorithms/caesarCipher';

const encrypt = async (req: Request, res: Response) => {
  try {
    const { text, keyword, rounds, cipherType } = req.body;

    if (!text || !keyword) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const start = Date.now();

    let ciphertext = '';
    let keys: number[] = [];

    if (cipherType === 'classical') {
      ciphertext = CaesarCipher.classicalEncrypt(text);
      keys = [3];
    } else {
      const result = CaesarCipher.enhancedEncrypt(text, keyword, Number(rounds || 1));
      ciphertext = result.ciphertext;
      keys = result.keys;
    }

    const end = Date.now();
    const executionTime = Number(((end - start) / 1000).toFixed(4));

    const dynamicKeys = CaesarCipher.formatKeys(keys, keyword || '');
    const keySpace = CaesarCipher.calculateKeySpace(keyword || '', Number(rounds || 1));

    // Persist encryption log
    try {
      await EncryptionLog.create({
        plaintext: text,
        ciphertext,
        keyword,
        rounds: Number(rounds || 1),
        cipherType: cipherType || 'enhanced',
        keySpace,
        dynamicKeys,
        executionTime,
      });
    } catch (err) {
      // non-fatal: log and continue
      console.warn('Failed to save encryption log', err);
    }

    return res.json({
      ciphertext,
      dynamicKeys,
      executionTime,
      summary: {
        cipherType: cipherType === 'enhanced' ? 'Enhanced Caesar' : 'Classical Caesar',
        rounds: Number(rounds || 1),
        keywordLength: (keyword || '').length,
        keySpace,
        textLength: (text || '').length,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Encryption failed' });
  }
};

export default { encrypt };
