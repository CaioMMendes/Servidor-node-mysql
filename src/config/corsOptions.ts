import { allowedOrigins } from "./allowedOrigins";

export const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
    "http://localhost:5178",
  ],

  optionsSucessStatus: 200,
  credentials: true,
};
