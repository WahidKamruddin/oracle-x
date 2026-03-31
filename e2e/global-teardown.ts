import { stopMockServer } from "./helpers/mock-server";
import { destroyTestDb } from "./helpers/db";

export default async function globalTeardown() {
  await stopMockServer();
  await destroyTestDb();
}
