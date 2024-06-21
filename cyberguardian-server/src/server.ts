import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { usersRouter } from "./routes/userRouter";
import { cybertoolsRouter } from "./routes/cybertoolsRouter";
import { errorHandler } from "./middlewares/errorHandling";
import "express-async-errors"; // This package helps handle async errors
import helmet from "helmet";
import { populateCyberTools } from "./services/populateCybertools";
// import cors from "cors";

dotenv.config();

const port = process.env.PORT || 4001;
// const allowedOrigins = ["https://cyberguardian.patf3lix-portfolio.cc"];

const app = express();

app.use(json());
app.use(helmet());

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (origin != null && allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

app.use("/api/users", usersRouter);
app.use("/api/cybertools", cybertoolsRouter);

app.use(errorHandler);

  const start = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URI || "");
      console.log('Connected to MongoDB');
  
      // Populate cyber tools if the collection does not exist
    await populateCyberTools();
  
      app.listen(port, () => {
        console.log('Server running on port 4001');
      });
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
  };

  start();