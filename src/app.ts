import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import express from 'express';
import { connect } from "mongoose";
import BaseRoutes from  './utils/BaseRoutes';

import SwaggerOptions from './docs/SwaggerOptions';
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

/* istanbul ignore if */
if (process.env.NODE_ENV !== "test") {
  const DB = process.env.DATABASE!.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD!
  );
  connect(DB).then(() => console.log('DB connection successful!'));
}

app.use(BaseRoutes);
const specs = swaggerJSDoc(SwaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

export { app };