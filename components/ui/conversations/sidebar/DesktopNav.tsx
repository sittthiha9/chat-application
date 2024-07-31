"use client";
import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../tooltip";
import ProfileSection from "@/components/ui/conversations/left-side-section/ProfileSection";
import { useQuery } from "@tanstack/react-query";

const fetchSession = async () => {
  const response = await fetch("/api/auth/session");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const DesktopNav = () => {
  const paths = useNavigation();

  const { data: session, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
  });

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-[calc(100vh-2rem)] lg:w-14">
      <div className="flex flex-col items-center gap-1">
        {paths.map((path, id) => (
          <div key={id} className="relative">
            <Link href={path.href}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="bg-gray-300/50 hover:bg-gray-300/40 p-2 rounded-lg">
                    {path.icon}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{path.name}</p>
                </TooltipContent>
              </Tooltip>
            </Link>
          </div>
        ))}
      </div>
      {isLoading ? <></> : <ProfileSection user={session?.user} />}
    </div>
  );
};

export default DesktopNav;
