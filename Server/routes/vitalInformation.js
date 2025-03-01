const express = require("express");
const verifyToken = require("./verifyToken");
const router = express.Router();
const Metric = require("../models/metrics");

router.post("/recieve",verifyToken, async (req, res) => {
    
    const data = new Metric({

        date: new Date(),
        temperature:req.body.temperature,
        heartRate:req.body.heartRate,
        owner: req.user.id
    }
    
)
    await data.save()
    res.status(201).json({ message: "data saved successfully" }) // Add a response to avoid hanging requests
});

router.get("/history", verifyToken, async (req, res) => {
    // console.log("Fetching vitals");
    try {
      const vitals = await Metric.find({ owner: req.user.id }).sort({ date: 1 });
      res.status(200).json(vitals);
    } catch (error) {
      console.error("Error fetching vitals:", error);
      res.status(500).json({ error: "Error fetching vitals" });
    }
  });
  

module.exports = router;
