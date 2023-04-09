import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import express from 'express';
import { connect } from "mongoose";
import BaseRoutes from  './utils/BaseRoutes';

const app = express();

if (process.env.NODE_ENV !== "test") {
  const DB = process.env.DATABASE!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!
  );
  connect(DB).then(() => console.log('DB connection successful!'));
}

app.use(BaseRoutes);

export { app };