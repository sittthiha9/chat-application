"use client";
import { useRouter } from "next/navigation";
import { handleSignOut } from "@/app/actions/signOutAction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";

interface ConversationsClientProps {
  user: Session["user"];
}

const ConversationsClient: React.FC<ConversationsClientProps> = ({ user }) => {
  console.log("🚀 ~ session:", user);
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
    <div>
      <h3>Name: {user?.name} </h3>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
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

export default ConversationsClient;
