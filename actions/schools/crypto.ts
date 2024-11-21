import crypto from 'crypto';

// Generate a random IV
const generateRandomIV = () => crypto.randomBytes(16);

// Encryption function
export function encryptData(data: string, key: Buffer | string) {
    // Ensure the key is 32 bytes
    const keyBuffer = Buffer.isBuffer(key) ? key : Buffer.from(key, 'utf-8');
    
    // Generate a random IV for each encryption
    const iv = generateRandomIV();
    
    // Create the cipher instance
    const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
    
    // Encrypt the data
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    
    // Prepend IV to the encrypted data (so you can use it in decryption)
    return iv.toString('hex') + encryptedData;
}

// Decryption function
export function decryptData(encryptedData: string, key: Buffer | string) {
    // Ensure the key is 32 bytes
    const keyBuffer = Buffer.isBuffer(key) ? key : Buffer.from(key, 'utf-8');
    
    // Extract the IV from the encrypted data
    const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
    const encryptedText = encryptedData.slice(32);
    
    // Create the decipher instance
    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
    
    // Decrypt the data
    let decryptedData = decipher.update(encryptedText, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    
    return decryptedData;
}
