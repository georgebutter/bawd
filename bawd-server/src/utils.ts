import * as Elastic from "@elastic/elasticsearch";
import * as crypto from "crypto";
import * as mappings from "./mappings";

/**
 * Gets a post from the end point querying by the posts handle
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

/**
 * Wrapper for catching any promise rejections
 * @function ing
 * @param {Promise<any>} promise The promise to catch any error of
 * @version 0.0.1
 */
export const ing = (promise: Promise<any>) => promise
.then((data: any) => [null, data])
.catch((err: any) => [err]);

/**
 * Checks if an index exists and if it does it creates one
 * @async
 * @function checkAndCreateIndex
 * @param {string} index The name of the index to check and create
 * @version 0.0.1
 */
export const checkAndCreateIndex = async (index: string, client: Elastic.Client) => {
  const [boardsErr] = await ing(client.indices.get({
    index
  }));
  if (boardsErr) {
    const [error] = await ing(client.indices.create({
      body: {
        mappings: {
          properties: mappings[index]
        }
      },
      index
    }));
    if (error) {
      console.error("Could not create boards index");
      console.log(error.body.error);
    }
  }
};
