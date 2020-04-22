import * as crypto from "crypto";

/**
 * Gets a post from the end point querying by the posts handle
 * @async
 * @function createTripcode
 * @param {string} secret The hmac secret. Passed from enviornment variable.
 * @param {password} secret The password that you want to convert into a tripcode.
 * @version 0.0.1
 * @returns {string} Returns the tripcode which will be a hexidecimal string.
 */
export const createTripcode = (secret: string, password: string) => {
  const hmacSecret = crypto.createHmac("sha256", secret);
  hmacSecret.update(password);
  const superSecret = hmacSecret.digest("hex");
  const hmac = crypto.createHmac("sha256", superSecret);
  hmac.update(password);
  return hmac.digest("hex");
};
