import "dotenv/config";
import express from "express";

import { clerkMiddleware } from "@clerk/express";
import { verifyWebhook } from "@clerk/express/webhooks";
import bodyParser from "body-parser";

const app = express();
const port = 8000;

app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("working");
});

app.post(
  "/api/webhooks",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const event = await verifyWebhook(req);

      const eventType = event.type;
      const eventId = event.data.id;
      console.log("Event type:", eventType);
      console.log("Event ID:", eventId);

      console.log("Webhook payload:", event);

      //database logic, adding user to db

      if (eventType === "user.created") {
        const { id, image_url, username, email_addresses } = event.data;
        const email = email_addresses ? [0] : null;
      }
    } catch (error) {
      console.error("Error verifying webhook:", error);
    }
  }
);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
