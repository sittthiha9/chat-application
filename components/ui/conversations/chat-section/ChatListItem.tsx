import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../../separator";
import { Friend } from "@prisma/client";
import { useRouter } from "next/navigation";

type ChatListItemProps = {
  friend: Friend;
};

const ChatListItem = ({
  friend,
  isActive,
}: ChatListItemProps & { isActive: boolean }) => {
  const router = useRouter();
  const activeClass = isActive ? "bg-secondary/20" : "";
  return (
    <div
      className={`hover:bg-secondary/20 rounded-lg cursor-pointer ${activeClass}`}
      onClick={() => router.push(`/conversations/${friend.userId}`)}
    >
      <div className="ml-5 flex gap-5 w-full p-2">
        <Avatar>
          <AvatarImage src={friend.image ?? undefined} className="bg-auto" />
          <AvatarFallback>
            {friend.name
              .split(" ")
              .map((word: string) => word[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="w-full">
          <div className="flex justify-between items-center ">
            <p className="text-sm font-bold ">{friend.name}</p>
            {/* <p className="text-xs text-primary">{date}</p> */}
          </div>
          <div className="flex justify-between items-center">
            {/* <p className={`line-clamp-1 text-sm  ${unread ? "font-medium text-muted":"text-muted/70" }`}>
              {lastMessage}
            </p>
            <div className="flex gap-3 items-center ml-3">
              {unread ? <p className="bg-red-600 w-4 h-4 rounded-full text-xs text-white flex items-center justify-center">{unread}</p> : <></>}
              {pin ? <Pin className="rotate-45 h-4" /> : <></>}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
