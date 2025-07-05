// import { prisma } from "@/lib/prisma";

// export async function GET(
//   request: Request,
//   { params }: { params: { projectId: string } }
// ) {
//   try {
//     const { projectId } = params;

//     if (!projectId) {
//       return Response.json(
//         { message: "Project ID is required" },
//         { status: 400 }
//       );
//     }

//     const project = await prisma.project.findUnique({
//       where: { id: projectId },
//       select: {
//         id: true,
//         projectName: true,
//         projectDescription: true,
//         github: true,
//         user: {
//           select: {
//             id: true,
//             name: true,
//             image: true,
//           },
//         },
//       },
//     });

//     if (!project) {
//       return Response.json({ message: "project nnot found" }, { status: 404 });
//     }

//     return Response.json(project, { status: 200 });
//   } catch (error) {
//     console.log("Error fetching project:", error);

//     return Response.json({ error: "Failed to fetch project" }, { status: 500 });
//   }
// }
