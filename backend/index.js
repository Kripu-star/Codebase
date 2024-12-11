import express from 'express';
import dotenv from 'dotenv';
import DBCon from './libs/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/Auth.js';
// import UserRoutes from './routes/user.js';  // Uncomment if needed
import DashboardRoutes from './routes/DashBoard.js';
// import CommentRoutes from './routes/Comments.js';  // Uncomment if needed
import PublicRoutes from './routes/public.js';
import Router from './routes/filter.js';
import path from 'path'
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
DBCon();

const _dirname=path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/', (req, res) => {
//     res.send('hello from server');
// });
app.use(express.static('public'));
app.use(cookieParser());

// Corrected typo here: `corsOptions`
const corsOptions = {
    origin: "https://codebase-backend-5djy.onrender.com",
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/auth', AuthRoutes);
// app.use('/user', UserRoutes);  // Uncomment if needed
app.use('/dashboard', DashboardRoutes);
// app.use('/comment', CommentRoutes);  // Uncomment if needed
app.use('/public', PublicRoutes);

app.use('/user', Router);  // `Router` is being used here for the `/filter` route


//serving clint using server
app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});


app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`);
});