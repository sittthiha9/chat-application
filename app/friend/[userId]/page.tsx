import { getFriendByUserId } from "@/app/actions/friendsActions";
import { notFound } from "next/navigation";

const FriendDetail = async ({params}: {params: {userId: string}}) => {
  const friend = await getFriendByUserId(params.userId);
  
  if(!friend) return notFound();

  return <div>{friend?.name} Hello</div>;
};

export default FriendDetail;
