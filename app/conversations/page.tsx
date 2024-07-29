import { auth } from "@/app/auth";
import { getFriendByUserId, getFriends } from "@/app/actions/friendsActions";
import Conversations from "@/components/ui/conversations";

const ConversationsPage = async () => {
  const session = await auth();
  const friends = await getFriends();
  const friend = await getFriendByUserId("clz780mjf0003qk57fyesa74g");
  console.log("🚀 ~ ConversationsPage ~ friend:", friend)
  
  return (
    <Conversations user={session?.user} friends={friends}/>
  )
};


export default ConversationsPage;