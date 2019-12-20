const cron = require("node-cron");

cron.schedule(" * * * * *", () => {
  console.log("After 2 secs");
});
