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
exports.updateFile = exports.deleteFile = exports.createFile = void 0;
const googleapis_1 = require("googleapis");
const fs = require("fs");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const credentials = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/google-drive%40learning-cloud-381017.iam.gserviceaccount.com",
};
const auth = new googleapis_1.google.auth.GoogleAuth({
    //   keyFile: `${keyFile}`,
    //   credentials: credentials,
    keyFile: "./googleDrive.json",
    scopes: ["https://www.googleapis.com/auth/drive"],
});
const driveService = googleapis_1.google.drive({
    version: "v3",
    auth,
});
const createFile = async (req) => {
    const keyFile = JSON.stringify(credentials);
    try {
        const fileMetaData = {
            name: req.filename,
            parents: [process.env.GOOGLE_FOLDER_ID],
        };
        const media = {
            mimeType: "image/*",
            body: fs.createReadStream(`./${req.path}`),
        };
        const paramsCreate = {
            requestBody: fileMetaData,
            media: media,
            fields: "id",
        };
        const create = await driveService.files.create(paramsCreate);
        return create.data;
    }
    catch (err) {
        console.log("Erro criando o arquivo", err);
    }
};
exports.createFile = createFile;
//https://drive.google.com/uc?export=view&id=
//link com id na frente para visualizar a imagem
const deleteFile = async (fileId) => {
    const deletefile = await driveService.files.delete({
        fileId: fileId,
    });
};
exports.deleteFile = deleteFile;
const updateFile = async (fileId, fileContent) => {
    const update = await driveService.files.update({
        fileId: fileId,
        media: {
            mimeType: "image/*",
            body: fs.createReadStream(`./${fileContent}`),
        },
    });
};
exports.updateFile = updateFile;
//# sourceMappingURL=driveUpload.js.map