const cron = require("node-cron");
const Reminder = require("./models/Reminder");
const sendEmail = require("./utils/sendEmail");

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const dueReminders = await Reminder.find({
    remindAt: { $lte: now },
    sent: false,
  });

  for (const reminder of dueReminders) {
    if (reminder.method === "email") {
      await sendEmail(reminder.message);
      reminder.sent = true;
      await reminder.save();
    }
  }

  if (dueReminders.length > 0) {
    console.log(`Processed ${dueReminders.length} reminders`);
  }
});
