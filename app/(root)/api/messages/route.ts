import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserId } from '@/app/actions/authActions';
import { messageSchema } from '@/lib/schemas/messageSchema';

export async function POST(request: Request) {
  try {
    const user = await getAuthUserId();
    if (!user) {
      return NextResponse.json({ status: 'error', error: 'Unauthorized' }, { status: 401 });
    }
    const userId = user.id;

    console.log('Authenticated user ID:', userId);

    const body = await request.json();
    const { recipientUserId, data } = body;

    const validated = messageSchema.safeParse(data);
    if (!validated.success) {
      return NextResponse.json({ status: 'error', error: validated.error.errors }, { status: 400 });
    }

    const { text } = validated.data;

    console.log('Recipient user ID:', recipientUserId);
    console.log('Message text:', text);

    const senderFriend = await prisma.friend.findUnique({
      where: { userId: userId },
    });
    if (!senderFriend) {
      return NextResponse.json({ status: 'error', error: 'Sender not found in Friend table' }, { status: 404 });
    }

    const recipientFriend = await prisma.friend.findUnique({
      where: { userId: recipientUserId },
    });
    if (!recipientFriend) {
      return NextResponse.json({ status: 'error', error: 'Recipient not found in Friend table' }, { status: 404 });
    }

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientUserId,
        senderId: userId,
      },
    });

    return NextResponse.json({ status: 'success', data: message });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ status: 'error', error: 'Internal Server Error' }, { status: 500 });
  }
}
