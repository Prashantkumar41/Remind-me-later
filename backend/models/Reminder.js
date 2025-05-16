const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    remindAt: { type: Date, required: true },
    method: { type: String, enum: ["email"], required: true },
    sent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", ReminderSchema);
