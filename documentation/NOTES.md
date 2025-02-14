# Decisions

## Using Prisma

1. **Type-safe queries**: Prisma ensures your database queries are type-safe, reducing runtime errors.
2. **Easy migrations**: Prisma automatically generates SQL migrations, making schema changes straightforward.
3. **Easy to expand**: Prisma makes it easier to expand functionality and makes queries more readable.

---

## Using Zod

1. **Type inference**: Zod integrates smoothly with TypeScript, keeping types and validation in sync.
2. **Simple syntax**: Zod has an easy-to-use API, making validation clean and readable.

---

## Using bcryptjs

1. **Secure password hashing**: bcryptjs securely hashes passwords to protect user data.

---

# Things I would improve if I had more time

1. **Add Test Database Implementation**  
   Set up a separate database for tests to avoid affecting the database.

2. **Expand Tests**  
   Add more tests to cover edge cases and ensure comprehensive coverage.

3. **Add Rate Limiting**  
   Implement rate limiting on key endpoints to prevent abuse.

4. **Develop an auth solution**  
   Implement auth using JWT.
