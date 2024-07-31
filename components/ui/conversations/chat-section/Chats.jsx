"use client"
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";

const Chats = ({ messages, userId }) => {
  const lastMessageRef = useRef(null);
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true);
  }, []);
  
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  if (!hydrated) {
    return <div>Loading...</div>;
  }
  
  return (
    <ScrollArea className="h-[calc(100vh-165px)] w-full bg-background">
      <div className="flex flex-col gap-1 p-4">
        {messages?.map((message, index) => {
          const isCurrentUserSender = message.senderId === userId.id;
          const messageTime = new Date(message.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const isLastMessage = index === messages.length - 1;
          
          return (
            <div
              key={message.id}
              ref={isLastMessage ? lastMessageRef : null}
              className={`flex items-end gap-2 text-sm ${
                isCurrentUserSender ? "justify-end" : "justify-start"
              }`}
            >
              {!isCurrentUserSender && (
                <Avatar className={"flex self-start mt-4 items-center"}>
                  <AvatarImage
                    src={message.senderImage}
                    className="bg-auto w-9 h-9 rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              <div className={"flex flex-col"}>
                <div className="flex flex-col">
                  {!isCurrentUserSender && (
                    <p className="text-xs font-medium mb-1 ml-1">{message.senderName}</p>
                  )}
                  <div
                    className={`max-w-lg px-3 py-2 ${
                      isCurrentUserSender
                        ? "bg-accent/80 rounded-l-lg rounded-tr-lg text-right"
                        : "bg-gray-300/90 rounded-r-lg rounded-tl-lg text-left"
                    }`}
                  >
                    {message.text}
                  </div>
                  <p className="text-xs font-medium mb-1 ml-1 mt-1 text-gray-500">{messageTime}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default Chats;