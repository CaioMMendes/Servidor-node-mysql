import { Response } from "express";
import supertest from "supertest";
import app from "../appServer";

import { loginUser } from "../models/login";

describe("Testing login", () => {
  let email = "caio03rodrigues@gmail.com";
  let password = "d";
  let name = "caio";
  let id = "fail";
  let accessToken = "fail";
  let googleId = "fail";
  let picture = "fail";
  let avatarId = "fail";
  let isChecked = true;
  let linkAccount: any = null;
  beforeAll(async () => {
    await loginUser.sync({ force: true });
  });
  it("registrar", async () => {
    await supertest(app)
      .post("/register")
      .send({ email: email, password, name })
      .then((response: any) => {
        console.log(response.body);
        expect(response.body).toBeDefined();
        id = response.body;
      });
  });
  it("logar", async () => {
    console.log("teste login");

    await supertest(app)
      .post("/login")

      .send({
        email: email,
        password,
        isChecked,
        linkAccount,
        googleId,
        picture,
      })
      .then((response: any) => {
        console.log("response", response.body);
        expect(response.body).toHaveProperty("email", email);
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("name", name);
        expect(response.body).toHaveProperty("googleId");
        expect(response.body).toHaveProperty("avatarId");
        expect(response.body).toHaveProperty("picture");
        accessToken = response.body.token;
        googleId = response.body.googleId;
        avatarId = response.body.avatarId;
        picture = response.body.picture;
      });
  });
  it("pegar informações do usuário", async () => {
    console.log("token", accessToken);
    await supertest(app)
      .post("/userinfo")
      .send({ accessToken })
      .set("Authorization", `Bearer ${accessToken}`)
      .then((response: any) => {
        console.log("response", response.body);
        expect(response.body).toHaveProperty("email", email);
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("name", name);
        googleId === null
          ? expect(response.body).toHaveProperty("googleId", null)
          : expect(response.body).toHaveProperty("googleId", googleId);

        expect(response.body).toHaveProperty("avatarId", avatarId || null);
        expect(response.body).toHaveProperty("picture", picture || null);
      });
  });
});
