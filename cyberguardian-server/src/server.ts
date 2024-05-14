import express, { Request, Response } from "express";
import csvParser from "csv-parser";
import fs from "fs";
import mongoose from "mongoose";
import CyberTool from "./models/cybertool";
import * as dotenv from "dotenv";
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// Define interface for the CSV row
interface CSVRow {
  Category: string;
  Name: string;
  Description: string;
  Url: string;
  Logo?: string;
  Image?: string;
}

mongoose
  .connect(process.env.DATABASE_URI || "")
  .then(async () => {
    console.log("Connected to MongoDB");

    //check if cybertools collection exists
    const collectionInfo = await mongoose.connection.db
      .listCollections({
        name: "cybertools",
      })
      .next();

    if (!collectionInfo) {
      console.log("Cybertools collection does not exist");

      console.log(path.join(__dirname, "cybertools.csv"));
      fs.createReadStream(path.join(__dirname, "cybertools.csv"))
        .pipe(csvParser())
        .on("data", async (row: CSVRow) => {
          try {
            const cyberTool = new CyberTool(row);
            await cyberTool.save();
            console.log(
              "Document inserted into cybertools collection",
              row.Name
            );
          } catch (err) {
            console.log("Error inserting document:", err);
          }
        })
        .on("end", () => {
          console.log("CSV parsing finished");
        });
    } else {
      console.log("cybertools collection exists");
    }
  })
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
