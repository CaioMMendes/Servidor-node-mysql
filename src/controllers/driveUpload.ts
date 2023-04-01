import { google } from "googleapis";
import { drive_v3 } from "googleapis/build/src/apis/drive";
const fs = require("fs");
import * as dotenv from "dotenv";
dotenv.config();

// interface googleCredentials {
//   type: any;
//   project_id: any;
//   private_key_id: any;
//   private_key: any;
//   client_email: any;
//   auth_uri: any;
//   client_id: any;
//   token_uri: any;
//   auth_provider_x509_cert_url: any;
//   client_x509_cert_url: any;
// }
// const credentials: googleCredentials = {
//   type: process.env.TYPE,
//   project_id: process.env.PROJECT_ID,
//   private_key_id: process.env.PRIVATE_KEY_ID,
//   private_key: process.env.PRIVATE_KEY,
//   client_email: process.env.CLIENT_EMAIL,
//   client_id: process.env.CLIENT_ID,
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url:
//     "https://www.googleapis.com/robot/v1/metadata/x509/google-drive%40learning-cloud-381017.iam.gserviceaccount.com",
// };

const auth = new google.auth.GoogleAuth({
  //   keyFile: `${keyFile}`,
  //   credentials: credentials,
  keyFile: "./googleDrive.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const driveService = google.drive({
  version: "v3",
  auth,
});
export const createFile = async (req: any) => {
  // const keyFile = JSON.stringify(credentials);

  try {
    const fileMetaData: any = {
      name: req.filename, //mudar o nome pro file name que tem no outro negocio
      parents: [process.env.GOOGLE_FOLDER_ID],
    };

    const media = {
      mimeType: "image/*",
      body: fs.createReadStream(`./${req.path}`),
    };
    const paramsCreate: any = {
      requestBody: fileMetaData,
      media: media,
      fields: "id",
    };

    const create = await driveService.files.create(paramsCreate);

    return create.data;
  } catch (err) {
    console.log("Erro criando o arquivo", err);
  }
};

//https://drive.google.com/uc?export=view&id=
//link com id na frente para visualizar a imagem

export const deleteFile = async (fileId: any) => {
  const deletefile = await driveService.files.delete({
    fileId: fileId,
  });
};

export const updateFile = async (fileId: any, fileContent: any) => {
  const update = await driveService.files.update({
    fileId: fileId,
    media: {
      mimeType: "image/*",

      body: fs.createReadStream(`./${fileContent}`),
    },
  });
};
