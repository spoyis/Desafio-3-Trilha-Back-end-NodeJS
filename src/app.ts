import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import express from 'express';
import { connect } from "mongoose";

const app = express();

const DB = process.env.DATABASE!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!
);

connect(DB).then(() => console.log('DB connection successful!'));

export { app };