import express, { Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { populateCyberTools } from "./services/populateCybertools";
import { cybertoolsRouter } from "./routes/cybertoolsRouter";
import { usersRouter } from "./routes/userRouter";

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

// Ensure express can parse JSON
app.use(express.json());

// Use your routers
app.use("/api/cybertools", cybertoolsRouter);
app.use("/api/users", usersRouter);

mongoose
  .connect(process.env.DATABASE_URI || "")
  .then(async () => {
    console.log("Connected to database");

    await populateCyberTools();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err?: Error | null) => {
    console.error("Could not connect to database:", err);
  });
