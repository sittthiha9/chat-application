"use client";
import { Session } from "next-auth";
import FriendList from "@/components/ui/conversations/left-side-section/FriendList";
import { Friend } from "@prisma/client";
import ChatBoxContainer from "./chat-section/ChatBoxContainer";

type ChatListProps = {
  user?: Session["user"];
  friends: Friend[];
};

const Conversations = ({ user, friends }: ChatListProps) => {
  return (
    <div className="h-screen bg-white flex">
      <FriendList user={user} friends={friends} />
      <ChatBoxContainer />
    </div>
  );
};

export default Conversations;
