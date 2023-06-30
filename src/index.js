import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { userRouter } from '../Routes/user.js';
import { favouriteRouter } from '../Routes/favourites.js';
import 'dotenv/config';
console.log(process.env.MONGODB_URL);
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth',userRouter);
app.use('/favourites',favouriteRouter);
connect(process.env.MONGODB_URL);

app.listen(PORT,()=>{console.log("Server Started "+PORT)});