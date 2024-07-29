"use client";
import { Session } from "next-auth";
import ChatList from "./ChatList";
import { Friend } from "@prisma/client";

type ChatListProps = {
  user?: Session["user"];
  friends: Friend[];
};

const LeftSection = ({ user, friends }: ChatListProps) => {
  return (
    <div className="h-screen bg-white flex">
      <ChatList user={user} friends={friends} />
    </div>
  );
};

export default LeftSection;
