import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { useRouter } from "next/navigation";
import { handleSignOut } from "@/app/actions/signOutAction";
import { Session } from "next-auth";

type ProfileSectionProps = {
  user?: Session["user"];
};

const ProfileSection = ({ user }: ProfileSectionProps) => {
  const router = useRouter();
  const onSignOut = async () => {
    try {
      await handleSignOut();
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("An error occurred during sign out", error);
    }
  };
  return (
    <div className="flex gap-4 ml-5 items-center">
      <Avatar>
        <AvatarImage src={user?.image || ""} className="bg-auto" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-md font-semibold">{user?.name || ""}</p>
        <DropdownMenu>
          <DropdownMenuTrigger>Setting</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Setting</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProfileSection;
