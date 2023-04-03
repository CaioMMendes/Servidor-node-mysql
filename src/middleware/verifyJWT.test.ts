import { Response } from "express";
import supertest from "supertest";
import app from "../appServer";
import { verifyJWT } from "./verifyJWT";

import { loginUser } from "../models/login";

describe("Testing login", () => {
  let email = "caio03rodrigues@gmail.com";
  let password = "d";
  let name = "caio";
  let id = "";
  let token = "";
  beforeAll(async () => {
    await loginUser.sync({ force: true });
  });

  it("logar", async () => {
    console.log("teste login");
    await supertest(app)
      .post("/login")
      .send({ email: email, password })
      .then((response: any) => {
        console.log("response", response.body);
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("name");
        token = response.body.token;
      });
  });
  it("pegar informações do usuário", async () => {
    console.log("token", token);
    await supertest(app)
      .post("/userinfo")
      .send({ token })
      .then((response: any) => {
        console.log("response", response.body);
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("name");
      });
  });
});
