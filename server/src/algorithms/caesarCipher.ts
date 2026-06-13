/**
 * Enhanced Caesar Cipher Implementation
 * Supports both classical and enhanced encryption with multi-round capabilities
 */

export class CaesarCipher {
  /**
   * Generate dynamic keys from keyword
   * Each character in keyword generates a unique shift value
   */
  private static generateDynamicKeys(keyword: string, rounds: number): number[] {
    const keys: number[] = [];
    const upperKeyword = keyword.toUpperCase();

    for (let round = 0; round < rounds; round++) {
      const charIndex = round % upperKeyword.length;
      const char = upperKeyword[charIndex];
      
      // Convert letter to number (A=0, B=1, ..., Z=25)
      const baseShift = char.charCodeAt(0) - 65;
      
      // Add position offset for additional complexity
      const positionOffset = round * 3;
      const shift = (baseShift + positionOffset) % 26;
      
      keys.push(shift);
    }

    return keys;
  }

  /**
   * Shift a single character by a given amount
   */
  private static shiftChar(char: string, shift: number, decrypt = false): string {
    const code = char.charCodeAt(0);
    
    // Check if uppercase letter (A-Z)
    if (code >= 65 && code <= 90) {
      const base = 65;
      const offset = decrypt ? -shift : shift;
      return String.fromCharCode(((code - base + offset + 26) % 26) + base);
    }
    
    // Check if lowercase letter (a-z)
    if (code >= 97 && code <= 122) {
      const base = 97;
      const offset = decrypt ? -shift : shift;
      return String.fromCharCode(((code - base + offset + 26) % 26) + base);
    }
    
    // Return non-alphabetic characters unchanged
    return char;
  }

  /**
   * Perform single round of encryption/decryption
   */
  private static processRound(
    text: string,
    shift: number,
    decrypt = false
  ): string {
    return text
      .split('')
      .map((char) => this.shiftChar(char, shift, decrypt))
      .join('');
  }

  /**
   * Classical Caesar Cipher (fixed shift of 3)
   */
  public static classicalEncrypt(text: string): string {
    return this.processRound(text, 3, false);
  }

  public static classicalDecrypt(text: string): string {
    return this.processRound(text, 3, true);
  }

  /**
   * Enhanced Caesar Cipher with dynamic keys and multi-round encryption
   */
  public static enhancedEncrypt(
    text: string,
    keyword: string,
    rounds: number
  ): { ciphertext: string; keys: number[] } {
    const dynamicKeys = this.generateDynamicKeys(keyword, rounds);
    let result = text;

    // Apply each round of encryption
    for (let round = 0; round < rounds; round++) {
      result = this.processRound(result, dynamicKeys[round], false);
    }

    return {
      ciphertext: result,
      keys: dynamicKeys,
    };
  }

  /**
   * Enhanced Caesar Cipher decryption
   * Must reverse the encryption rounds in opposite order
   */
  public static enhancedDecrypt(
    text: string,
    keyword: string,
    rounds: number
  ): { plaintext: string; keys: number[] } {
    const dynamicKeys = this.generateDynamicKeys(keyword, rounds);
    let result = text;

    // Apply decryption rounds in reverse order
    for (let round = rounds - 1; round >= 0; round--) {
      result = this.processRound(result, dynamicKeys[round], true);
    }

    return {
      plaintext: result,
      keys: dynamicKeys,
    };
  }

  /**
   * Calculate key space size
   */
  public static calculateKeySpace(keyword: string, rounds: number): string {
    if (rounds === 1) {
      // Classical: only 26 possible shifts
      return '26';
    }

    // Enhanced: 26^(keyword.length * rounds)
    const exponent = Math.min(keyword.length, 6); // Cap for display purposes
    const keySpace = Math.pow(26, exponent);
    return `26^${exponent} ≈ ${keySpace.toLocaleString()}`;
  }

  /**
   * Format dynamic keys for display
   */
  public static formatKeys(keys: number[], keyword: string): string[] {
    const upperKeyword = keyword.toUpperCase();
    return keys.map((key, index) => {
      const char = upperKeyword[index % upperKeyword.length];
      return `${char}${index + 1}`;
    });
  }
}
