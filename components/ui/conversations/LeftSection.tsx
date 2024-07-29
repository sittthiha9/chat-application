import { Separator } from "../separator";
import { Input } from "../input";
import { Search } from "lucide-react";
import { ScrollArea } from "../scroll-area";
import { Session } from "next-auth";
import ChatListItem from "./ChatListItem";
import { Friend } from "@prisma/client";
import ProfileSection from "./ProfileSection";

type ChatListProps = {
  user?: Session["user"];
  friends: Friend[];
};

const LeftSection = ({ user, friends }: ChatListProps) => {
  console.log("🚀 ~ LeftSection ~ friends:", friends)
  return (
    <div className="pt-6 flex flex-col gap-3 w-[20%]">
      <ProfileSection user={user} />
      <Separator className="border-[1px] border-gray-200" />
      <Input
        icon={<Search className="h-4 text-secondary ml-5" />}
        type="text"
        id="searchBar"
        placeholder="Search message"
        className="h-8 ml-5 bg-background border-gray-300 text-gray-800 placeholder-secondary pl-10 focus:none rounded-full w-[80%]"
      ></Input>
      <Separator className="border-[1px] border-gray-200 pb-0" />
      <ScrollArea className="h-[400px] w-auto rounded-md pr-4">
        {friends?.map((friend) => (
          <ChatListItem friend={friend} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default LeftSection;
