"use client";
import { useEffect, useState } from "react";
import { database } from "@/FireBase/config";
import { ref, onValue } from "firebase/database";
import UserSearch from "@/component/Chat/UserSearch";
import { Button } from "@mui/material";
import CreateGroupModal from "@/component/Chat/CreateGroupModal";
import { UIConversationItem, User } from "@/types";
import ConversationCusTom from "@/component/Chat/Conversation";
import MessageBox from "@/component/Chat/MessageBox";

import { useUser } from "@/context/UserContext";

const UserChat = () => {
  const { user } = useUser();
  const userData: User = {
    id: "18",
    name: "Yến Sào Tinh Hoa",
    avatar: "",
    role: "user",
  };
  const conver: UIConversationItem = {
    id: "",
    participantId: "",
    participantName: "",
    participantAvatar: "",
    lastMessage: "",
    lastTimestamp: 0,
  };
  return (
    <>
      {user && user.role === "user" && (
        <MessageBox
          currentUserId={user.id.toString()}
          currentUserName={user.username}
          otherUser={userData}
          cond={conver}
          isUser={true}
        />
      )}
    </>
  );
};

export default UserChat;
