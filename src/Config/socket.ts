import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL: any =
  process.env.NODE_ENV === "production"
    ? "https://dev1-trusttgpt-ccep.trustt.com"
    : "https://dev1-trusttgpt-ccep.trustt.com";

export const socket = io(URL);
