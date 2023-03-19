"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const produtos_1 = require("./models/produtos");
const express_1 = __importDefault(require("express"));
const Conexao_1 = require("./database/Conexao");
const fornecedor_produto_1 = require("./models/fornecedor_produto");
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = require("multer");
const corsOptions_1 = require("./config/corsOptions");
const credentials_1 = require("./middleware/credentials");
const apiLogin_1 = __importDefault(require("./routes/apiLogin"));
const endereco_1 = __importDefault(require("./routes/endereco"));
const apiProdutos_1 = __importDefault(require("./routes/apiProdutos"));
const fornecedor_1 = __importDefault(require("./routes/fornecedor"));
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = express_1.default.Router();
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(credentials_1.credentials);
app.use(cookieParser());
(0, Conexao_1.createDBConnection)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false,
}));
fornecedor_produto_1.Fornecedor_produto.length; //É só pra inicializar esse arquivo, se quiser fazer sem isso copiar o final belongtomany para o arquivo de Produtos
app.use(cors(corsOptions_1.corsOptions));
app.use("/", router);
app.use(apiLogin_1.default);
app.use(apiProdutos_1.default);
app.use(endereco_1.default);
app.use(fornecedor_1.default);
const errorHandler = (err, req, res, next) => {
    res.status(400);
    if (err instanceof multer_1.MulterError) {
        res.json({ error: err.code });
    }
    else {
        console.log(err);
        res.json({ error: "Ocorreu algum erro" });
    }
};
app.use(errorHandler);
router.post("/mata-cadeira", async function (req, res) {
    //  let results:any=await   sequelizeInstance.query(`delete from produtos where nome='cadeira'`)
    let results = await produtos_1.Produtos.destroy({
        where: {
            nome: "cadeira",
        },
    });
    res.status(200).json(results);
});
const port = 3003;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
//request dados de cookie, ip essas coisas
//response é a resposta do servidor
//# sourceMappingURL=Server.js.map