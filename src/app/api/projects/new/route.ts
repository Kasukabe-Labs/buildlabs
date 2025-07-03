import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      projectName,
      projectDescription,
      progress,
      github,
      isSecretProject,
    } = body;

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthhorized" }), {
        status: 401,
      });
    }

    if (!projectName || !projectDescription || !progress || !github) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        id: crypto.randomUUID(),
        projectName: projectName,
        projectDescription: projectDescription,
        progress: parseInt(progress, 10),
        github: github,
        isSecretProject: isSecretProject || false,
        userId: session.user.id,
      },
    });

    return new Response(
      JSON.stringify({ message: "Project created successfully", newProject }),
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating project:", error);
    return new Response(JSON.stringify({ error: "Failed to create project" }), {
      status: 500,
    });
  }
}
