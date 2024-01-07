/**
 * Configuration to use the database on the server side.
 */
export const prerender = true;
import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
const { privateKey } = JSON.parse(import.meta.env.SERVER_FIREBASE_PRIVATE_KEY);
const activeApps = getApps();
const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.SERVER_FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.SERVER_FIREBASE_PRIVATE_KEY_ID,
  private_key: privateKey,
  client_email: import.meta.env.SERVER_FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.SERVER_FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.SERVER_FIREBASE_AUTH_URI,
  token_uri: import.meta.env.SERVER_FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.SERVER_FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.SERVER_FIREBASE_CLIENT_CERT_URL,
};

export const app = activeApps.length === 0 ? initializeApp({
  credential: cert(serviceAccount as ServiceAccount), 
}) : activeApps[0];