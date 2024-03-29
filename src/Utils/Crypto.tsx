import CryptoJS from 'crypto-js';

const keyValue = import.meta.env.VITE_CRYPTO_SECRET_KEY || '';
const secretKey = CryptoJS.enc.Utf8.parse(keyValue);
const iv = CryptoJS.enc.Utf8.parse(keyValue);

const criptoConfig = {
	keySize: 128 / 8,
	iv: iv,
	mode: CryptoJS.mode.CBC,
	padding: CryptoJS.pad.Pkcs7
};

export function encrypt(plainValue: any): string {	
	const jsonData = JSON.stringify(plainValue);
	if (!secretKey || !plainValue)
    throw Error("Chave secreta ou token inválido.");
	
	const encryptedValue = CryptoJS.AES.encrypt(jsonData, secretKey, criptoConfig).toString();
	const UrlSafingValue = encryptedValue.replace(/\+/g, '-').replace(/\//g, '_');
  return UrlSafingValue;
}

export function decrypt(encryptedValue: string|null): string {  
	if (!secretKey || !encryptedValue)
    throw Error("Chave secreta ou token inválido.");

	let UrlUnsafingValue = encryptedValue.replace(/-/g, '+').replace(/_/g, '/');
  const bytes = CryptoJS.AES.decrypt(UrlUnsafingValue, secretKey, criptoConfig);
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
	const decryptedObject = JSON.parse(decryptedValue);
  return decryptedObject;
}
