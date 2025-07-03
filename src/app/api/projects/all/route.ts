import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const limit = 10;

    const allProjects = await prisma.project.findMany({
      take: limit + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            github: true,
            twitter: true,
          },
        },
      },
    });

    if (allProjects.length === 0) {
      return Response.json(
        {
          message: "No projects found",
        },
        { status: 404 }
      );
    }

    const hasMore = allProjects.length > limit;

    const projects = hasMore ? allProjects.slice(0, limit) : allProjects;

    const nextCursor =
      projects.length > 0 ? projects[projects.length - 1].id : null;
    return Response.json(
      {
        projects,
        nextCursor: hasMore ? nextCursor : null,
        hasMore,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
