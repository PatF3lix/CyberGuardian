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
  // Check if cybertools collection exists
  const collectionInfo = await mongoose.connection.db
    .listCollections({
      name: "cybertools",
    })
    .next();

  if (!collectionInfo) {
    console.log("Cybertools collection does not exist");

    fs.createReadStream(path.join(__dirname, "cybertools.csv"))
      .pipe(csvParser())
      .on("data", async (row: CSVRow) => {
        try {
          const cyberTool = new CyberTool(row);
          await cyberTool.save();
          console.log("Document inserted into cybertools collection", row.name);
        } catch (err) {
          console.log("Error inserting document:", err);
        }
      })
      .on("end", () => {
        console.log("CSV parsing finished");
      });
  } else {
    console.log("Cybertools collection exists");
  }
};
