/**
 * Module deals with the generation of highly random 256 byte-array
 * the function arguments should be customized according to the data model used
 * the function's return value is a token, key pair
 */

const njwt = require("njwt");
const secureRandom = require("secure-random");

const generateSecureJWT = (username, scope) =>
  new Promise(async (resolve, reject) => {
    const claims = {
      sub: username, // UID of the user in the system
      scope,
    };
    try {
      const signingKey = await secureRandom(256, {
        type: "Buffer",
      });
      const jwt = njwt.create(claims, signingKey, "HS256");
      resolve(jwt);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

module.exports = generateSecureJWT;
