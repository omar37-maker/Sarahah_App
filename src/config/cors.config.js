import envConfig from "./env.config.js";
const whiteListOrigins = envConfig.cors.whiteListOrigins;
export const corsOptions = {
  origin: (origin, callback) => {
    if (whiteListOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
};
