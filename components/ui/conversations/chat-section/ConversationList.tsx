"use client";
import { Separator } from "../../separator";
import { Input } from "../../input";
import { Search } from "lucide-react";
import { ScrollArea } from "../../scroll-area";
import { Session } from "next-auth";
import ChatListItem from "./ChatListItem";
import { Friend } from "@prisma/client";
import { useConversation } from "@/hooks/useConversation";

type ConversationListProps = {
  user?: Session["user"];
  friends: Friend[];
};

const ConversationList = ({ friends }: ConversationListProps) => {
  const { userId: activeUserId } = useConversation();
  return (
    <div className="pt-4 flex flex-col gap-3">
      <Input
        icon={<Search className="h-4 text-secondary ml-1" />}
        type="text"
        id="searchBar"
        placeholder="Search messages..."
        className="h-9 ml-1 bg-background border-gray-300 text-gray-800 placeholder-secondary pl-10 focus:none rounded-full w-full"
      />
      <ScrollArea className="h-[calc(100vh-170px)] w-auto pr-4">
        {friends?.map((friend) => (
          <ChatListItem
            key={friend.userId}
            friend={friend}
            isActive={friend.userId === activeUserId}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ConversationList;
