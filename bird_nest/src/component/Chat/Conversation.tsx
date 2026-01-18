"use client";
import ConversationItem from "./ConversationItem";
import { useEffect, useState } from "react";
import { database } from "@/FireBase/config";
import { ref, onValue, get } from "firebase/database";

import {
  ConversationType,
  ConversationWithId,
  UIConversationItem,
  User,
} from "@/types";

interface Props {
  currentUserId: string;
  // onSelect: (id: string) => void;
  condId: string;
  setCond: (cond: UIConversationItem) => void;
}
const data: User = {
  id: "",
  name: "",
  avatar: "",
  role: "",
};
const ConversationCusTom = ({
  currentUserId,
  //onSelect,
  setCond,
  condId,
}: Props) => {
  const [conversations, setConversations] = useState<UIConversationItem[]>([]);
  console.log("conversations", conversations);
  useEffect(() => {
    try {
      const convRef = ref(database, "conversations");

      const unsubscribe = onValue(convRef, async (snapshot) => {
        const data = snapshot.val();

        if (data) {
          console.log("data conver", data);

          const list: ConversationWithId[] = Object.entries(data)
            .map(([id, value]) => ({
              id,
              ...(value as ConversationType),
            }))
            .filter((convo) => convo?.members?.includes(currentUserId));
          // Lọc theo user hiện tại
          console.log(" list conversations with currentUserId ", list);

          const userSnap = await get(ref(database, "users"));
          const usersData = userSnap.val() || {};

          const result: UIConversationItem[] = list.map((conv) => {
            if (conv.type === "group") {
              return {
                id: conv.id,
                participantId: conv.id,
                participantName: conv.groupName || "Group",
                participantAvatar: "group_default.png", // nếu có
                lastMessage: conv.lastMessage,
                lastTimestamp: conv.lastTimestamp,
              };
            } else {
              // private chat: tìm user còn lại
              const participantId = conv.members.find(
                (id) => id !== currentUserId
              )!;
              const participant = usersData[participantId];

              return {
                id: conv.id,
                participantId,
                participantName: participant?.name || "Unknown",
                participantAvatar: participant?.avatar || "",
                lastMessage: conv.lastMessage,
                lastTimestamp: conv.lastTimestamp,
              };
            }
          });
          result.sort((a, b) => b.lastTimestamp - a.lastTimestamp);

          setConversations(result);
        } else {
          setConversations([]);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [currentUserId]);

  const handleSelect = (cond: UIConversationItem) => {
    setCond(cond);
    //onSelect(data);
  };
  return (
    <div className="p-1">
      {conversations.map((item, index) => (
        <ConversationItem
          item={item}
          key={index}
          handleSelect={handleSelect}
          condId={condId}
        />
      ))}
    </div>
  );
};

export default ConversationCusTom;
