import { db } from "./events";

function initDb() {
  db.exec(`CREATE TABLE IF NOT EXISTS newsletter_users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL
  )`);
}

initDb();

export async function joinNewsletter(email: string) {
  return db
    .prepare("INSERT INTO newsletter_users (email, created_at) VALUES (?,?)")
    .run(email, Date.now());
}

export async function leaveNewsletter(email: string) {
  return db.prepare("DELETE FROM newsletter_users WHERE email = ? ").get(email);
}
