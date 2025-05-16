const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");

router.post("/", async (req, res) => {
  try {
    const { message, date, time, method } = req.body;
    const remindAt = new Date(`${date}T${time}`);

    const reminder = new Reminder({ message, remindAt, method });
    await reminder.save();
    res.status(201).json({ success: true, reminder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/", async (req, res) => {
  const reminders = await Reminder.find().sort({ remindAt: 1 });
  res.json(reminders);
});

module.exports = router;
