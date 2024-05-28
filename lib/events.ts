import { EventType } from "@/components/events/event-list";
import sql from "better-sqlite3";

type EventsFilters = "year" | "month";

export type CommentBody = {
  id?: number;
  email: string;
  eventId: number;
  text: string;
  name: string;
};

export const db = new sql("events-app.db");

function initDb() {
  db.exec(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    date INTEGER NOT NULL,
    image TEXT,
    isFeatured INTEGER
  )`);

  db.exec(`CREATE TABLE IF NOT EXISTS events_comments (
    id INTEGER PRIMARY KEY,
    eventId INTEGER NOT NULL,
    email TEXT NOT NULL,
    text TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`);

  db.exec(`INSERT INTO events (id, title, description, location, date, image, isFeatured)
  SELECT 1, 'Programming for everyone', 
    'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.', 
    'Somestreet 25, 12345 San Somewhereo', 
    '2021-05-12', 
    'images/coding-event.jpg', 
    0
  WHERE NOT EXISTS (
      SELECT 1 
      FROM events 
      WHERE id = 1
  );
  
  INSERT INTO events (id, title, description, location, date, image, isFeatured)
  SELECT 2, 'Networking for introverts', 
    'We know: Networking is no fun if you are an introvert person. That''s why we came up with this event - it''ll be so much easier. Promised!', 
    'New Wall Street 5, 98765 New Work', 
    '2021-05-30', 
    'images/introvert-event.jpg', 
    1
  WHERE NOT EXISTS (
      SELECT 1 
      FROM events 
      WHERE id = 2
  );
  
  INSERT INTO events (id, title, description, location, date, image, isFeatured)
  SELECT 3, 'Networking for extroverts', 
    'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.', 
    'My Street 12, 10115 Broke City', 
    '2022-04-10', 
    'images/extrovert-event.jpg', 
    1
  WHERE NOT EXISTS (
      SELECT 1 
      FROM events 
      WHERE id = 3
  );`);
}

initDb();

export async function getAllEvents() {
  return db.prepare("SELECT * FROM events").all() as EventType[];
}

export async function getFeaturedEvents() {
  return db
    .prepare("SELECT * FROM events WHERE isFeatured = 1")
    .all() as EventType[];
}

export async function getEventById(id: number) {
  return db.prepare("SELECT * FROM events WHERE id = ?").get(id) as EventType;
}

export async function getFilteredEvents(
  dateFilter: Record<EventsFilters, string>
) {
  let where;
  const queryParams = [];
  const { year, month } = dateFilter;

  if (year) {
    where = ` AND strftime('%Y', date) = ? `;
    queryParams.push(year);
  }

  if (month) {
    where = `${where} AND strftime('%m', date) = ? `;
    queryParams.push(month);
  }

  return db
    .prepare(`SELECT * FROM events WHERE id > 0 ${where}`)
    .all(queryParams) as EventType[];
}

export async function getEventComments(eventId: number) {
  return db
    .prepare("SELECT id, name, text FROM events_comments WHERE eventId = ?")
    .all(eventId) as CommentBody[];
}

export async function addEventComment(comment: CommentBody) {
  const { id, eventId, name, email, text } = comment;
  return db
    .prepare(
      "INSERT INTO events_comments (id, name, email, eventId, text, created_at) VALUES ( ?, ?, ?, ?, ?, ?)"
    )
    .run(id, name, email, eventId, text, Date.now());
}

export async function removeEventComment(commentId: number) {
  return db.prepare("DELETE FROM events_comments WHERE id = ?").run(commentId);
}
