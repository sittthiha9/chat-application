import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { EllipsisVertical } from "lucide-react";
import Chats from "./Chats";
import Footer from "./Footer";

const ChatSection = () => {
  return (
    <div className="w-[80%] flex flex-col justify-between">
      <div className="h-[113px] px-10 border-l border-b border-gray-300 w-full flex justify-between items-center z-50">
        <div className="flex gap-5">
          <Avatar>
            <AvatarImage
              src="assets/profiles/group-chat.svg"
              className="bg-auto"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-md font-bold">Summit Squad</h3>
            <div className="flex gap-1 items-center">
              <div className="bg-green-600 border-none h-2 w-2 rounded-full" />
              <p className="text-xs">Online</p>
            </div>
          </div>
        </div>
        <EllipsisVertical />
      </div>
      <Chats />
      <Footer />
    </div>
  );
};

export default ChatSection;
