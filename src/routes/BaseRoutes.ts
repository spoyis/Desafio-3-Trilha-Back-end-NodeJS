import express from 'express';
import userRouter from './userRoutes';
import carRouter from './carRoutes'

const app = express.Router();

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/car", carRouter);

export default app;