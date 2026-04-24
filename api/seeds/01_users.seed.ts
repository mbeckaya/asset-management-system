import type { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    const passwordHash = await bcrypt.hash("passwort12345", 10);

    await knex("users").del();

    await knex("users").insert([
    {
      email: "admin@example.com",
      password: passwordHash,
      first_name: "Max",
      last_name: "Mustermann",
      is_active: true,
    },
    {
      email: "user1@example.com",
      password: passwordHash,
      first_name: "Anna",
      last_name: "Schmidt",
      is_active: true,
    },
    {
      email: "user2@example.com",
      password: passwordHash,
      first_name: "Lukas",
      last_name: "Weber",
      is_active: true,
    },
    {
      email: "inactive@example.com",
      password: passwordHash,
      first_name: "Tom",
      last_name: "Inactive",
      is_active: false,
    },
  ]);
};
