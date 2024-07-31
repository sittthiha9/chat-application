import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { EllipsisVertical } from "lucide-react";
import Chats from "./Chats";
import Footer from "./Footer";
import {getAuthUserId} from "@/app/actions/authActions";

const ChatBoxContainer = async ({ friend, messages }: any) => {
  const userId = await getAuthUserId();
  return (
    <div className="w-[80%] flex flex-col">
      <div className="px-5 py-3 border-b border-gray-300 w-full flex justify-between items-center z-50">
        <div className="flex gap-5">
          <Avatar>
            <AvatarImage src={friend?.image} className="bg-auto" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-md font-bold">{friend?.name}</h3>
            <div className="flex gap-1 items-center">
              <div className="bg-green-600 border-none h-2 w-2 rounded-full" />
              <p className="text-xs">Online</p>
            </div>
          </div>
        </div>
        <EllipsisVertical />
      </div>
      <Chats messages={messages} userId={userId}/>
      <Footer />
    </div>
  );
};

export default ChatBoxContainer;
