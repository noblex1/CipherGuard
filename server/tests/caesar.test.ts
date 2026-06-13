import { CaesarCipher } from '../src/algorithms/caesarCipher';

describe('CaesarCipher', () => {
  test('classical encrypt/decrypt', () => {
    const pt = 'HELLO';
    const ct = CaesarCipher.classicalEncrypt(pt);
    expect(ct).toBe('KHOOR');
    const dec = CaesarCipher.classicalDecrypt(ct);
    expect(dec).toBe(pt);
  });

  test('enhanced encrypt/decrypt round-trip', () => {
    const pt = 'HELLO WORLD';
    const keyword = 'SECRET';
    const rounds = 3;
    const { ciphertext } = CaesarCipher.enhancedEncrypt(pt, keyword, rounds);
    const { plaintext } = CaesarCipher.enhancedDecrypt(ciphertext, keyword, rounds);
    expect(plaintext).toBe(pt);
  });
});
