"use client";
import { Session } from "next-auth";
import LeftSection from "./LeftSection";
import { Friend } from "@prisma/client";
import ChatSection from "./ChatSection";

type ChatListProps = {
  user?: Session["user"];
  friends: Friend[];
};

const Conversations = ({ user, friends }: ChatListProps) => {
  return (
    <div className="h-screen bg-white flex">
      <LeftSection user={user} friends={friends} />
      <ChatSection />
    </div>
  );
};

export default Conversations;
