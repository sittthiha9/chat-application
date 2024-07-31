import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useConversation = () => {
  const params = useParams();

  const userId = useMemo(
    () => params?.userId || "",
    [params?.userId]
  );

  const isActive = useMemo(() => !!userId, [userId]);

  return {
    isActive,
    userId,
  };
};
