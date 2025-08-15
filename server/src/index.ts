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

app.get("/api/v1/protected", authMiddleware, (req, res) =>
  funct1(req as AuthRequest, res)
);

app.get("/api/v1/profile", authMiddleware, async (req, res) => {
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

// project functions
async function createProject(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    const { title, description, github, fund_target } = req.body;
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        github,
        fund_target,
        userId,
      },
    });

    if (!newProject) {
      return res.status(400).json({ message: "Project not created" });
    }
    res.status(200).json(newProject);
  } catch (error) {
    console.error("Project creation error:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
}

async function getProjects(req: AuthRequest, res: Response) {
  try {
    const allProjects = await prisma.project.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
            public_key: true,
          },
        },
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!allProjects) {
      return res.status(400).json({ message: "Projects not found" });
    } else {
      res.status(200).json(allProjects);
    }
  } catch (error) {
    console.error("Projects fetch error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}

// public key

async function addPublicKey(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    const { public_key } = req.body;

    const updatedUserWithPublicKey = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        public_key,
      },
    });

    if (!updatedUserWithPublicKey) {
      return res.status(400).json({ message: "Public key not added" });
    }
    res.status(200).json(updatedUserWithPublicKey);
  } catch (error) {
    console.error("Public key add error:", error);
    res.status(500).json({ error: "Failed to add public key" });
  }
}

// projects routes
app.post("/api/v1/project", authMiddleware, (req, res) => {
  createProject(req as AuthRequest, res);
});

app.get("/api/v1/projects", (req, res) => {
  getProjects(req as AuthRequest, res);
});

// public key
app.post("/api/v1/addPublicKey", (req, res) => {
  addPublicKey(req as AuthRequest, res);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
