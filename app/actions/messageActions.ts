import {getAuthUserId} from "./authActions";
import {prisma} from "@/lib/prisma";
import {mapMessageToMessageDto} from "@/lib/mappings";

export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {senderId: userId.id, recipientId},
          {senderId: recipientId, recipientId: userId.id},
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return messages.map(message => mapMessageToMessageDto(message))
  } catch (error) {
    console.error(error);
    return {status: "error", error: ["Failed to fetch message thread"]};
  }
}


export async function getUnreadMessageCount() {
  try {
    const userId = await getAuthUserId();
    return prisma.message.count({
      where: {
        recipientId: userId.id,
        dateRead: null,
        recipientDeleted: false,
      }
    })
  } catch (error) {
    console.error(error);
    throw error;
  }
}