/**
 * Allows us to use environement variables in other files.
 */
interface ImportMetaEnv {
    // Server side keys.
    readonly SERVER_FIREBASE_PRIVATE_KEY_ID: string;
    readonly SERVER_FIREBASE_PRIVATE_KEY: string;
    readonly SERVER_FIREBASE_PROJECT_ID: string;
    readonly SERVER_FIREBASE_CLIENT_EMAIL: string;
    readonly SERVER_FIREBASE_CLIENT_ID: string;
    readonly SERVER_FIREBASE_AUTH_URI: string;
    readonly SERVER_FIREBASE_TOKEN_URI: string;
    readonly SERVER_FIREBASE_AUTH_CERT_URL: string
    readonly SERVER_FIREBASE_CLIENT_CERT_URL: string;

    // Client side keys.
    readonly PUBLIC_CLIENT_FIREBASE_API_KEY: string;
    readonly PUBLIC_CLIENT_AUTH_DOMAIN: string;
    readonly PUBLIC_CLIENT_PROJECT_ID: string;
    readonly PUBLIC_CLIENT_STORAGE_BUCKET: string;
    readonly PUBLIC_CLIENT_MESSAGE_SENDER_ID: string;
    readonly PUBLIC_CLIENT_APP_ID: string;
    
    //Prod settings
    readonly PROD_URL: string;
    readonly DEV_URL: string;
    //Dev settings

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }