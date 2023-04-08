import express from 'express';
import UserRouter from '../modules/user/UserRoutes'
import carRouter from '../modules/car/CarRoutes'
import reserveRouter from '../modules/reserve/ReserveRoutes'
import ErrorController from '../errors/ErrorController';

const app = express.Router();

app.use(express.json());
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/car", carRouter);
app.use("/api/v1/reserve", reserveRouter)
app.use(ErrorController.globalErrorHandler)

export default app;