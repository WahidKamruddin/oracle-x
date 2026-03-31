import { startMockServer } from "./helpers/mock-server";
import { initTestDb } from "./helpers/db";

export default async function globalSetup() {
  await startMockServer(3001);
  await initTestDb();
}
