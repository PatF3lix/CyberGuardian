import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import mongoose from "mongoose";
import CyberTool from "../models/cybertool";

// Define interface for the CSV row
interface CSVRow {
  category: string;
  name: string;
  description: string;
  url: string;
  logo?: string;
  image?: string;
}

export const populateCyberTools = async () => {
  try {
    // Check if cybertools collection exists
    const collectionInfo = await mongoose.connection.db
      .listCollections({
        name: "cybertools",
      })
      .next();

    if (!collectionInfo) {
      console.log("Cybertools collection does not exist");

      const filePath = "/app/dist/cybertools.csv";
      const rows: CSVRow[] = [];

      // Read the CSV file and parse its content
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (row: CSVRow) => {
            rows.push(row);
          })
          .on("end", () => {
            resolve();
          })
          .on("error", (err) => {
            reject(err);
          });
      });

      // Insert the parsed rows into the database
      for (const row of rows) {
        try {
          const cyberTool = new CyberTool(row);
          await cyberTool.save();
          console.log("Document inserted into cybertools collection", row.name);
        } catch (err) {
          console.error("Error inserting document:", err);
        }
      }
      console.log("CSV parsing and database insertion finished");
    } else {
      console.log("Cybertools collection exists");
    }
  } catch (err) {
    console.error("Error populating cyber tools:", err);
  }
};
