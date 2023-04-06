import express from 'express';
import UserRouter from '../modules/user/UserRoutes'
import carRouter from '../modules/car/CarRoutes'
import ErrorController from '../errors/ErrorController';

const app = express.Router();

app.use(express.json());
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/car", carRouter);
app.use(ErrorController.globalErrorHandler)

export default app;