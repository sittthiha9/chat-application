"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../auth";
import { PrismaClient } from "@prisma/client";

export async function getFriends() {
  const session = await auth();
  if (!session?.user) return [];
  try {
    return await prisma.friend.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getFriendByUserId(userId: string) {
  console.time("getFriendByUserId");
  try {
    const friend = await prisma.friend.findUnique({ where: { userId } });
    if (!friend) {
      console.error(`No friend found for userId: ${userId}`);
    }
    return friend;
  } catch (error) {
    console.error("Error fetching friend:", error);
    return null;
  }
}
