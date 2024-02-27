import CryptoJS from 'crypto-js';

const secretKey = 'hiuhaiuehiaue';

export function encryptToken(plainValue: string|null): string {
  if (!secretKey || !plainValue)
    throw Error("Chave secreta ou token inválido.");

  const encryptedValue = CryptoJS.AES.encrypt(plainValue, secretKey).toString();
  return encryptedValue;
}

export function decryptToken(encryptedValue: string|null): string {
  if (!secretKey || !encryptedValue)
    throw Error("Chave secreta ou token inválido.");

  const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedValue;
}
