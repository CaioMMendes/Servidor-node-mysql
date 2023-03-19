"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const googleapis_1 = require("googleapis");
const fs = require("fs");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const uploadFile = async (req) => {
    const config = {
        type: process.env.type,
        project_id: process.env.project_id,
        private_key_id: process.env.private_key_id,
        private_key: process.env.private_key,
        client_email: process.env.client_email,
        client_id: process.env.client_id,
        auth_uri: process.env.auth_uri,
        token_uri: process.env.token_uri,
        auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.client_x509_cert_url,
    };
    const configString = JSON.stringify(config);
    try {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: configString,
            scopes: ["https://www.googleapis.com/auth/drive"],
        });
        const driveService = googleapis_1.google.drive({
            version: "v3",
            auth,
        });
        const fileMetaData = {
            name: req.filename,
            parents: [process.env.GOOGLE_FOLDER_ID],
        };
        const media = {
            mimeType: "image/*",
            body: fs.createReadStream(`./${req.path}`),
        };
        const params = {
            requestBody: fileMetaData,
            media: media,
            fields: "id",
        };
        const response = await driveService.files.create(params);
        return response.data.id;
    }
    catch (err) {
        console.log("Erro criando o arquivo", err);
    }
};
exports.uploadFile = uploadFile;
//https://drive.google.com/uc?export=view&id=
//link com id na frente para visualizar a imagem
//# sourceMappingURL=driveUpload.js.map