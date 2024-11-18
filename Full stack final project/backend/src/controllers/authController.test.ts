import request from "supertest";
import mongoose from "mongoose";
import { app, server } from "../app";
import e from "express";


beforeAll(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

afterEach(async () => {
  // await mongoose.connection.dropDatabase();
});

describe("User API /register", () => { 
  test("POST /register, creating new user in database, should pass", async () => {

    const user = {
      name: "Ariel",
      organization: "IDF - North",
      password: "123456",
      area: "North"
    }

    const res = await register(user);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      message: "User created successfully",
      success: true,
      data: {
          name: user.name
          },
    })
  });

  test("POST /register, creating new user in database, should fail because missing required fields", async () => {

    const user = {
      organization: "IDF - North",
      password: "123456",
    }

    
    const res = await register(user);
    
    expect(res.status).toBe(400); 
    expect(res.body.message).toBe("Missing required fields");
    expect(res.body.success).toBe(false);
  });
  test("POST /register, creating new user in database, should fail because user already exists", async () => {

    const user = {
      name: "b",
      organization: "IDF - North",
      password: "123456",
      area: "North"
    }
 
    await register(user);

    const res = await register(user);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User name already exists");
    expect(res.body.data.name).toBe(user.name);
    
  }); 


  test("POST /register, creating new user in database, should fail because organization does not exist", async () => {

    const user = {
      name: "a",
      organization: "aaaa",
      password: "123456",
      area: "North"
    }

    const res = await register(user);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Organization not found");
    expect(res.body.success).toBe(false);
  });

  
})

describe("User API/ login", () => {
  test ("POST /login, should fail because missing required fields", async () => {

    const user = {}

    const res = await login(user);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing required fields");
    expect(res.body.success).toBe(false);
  })

  test ("POST /login, should fail because user does not exist", async () => {  

    const user = {
      name: "a",
      password: "123456"
    } 

    const res = await request(app)    
      .post("/auth/login")
      .send(user);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid name");
    expect(res.body.success).toBe(false);
  }) 

  test ("POST /login, should fail because password is incorrect", async () => {

    const user = {
      name: "Ariel",
      organization: "IDF - North",
      password: "123456",
      area: "North"
    }

    await register(user);

    const res = await login({name:user.name, password: `${user.password}1`});

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid name or password"); 
    expect(res.body.success).toBe(false);
  }) 

  test ("POST /login, should pass", async () => {

    const user = {
      name: "Ariel",
      organization: "IDF - North",
      password: "123456",
      area: "North"
    }

    await register(user);

    const res = await login({name:user.name, password: user.password});

    expect(res.status).toBe(200);  
  }) 
})

describe("User API/ logout", () => {
  test ("POST /logout, should pass", async () => {
    const res = await request(app)
      .post("/auth/logout")
      .send();

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Logout successful"); 

  }) 
})








const register = async (user: any) => {
  const res = await request(app)
    .post("/auth/register")
    .send(user);
  return res;
} 

const login = async (user: any) => {
  const res = await request(app)
    .post("/auth/login")
    .send(user);
  return res;
}