"use client";

import { Input } from "../input"; 
import { Paperclip } from "lucide-react";
import { Smile } from "lucide-react";
import { Mic } from "lucide-react";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [text, setText] = useState(false);

  const handleChange = () => {
    setText(true);
  };
  return (
    <div className="w-full flex gap-2 items-center justify-start bottom-0 p-5 border border-gray-300 z-50">
      <Smile className="flex-none text-secondary" />
      <Paperclip className="flex-none" />
      <div className="w-full">
        <Input
          onChange={handleChange}
          type="text"
          placeholder="Type a message"
          className="focus:none border-none bg-transparent"
        />
      </div>
      {setText ? (
        <SendHorizontal className="flex-none" />
      ) : (
        <Mic className="flex-none bg-blue-500 h-7 w-7 rounded-full p-1 text-white" />
      )}
    </div>
  );
};

export default Footer;
