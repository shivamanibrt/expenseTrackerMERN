import "dotenv/config.js"
import express from "express";
import transactionRouter from './src/routers/transactionRouter.js';
import userRouter from './src/routers/userRouter.js';
import { dbConnect } from "./src/config/dbConfig.js";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { authMiddleware } from "./src/middleware/authMiddleware.js";

const app = express();
const port = 1000;
//middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

dbConnect();

app.use('/api/v1/user', userRouter)
app.use('/api/v1/transaction', authMiddleware, transactionRouter)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/build')))

//This is default api endpoint
app.use('/api/v1/user', (req, res) => {
    res.json({
        status: 'success',
        message: 'This is default user api endpoint'
    })
})
app.use('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '/client/build/index.html'))

    } catch (error) {
        next(error)
    }
})

app.use((error, req, res, next) => {
    res.json({
        status: 'error',
        message: error.message
    })
})

app.listen(port, (error) => {
    error && console.log(error);
    console.log(`Your server is running on http://localhost:${port}`)
})