import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

export async function signJwt(
  payload: Record<string, string>,
  jwtSecret: string,
  expiry: string,
  cryptoSecret: string
) {
  return new Promise<string | Error>((resolve, reject) => {
    if (!payload || !jwtSecret || !expiry || !cryptoSecret) {
      return reject("invalid number of arguments");
    }

    let encryptedPayload = undefined;
    try {
      encryptedPayload = CryptoJS.AES.encrypt(
        JSON.stringify(payload),
        cryptoSecret
      ).toString();
    } catch (err) {
      return reject(err);
    }

    jwt.sign(
      { encPayld: encryptedPayload },
      jwtSecret,
      {
        expiresIn: expiry,
      },
      function (err, token) {
        if (err || !token) {
          return reject(err?.message);
        }
        resolve(token);
      }
    );
  });
}

export function verifyJwt(
  token: string,
  jwtSecret: string,
  cryptoSecret: string
) {
  return new Promise<Record<string, string> | Error>((resolve, reject) => {
    if (!token || !jwtSecret || !cryptoSecret) {
      return reject("invalid number of arguments");
    }

    let decryptedJwtPayload: any = undefined; // jwt decrypt
    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err || !decoded) {
        return reject(err?.message);
      }
      decryptedJwtPayload = decoded;
    });

    if (!decryptedJwtPayload?.encPayld) {
      return reject("decrypted resource invalid");
    }

    try {
      const decryptedCryptoPayload = JSON.parse(
        CryptoJS.AES.decrypt(
          decryptedJwtPayload?.encPayld,
          cryptoSecret
        ).toString(CryptoJS.enc.Utf8)
      );

      resolve(decryptedCryptoPayload);
      //
    } catch (error) {
      reject("error while decrypting payload");
    }
  });
}
