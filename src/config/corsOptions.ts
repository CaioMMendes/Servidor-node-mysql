import { allowedOrigins } from "./allowedOrigins";

export const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Não permitido"));
    }
  },
  optionsSucessStatus: 200,
};
