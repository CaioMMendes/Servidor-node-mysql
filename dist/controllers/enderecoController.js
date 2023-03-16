"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrar = void 0;
const cadastro_1 = require("../models/cadastro");
const cadastrar = async function (req, res) {
    //  let results:any=await   sequelizeInstance.query(`delete from produtos where nome='cadeira'`)
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const sexo = req.body.sexo;
    const localidade = req.body.localidade;
    const cep = req.body.cep;
    const logradouro = req.body.logradouro;
    const uf = req.body.uf;
    const complemento = req.body.complemento;
    const numero = req.body.numero;
    const bairro = req.body.bairro;
    const pais = req.body.pais;
    const validate = await cadastro_1.CadastroUsuario.findOne({
        where: {
            email: email,
        },
    });
    console.log(validate);
    if (validate) {
        res.status(418).json(validate);
        return;
    }
    const results = await cadastro_1.CadastroUsuario.create({
        nome,
        telefone,
        email,
        sexo,
        localidade,
        cep,
        logradouro,
        uf,
        complemento,
        bairro,
        numero,
        pais,
    });
    res.status(200).json(results);
};
exports.cadastrar = cadastrar;
//# sourceMappingURL=enderecoController.js.map