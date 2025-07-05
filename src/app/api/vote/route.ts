import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { VoteSchema } from "@/zodSchemas/vote";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthhorized" }), {
        status: 401,
      });
    }

    const body = await request.json();
    const parsedBody = VoteSchema.parse(body);

    const { projectId } = parsedBody;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    if (user.votedProjects.includes(projectId)) {
      return new Response(
        JSON.stringify({ error: "You have already voted for this project" }),
        {
          status: 400,
        }
      );
    }

    await prisma.user.update({
      where: { email: session.user.email as string },
      data: {
        votedProjects: [...user.votedProjects, projectId],
      },
    });

    await prisma.project.update({
      where: { id: projectId },
      data: {
        votes: {
          increment: 1,
        },
      },
    });

    return new Response(
      JSON.stringify({
        message: "Voted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in voting API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
