"use client";

import { Input } from "../../input";
import { Paperclip, Smile, Mic, SendHorizontal } from "lucide-react";
import { FormEvent, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../button";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams, useRouter } from "next/navigation";

interface MessageData {
  text: string;
}

const Footer = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const params = useParams<{ userId: string }>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isValid },
  } = useForm<MessageData>();

  const onSubmit: SubmitHandler<MessageData> = async (data) => {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipientUserId: params.userId,
        data,
      }),
    });

    const result = await response.json();

    if (result.status === 'error') {
      console.log('error creating message: ', result.error);
    } else {
      reset();
      router.refresh();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("🚀 ~ handleFileChange ~ file:", file);
  };

  const fileHandleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const emojiChange = (emoji: any) => {
    setValue("text", watch("text") + emoji.native);
  };

  return (
    <div className="w-full flex gap-2 items-center justify-start bottom-0 px-4 py-3 border-t border-gray-300 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Smile size={24} className="mr-2 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="border-none rounded-none p-0 w-auto">
          <Picker
            data={data}
            emojiSize={20}
            emojiButtonSize={32}
            previewPosition={"none"}
            navPosition={"bottom"}
            onEmojiSelect={emojiChange}
          />
        </PopoverContent>
      </Popover>

      <div onClick={fileHandleClick} className="cursor-pointer">
        <Paperclip className="flex-none" />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-full">
          <Input
            width={"100%"}
            type="text"
            multiple
            {...register("text", { required: true })}
            placeholder="Type a message"
            className="focus:outline-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {isValid ? (
            <Button
              size={"icon"}
              type="submit"
              className="bg-accent/40 rounded-full"
            >
              <SendHorizontal />
            </Button>
          ) : (
            <Button
              size={"icon"}
              type="submit"
              className="bg-accent/40 rounded-full"
            >
              <Mic />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Footer;
