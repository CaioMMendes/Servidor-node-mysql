import { allowedOrigins } from "./allowedOrigins";

export const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
    "http://localhost:5178",
    "https://aprendendo-react-delta.vercel.app/",
    "https://aprendendo-react-git-main-caiommendes.vercel.app/",
    "https://aprendendo-react-aksj10ll2-caiommendes.vercel.app/",
    "https://aprendendo-react-delta.vercel.app",
    "https://aprendendo-react-git-main-caiommendes.vercel.app",
    "https://aprendendo-react-aksj10ll2-caiommendes.vercel.app",
  ],

  optionsSucessStatus: 200,
  credentials: true,
};
