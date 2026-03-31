import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import Database from "better-sqlite3";

// Resolve the test DB path from the DATABASE_URL env var
const TEST_DB_URL = process.env.DATABASE_URL ?? "file:./prisma/test.db";
const TEST_DB_REL_PATH = TEST_DB_URL.replace(/^file:/, "");
const TEST_DB_PATH = path.isAbsolute(TEST_DB_REL_PATH)
  ? TEST_DB_REL_PATH
  : path.resolve(process.cwd(), TEST_DB_REL_PATH);

function getDb() {
  return new Database(TEST_DB_PATH);
}

function newId() {
  return crypto.randomUUID();
}

export async function initTestDb() {
  execSync("npx prisma migrate deploy", {
    env: { ...process.env, DATABASE_URL: TEST_DB_URL },
    stdio: "pipe",
  });
}

export async function destroyTestDb() {
  const files = [TEST_DB_PATH, TEST_DB_PATH + "-wal", TEST_DB_PATH + "-shm"];
  for (const f of files) {
    if (fs.existsSync(f)) fs.unlinkSync(f);
  }
}

export async function resetDb() {
  const db = getDb();
  db.exec("DELETE FROM Favorite");
  db.exec("DELETE FROM Token");
  db.exec("DELETE FROM User");
  db.close();
}

export async function createTestUser(overrides?: {
  email?: string;
  password?: string;
  name?: string;
}) {
  const plainPassword = overrides?.password ?? "Password123";
  const id = newId();
  const name = overrides?.name ?? "Test User";
  const email = overrides?.email ?? "test@example.com";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const now = new Date().toISOString();

  const db = getDb();
  db.prepare(
    "INSERT INTO User (id, name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, name, email, hashedPassword, now, now);
  db.close();

  return { id, name, email, plainPassword };
}

export async function addFavorite(userId: string, coinId: string) {
  const now = new Date().toISOString();
  const db = getDb();
  db.prepare(
    "INSERT INTO Favorite (userId, coinId, createdAt, updatedAt) VALUES (?, ?, ?, ?)"
  ).run(userId, coinId, now, now);
  db.close();
}
