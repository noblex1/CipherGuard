import { Request, Response } from 'express';
import DecryptionLog from '../models/DecryptionLog';
import { CaesarCipher } from '../algorithms/caesarCipher';

const decrypt = async (req: Request, res: Response) => {
  try {
    const { text, keyword, rounds, cipherType } = req.body;

    if (!text || !keyword) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const start = Date.now();

    let plaintext = '';

    if (cipherType === 'classical') {
      plaintext = CaesarCipher.classicalDecrypt(text);
    } else {
      const result = CaesarCipher.enhancedDecrypt(text, keyword, Number(rounds || 1));
      plaintext = result.plaintext;
    }

    const end = Date.now();
    const executionTime = Number(((end - start) / 1000).toFixed(4));

    // Persist decryption log
    try {
      await DecryptionLog.create({
        ciphertext: text,
        plaintext,
        keyword,
        rounds: Number(rounds || 1),
        cipherType: cipherType || 'enhanced',
        success: true,
        executionTime,
      });
    } catch (err) {
      console.warn('Failed to save decryption log', err);
    }

    return res.json({
      plaintext,
      executionTime,
      success: true,
      summary: {
        cipherType: cipherType === 'enhanced' ? 'Enhanced Caesar' : 'Classical Caesar',
        rounds: Number(rounds || 1),
        keyword: keyword || '',
        processingTime: `${executionTime}s`,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Decryption failed' });
  }
};

export default { decrypt };
