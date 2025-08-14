import "dotenv/config";
import express, { type Response } from "express";

import { clerkMiddleware } from "@clerk/express";
import { verifyWebhook } from "@clerk/express/webhooks";
import bodyParser from "body-parser";
import cors from "cors";
import { prisma } from "./config/prisma.js";
import authMiddleware, { type AuthRequest } from "./middleware.js";

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
        const email = email_addresses?.[0]?.email_address || "";

        const newUser = await prisma.user.create({
          data: {
            id,
            name: username!,
            email,
            image: image_url!,
          },
        });

        console.log("New user created:", newUser);

        res.status(200).json({ message: "User created successfully" });
      }
    } catch (error) {
      console.error("Error verifying webhook:", error);
    }
  }
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());

function funct1(req: AuthRequest, res: Response) {
  const userId = req.user?.id;
  res.status(200).json(`User ID: ${userId} and Protected route`);
}

app.get("/protected", authMiddleware, (req, res) =>
  funct1(req as AuthRequest, res)
);

app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
