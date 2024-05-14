import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const port = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

mongoose
  .connect("mongodb://db/cyberGuardian")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
