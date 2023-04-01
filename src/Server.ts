import app from "./appServer";
import dotenv from "dotenv";
dotenv.config();
app.listen(process.env.port, () => {
  console.log(`Servidor rodando na porta ${process.env.port}`);
});
