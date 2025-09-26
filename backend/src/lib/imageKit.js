import ImageKit from "imagekit";
import { ENV } from "./env.js";

export const imagekit = new ImageKit({
  publicKey: ENV.IMAGE_KIT_PUBLIC_API_KEY,
  privateKey: ENV.IMAGE_KIT_PRIVATE_API_KEY,
  urlEndpoint: ENV.IMAGE_KIT_URL_ENDPOINT,
});
