import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file️");
}

process.env.APP_HOST = process.env.APP_HOST || 'localhost';
process.env.APP_PORT = process.env.APP_PORT || '3000';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

export default {
  name: process.env.APP_NAME,

  env: process.env.NODE_ENV,

  port: process.env.APP_PORT,
  host: process.env.APP_HOST,

  log: {
    level: "silly"
  }
};
