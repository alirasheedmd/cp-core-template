import "dotenv/config"; // Ensure environment variables are loaded
import { db } from "../db";
import { users } from "../db/products"; // Removed 'issues' import

// Define the type for user insertion based on the schema
type NewUser = typeof users.$inferInsert;

async function main() {
  console.log("Starting database seeding...");

  // Clean up existing data
  // await db.delete(issues) // Removed issues cleanup
  await db.delete(users);

  // Create demo users
  const demoPassword = "password123"; // Using plain text password

  const adminUserId = "admin-user-id"; // Using hardcoded ID
  const memberUserId = "member-user-id"; // Using hardcoded ID

  const adminUserData: NewUser = {
    id: adminUserId,
    email: "admin@example.com",
    password: demoPassword,
  };

  const adminUser = await db
    .insert(users)
    .values(adminUserData)
    .returning()
    .then((rows) => rows[0]);

  const memberUserData: NewUser = {
    id: memberUserId,
    email: "user@example.com",
    password: demoPassword,
  };

  const memberUser = await db
    .insert(users)
    .values(memberUserData)
    .returning()
    .then((rows) => rows[0]);

  console.log("Created demo users:");
  console.log(`- Admin: ${adminUser.email} (password: password123)`);
  console.log(`- User: ${memberUser.email} (password: password123)`);

  // Removed demo issues creation logic

  console.log("Database seeding completed!"); // Adjusted completion message
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seed script finished");
  });
