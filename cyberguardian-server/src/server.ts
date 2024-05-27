import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { usersRouter } from "./routes/userRouter";
import { cybertoolsRouter } from "./routes/cybertoolsRouter";
import { errorHandler } from "./middlewares/errorHandling";
import "express-async-errors"; // This package helps handle async errors
import helmet from "helmet";
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

mongoose
  .connect(process.env.DATABASE_URI || "")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
  });
