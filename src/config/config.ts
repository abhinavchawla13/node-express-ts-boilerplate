import dotenv from 'dotenv';

const envFound = dotenv.config({
  path: process.env.DOTENV_CONFIG_PATH || './.env',
});

if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.HEROKU_ENV = process.env.HEROKU_ENV || 'staging';
process.env.PORT = process.env.PORT || '8080';

const config = {
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.MONGODB_URI || '',
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },
  api: {
    prefix: '/api',
  },
  node_env: process.env.NODE_ENV,
  heroku_env: process.env.HEROKU_ENV,
  firebase: {
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authURI: process.env.FIREBASE_AUTH_URI,
    tokenURI: process.env.FIREBASE_TOKEN_URI,
    authProviderx509CertURL: process.env.FIREBASE_AUTH_PROVIDER_x509_CERT_URL,
    clientx509CertURL: process.env.FIREBASE_CLIENT_x509_CERT_URL,
    databaseURL: process.env.FIREBASE_DATABASE_URL || '',
  },
};

export default config;
