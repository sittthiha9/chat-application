import {ZodIssue} from "zod";
import {Prisma} from "@prisma/client";

type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
  include: {
    sender: {
      select: {userId, name, image}
    },
    recipient: {
      select: {userId, name, image}
    }
  }
}>

type MessageDto = {
  id: string,
  text: string,
  created: string,
  dateRead: string | null,
  senderId: string,
  senderImage?: string | null,
  recipientId: string,
  recipientName: string,
  recipientImage?: string | null,
}