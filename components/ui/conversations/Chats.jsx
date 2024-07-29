"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { getFriendByUserId } from "@/app/actions/friendsActions";

const Chats = () => {

  const friend = getFriendByUserId()
  const [messages, setMessages] = useState([
    { text: "Hello!", isSender: "me" },
    { text: "Hi there!", isSender: "John" },
    { text: "How are you? Where have you been?", isSender: "John" },
    { text: "How are you?", isSender: "Micheal" },
    { text: "I am good, thanks!", isSender: "me" },
  ]);

  const groupedMessages = messages.reduce((acc, message, index) => {
    if (index === 0 || messages[index - 1].isSender !== message.isSender) {
      acc.push({ sender: message.isSender, messages: [message] });
    } else {
      acc[acc.length - 1].messages.push(message);
    }
    return acc;
  }, []);

  return (
    <ScrollArea className="h-full w-full bg-background">
      <div className="flex flex-col gap-1 p-4">
        {groupedMessages.map((group, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 text-sm ${
              group.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {group.sender !== "me" && (
              <Avatar>
                <AvatarImage
                  src={`assets/profiles/boy-profile.svg`}
                  className="bg-auto"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              {group.sender !== "me" && (
                <p className="text-xs font-medium">{group.sender}</p>
              )}
              <div className="flex flex-col space-y-1">
                {group.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-xs px-3 py-2 ${
                      group.sender === "me"
                        ? "bg-primary/80 rounded-l-lg rounded-tr-lg text-right"
                        : "bg-gray-300/90 rounded-r-lg rounded-tl-lg text-left"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Chats;
