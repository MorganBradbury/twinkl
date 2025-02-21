import request from "supertest";
import { PrismaClient } from "@prisma/client";
import app from "../../src";
import { mocks } from "../mocks/users";
import { getMaxDate } from "../utils/dateUtils";

const { genericUserMock, emptyUserMock, passwordAboveMaxMock } = mocks;

// Initialize Prisma Client
const prisma = new PrismaClient();

// Utility function to clear the database before and after tests
const clearDatabase = async () => {
  await prisma.user.deleteMany(); // Clear all users in the database
};

describe("User Controller", () => {
  // Cleanup database after each test
  beforeEach(async () => {
    await clearDatabase();
  });

  describe("POST /signup", () => {
    it("should create a new user successfully", async () => {
      const response = await request(app).post("/signup").send(genericUserMock);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created successfully");
      expect(response.body).toHaveProperty("userId");
    });

    it("should return status 409 if the user already exists", async () => {
      await request(app).post("/signup").send(genericUserMock);

      const response = await request(app)
        .post("/signup") // Trying to create the same user again
        .send(genericUserMock);

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("User already exists");
    });

    it("should return status 400 if the request body does not pass validation rules", async () => {
      const response = await request(app).post("/signup").send(emptyUserMock);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation failed");

      // Check the individual errors
      expect(response.body.errors).toEqual([
        "Full name is required",
        "Invalid email format",
        "Password must be at least 8 characters",
        "Password must contain a number",
        "Password must contain a lowercase letter",
        "Password must contain an uppercase letter",
        "Invalid enum value. Expected 'STUDENT' | 'TEACHER' | 'PARENT' | 'PRIVATE_TUTOR', received ''",
      ]);
    });

    it("should return status 400 if the password characters is more than the max allowed value", async () => {
      const response = await request(app)
        .post("/signup")
        .send(passwordAboveMaxMock);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation failed");

      // Check the individual errors
      expect(response.body.errors).toEqual([
        "Password must be at most 64 characters",
      ]);
    });
  });

  describe("GET /user/:id", () => {
    it("should return a user by ID", async () => {
      const createResponse = await request(app)
        .post("/signup")
        .send(genericUserMock);

      const userId = createResponse.body.userId;

      const response = await request(app).get(`/user/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", userId);
      expect(response.body).toHaveProperty(
        "fullName",
        genericUserMock.fullName
      );
      expect(response.body).toHaveProperty("email", genericUserMock.email);
      expect(response.body).toHaveProperty(
        "userType",
        genericUserMock.userType
      );
    });

    it("should return status 404 if the user is not found", async () => {
      const response = await request(app).get("/user/nonexistent-id");
      // Non-existing ID
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });

  describe("DELETE /user/:id", () => {
    it("Should delete an existing user if younger than 14 days", async () => {
      const createUser = prisma.user.create({
        data: {
          email: "test@test.co.uk",
          createdAt: new Date(),
          fullName: "Test User",
          password: "",
          userType: "STUDENT",
        },
      });

      const createdUserId = (await createUser).id;

      const deleteUserRequest = await request(app)
        .delete(`/user/${createdUserId}`)
        .send();
      expect(deleteUserRequest.status).toBe(204);
    });

    it("Shouldn't delete an existing user if older than 14 days", async () => {
      const createUser = prisma.user.create({
        data: {
          email: "test@test.co.uk",
          createdAt: getMaxDate(),
          fullName: "Test User",
          password: "",
          userType: "STUDENT",
        },
      });

      const createdUserId = (await createUser).id;

      const deleteUserRequest = await request(app)
        .delete(`/user/${createdUserId}`)
        .send();
      expect(deleteUserRequest.status).toBe(400);
    });
  });

  // Disconnect from the database after all tests
  afterAll(async () => {
    await prisma.$disconnect();
  });
});
