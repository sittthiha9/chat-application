"use client";

import { Separator } from "../../separator";
import { Input } from "../../input";
import { Search } from "lucide-react";
import { ScrollArea } from "../../scroll-area";
import { Session } from "next-auth";
import ChatListItem from "../chat-section/ChatListItem";
import { Friend } from "@prisma/client";
import ProfileSection from "./ProfileSection";
import { useConversation } from "@/hooks/useConversation";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";

type FriendListProps = {
  user?: Session["user"];
  friends: Friend[];
};

const FriendList = ({ friends }: FriendListProps) => {
  const router = useRouter();
  return (
    <div className="pt-4 flex flex-col gap-3">
      <Input
        icon={<Search className="h-4 text-secondary ml-1" />}
        type="text"
        id="searchBar"
        placeholder="Search friends..."
        className="h-9 ml-1 bg-background border-gray-300 text-gray-800 placeholder-secondary pl-10 focus:none rounded-full w-[95%]"
      />
      <ScrollArea className="h-[calc(100vh-170px)] w-[98%] pr-4">
        {friends?.map((friend) => (
          <div
            className={`hover:bg-secondary/20 rounded-md cursor-pointer`}
            onClick={() => router.push(`/conversations/${friend.userId}`)}
          >
            <div className="ml-2 flex items-center gap-3 w-full p-2">
              <Avatar>
                <AvatarImage
                  src={friend.image ?? undefined}
                  className="bg-auto"
                />
                <AvatarFallback>
                  {friend.name
                    .split(" ")
                    .map((word: string) => word[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="text-md font-semibold ">{friend.name}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default FriendList;
