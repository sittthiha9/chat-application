import {getFriendByUserId} from "@/app/actions/friendsActions";
import ChatBoxContainer from "@/components/ui/conversations/chat-section/ChatBoxContainer";
import {notFound} from "next/navigation";
import {getMessageThread} from "@/app/actions/messageActions";

interface Message {
  id: string;
  text: string;
  created: string;
  dateRead: string | null;
  senderId: string | undefined;
  senderName: string;
  senderImage: string;
  recipientId: string;
  recipientName: string;
  recipientImage: string;
}

interface ErrorResponse {
  status: string;
  error: string[];
}

type MessagesResponse = Message[] | ErrorResponse;

const ConversationPage = async ({params, userId}: any) => {
  const friend = await getFriendByUserId(params.userId);
  const messages: MessagesResponse = await getMessageThread(params.userId);

  if (!friend) return notFound();

  if ('status' in messages) {
    return <p>Error fetching messages.</p>;
  }

  return (
    <>
      <ChatBoxContainer friend={friend} messages={messages}/>
    </>
  );
};

export default ConversationPage;
