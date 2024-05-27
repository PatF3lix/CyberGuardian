import express, { Request, Response } from "express";
import CyberTool from "../models/cybertool";

const router = express.Router();
router.get("/", async function (req: Request, res: Response) {
  try {
    // fetch all existing tools from database
    const cybertools = await CyberTool.find();
    res.send(cybertools);
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching cyber tools." });
  }
});

export { router as cybertoolsRouter };
