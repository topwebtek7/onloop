import { Timestamp } from "@google-cloud/firestore";

export default interface IEContent {
  created_at?: Timestamp;
  description?: string;
  image?: string;
  status?: string;
  title?: string;
  url?: string;
}
