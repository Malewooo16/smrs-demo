
import crypto from "crypto"
// Encryption function
export function encryptData(data:any, key:any) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.alloc(16,0));
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}

// Decryption function
export function decryptData(encryptedData:any, key:any) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.alloc(16,0));
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;
}


