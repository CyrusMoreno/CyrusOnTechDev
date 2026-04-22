const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;
const CRM_FILE = "monday_crm_mock.json";

// Middleware
app.use(cors());
app.use(express.json());

// The "Webhook" endpoint that catches the Calendly data
app.post("/webhook", (req, res) => {
  const newLead = req.body;
  console.log("🚀 Mock test_Incoming Zapier Webhook Triggered!", newLead);

  // Read the existing CRM database (or create a new array if it doesn't exist)
  let crmData = [];
  if (fs.existsSync(CRM_FILE)) {
    const rawData = fs.readFileSync(CRM_FILE);
    crmData = JSON.parse(rawData);
  }

  // Add the new lead to the CRM
  crmData.push(newLead);

  // Save it back to the file
  fs.writeFileSync(CRM_FILE, JSON.stringify(crmData, null, 2));

  console.log(
    "💾 Mock test_Lead successfully saved to Monday.com mock database.",
  );
  res.status(200).send("Mock test_Lead captured successfully.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Mock test_Waiting for Calendly bookings...");
});
