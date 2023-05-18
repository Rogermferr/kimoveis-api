import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import { handleErrors } from './error';
import usersRoutes from './routes/users.routes';
import categoriesRoutes from './routes/categories.routes';
import realEstateRoutes from './routes/realEstate.routes';
import schedulesRoutes from './routes/schedules.routes';
import loginRoutes from './routes/login.routes';

const app = express();
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/categories', categoriesRoutes);
app.use('/realEstate', realEstateRoutes);
app.use('/schedules', schedulesRoutes);

app.use(handleErrors);

export default app;
