import crypto from "node:crypto"
import envConfig from "../../config/env.config.js"

const encryptionEnv = envConfig.encryption

const encryptionKey = Buffer.from(encryptionEnv.ENCRYPTION_KEY, 'hex')



export const encrypt = (plainText) => {

    const iv = crypto.randomBytes(parseInt(encryptionEnv.IV_LENGTH))

    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);

    let encrypted = cipher.update(plainText, 'utf-8', 'hex');

    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;

}


// 5f9e972a1e4d90fbd4ae6e10b857ab37:42a314584d163ed8232d912cfc5fb8c4



export const decrypt = (inputCipher) => {
    const [iv, encryptedData] = inputCipher.split(":");
    const bufferIV = Buffer.from(iv, 'hex');
    const decripher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, bufferIV);
    let decrypted = decripher.update(encryptedData, "hex", "utf-8");
    decrypted += decripher.final('utf-8');
    return decrypted
}



