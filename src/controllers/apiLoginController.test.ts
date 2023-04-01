import { Response } from "express";
import supertest from "supertest";
import app from "../appServer";

import { loginUser } from "../models/login";

describe("Testing login", () => {
  let email = "caio03rodrigues@gmail.com";
  let password = "d";
  let name = "caio";

  beforeAll(async () => {
    await loginUser.sync({ force: true });
  });
  it("registrar", async () => {
    await supertest(app)
      .post("/register")
      .send({ email: email, password, name })
      .then((response: any) => {
        console.log(response.body);
        expect(response.body).toHaveProperty("id");
      });
  });
  it("logar", async () => {
    console.log("teste login");
    await supertest(app)
      .post("/login")
      .send({ email: email, password })
      .then((response: any) => {
        console.log("response", response.body);
        expect(response.body).toHaveProperty("email");
      });
  });
});
