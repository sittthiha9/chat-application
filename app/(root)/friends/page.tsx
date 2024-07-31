import { getFriends } from "@/app/actions/friendsActions";
import FriendList from "@/components/ui/conversations/left-side-section/FriendList";
import ItemsList from "@/components/ui/conversations/left-side-section/ItemsList";
import React from "react";

const FriendsPage = async () => {
  const friends = await getFriends();
  return (
    <ItemsList title={"Friends"}>
      <FriendList friends={friends} />
    </ItemsList>
  );
};

export default FriendsPage;
