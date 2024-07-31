import { getFriends } from "@/app/actions/friendsActions";
import ItemsList from "@/components/ui/conversations/left-side-section/ItemsList";
import React from "react";
import ConversationList from "@/components/ui/conversations/chat-section/ConversationList";

type Props = React.PropsWithChildren<{}>;

const ConversationsLayout = async ({ children }: Props) => {
  const friends = await getFriends();

  return (
    <>
      <ItemsList title={"Conversations"}>
        <ConversationList friends={friends} />
      </ItemsList>
      {children}
    </>
  );
};

export default ConversationsLayout;
