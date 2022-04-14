import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from "dotenv";

dotenv.config();

const FIRESTORE_DB = process.env.FIRESTORE_DB;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const key = require("../keys/serviceAccountKey.json");

initializeApp({
  credential: cert(key),
  databaseURL: FIRESTORE_DB,
});

const db = getFirestore();
db.settings({ timestampsInSnapshots: true });

export default db;
