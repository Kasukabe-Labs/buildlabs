import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ExtraUserDetails } from "@/zodSchemas/user";
import { headers } from "next/headers";
import { z } from "zod/v4";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthhorized" }), {
        status: 401,
      });
    }
    const body = await req.json();

    const parsedBody = ExtraUserDetails.parse(body);

    const { twitter, github } = parsedBody;

    if (!session.user.email) {
      return new Response(
        JSON.stringify({ error: "Email not found in session" }),
        {
          status: 404,
        }
      );
    }

    const findUser = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });

    if (!findUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const hasDetails = findUser.hasDetails;

    if (hasDetails) {
      return new Response(
        JSON.stringify({ error: "User already has details" }),
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email as string },
      data: {
        twitter,
        github,
        hasDetails: true,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: error }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Internal server error at addDeatils api endpoint",
        error: error,
      }),
      { status: 500 }
    );
  }
}
