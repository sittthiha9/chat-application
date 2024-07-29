import { auth } from "@/app/auth";
import ConversationsClient from "@/components/ui/conversations/ConversationsClient"; 

const Conversations = async () => {
  const session = await auth();

  return <ConversationsClient user={session?.user} />;
};

export default Conversations;