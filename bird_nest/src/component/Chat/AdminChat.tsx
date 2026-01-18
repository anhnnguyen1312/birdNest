"use client";
import { useEffect, useState } from "react";
import { database } from "@/FireBase/config";
import { ref, onValue } from "firebase/database";
import UserSearch from "@/component/Chat/UserSearch";
import { Button } from "@mui/material";
import CreateGroupModal from "@/component/Chat/CreateGroupModal";
import { UIConversationItem, User } from "@/types";
import ConversationCusTom from "@/component/Chat/Conversation";
import { useUser } from "@/context/UserContext";
import MessageBox from "@/component/Chat/MessageBox";

interface UserChatProps {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

const UserChat = () => {
  const data: User = {
    id: "",
    name: "",
    avatar: "",
    role: "",
  };
  //   const userData: User = {
  //     id: "",
  //     name: "",
  //     avatar: "",
  //   };
  const conver: UIConversationItem = {
    id: "",
    participantId: "",
    participantName: "",
    participantAvatar: "",
    lastMessage: "",
    lastTimestamp: 0,
  };
  const [openGroupModal, setOpenGroupModal] = useState<boolean>(false);
  const [otherUserData, setOtherUserData] = useState<User>(data);
  const [cond, setCond] = useState<UIConversationItem>(conver);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { user } = useUser();
  console.log("cond.id || otherUserData.id", cond.id, otherUserData.id);
  useEffect(() => {
    const usersRef = ref(database, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val() || {};
      console.log("data", data);

      const userList: User[] = Object.entries(data).map(([id, user]) => ({
        id,
        ...(user as Omit<User, "id">),
      }));

      setUsers(userList);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  console.log("usser ne", users);

  const handleSelectUser = (user: User) => {
    setOtherUserData(user);
    setCond(conver);
  };
  return (
    <>
      {user && user.role === "admin" && (
        <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white">
          {/* <div className="flex w-full" style={{ height: "calc(100vh - 64.67px)" }}> */}
          <div className="flex w-full h-[calc(100vh-64.67px)] overflow-hidden">
            {/* <!-- Sidebar - Cột trái --> */}
            <aside className="flex w-96 flex-col bg-white dark:bg-background-dark">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                    data-alt="Company logo for Yến Sào Cao Cấp"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDFpjLeZ7noVbG0qj-fcJFc_FtnfJiXmAKzV-haUgETT0gJok-VrH-HMBfYs27CUS54iM7KGsrWsKGRQ0v_e5MXyaCIC737bDnUi6yYqS3LP9kDJU8pb0mTeTpbFvp6ekAKENB5kCeyIgfnCsyWAxeFEP3EVvrnAaHk8rG9zqNom53o4C4LjlmNcbWXwX7zDWCmtzAcbzPdiQ7Sd7D0pCnm_g8GrIbYMSTKtTQlA3nDn9kT6XgQq0PzPSWg5Zjw56n7X6LaP4fLdaM")',
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <h1 className="text-text-main dark:text-white text-base font-bold leading-normal">
                      {user?.username}
                    </h1>
                    <p className="text-text-secondary dark:text-gray-400 text-sm font-normal leading-normal">
                      Hỗ trợ trực tuyến
                    </p>
                  </div>
                </div>
                <div className="search-chat flex p-1">
                  <input
                    className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md"
                    type="text"
                    placeholder="Search Messages"
                  />

                  <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex p-1 flex-col gap-2">
                  <UserSearch
                    users={users}
                    onSelectUser={handleSelectUser}
                    handleCond={setCond}
                  />
                  <Button
                    sx={{
                      display: "flex",
                      minWidth: "84px",
                      maxWidth: "480px",
                      cursor: "pointer",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      borderRadius: "8px",
                      height: "40px",
                      paddingX: "16px",
                      backgroundColor: "#d4af37",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "normal",
                      letterSpacing: "0.015em",
                      textTransform: "none", // ❗ bỏ uppercase mặc định của MUI
                      "&:hover": {
                        backgroundColor: " #c19f2f",
                      },
                    }}
                    variant="contained"
                    onClick={() => setOpenGroupModal(true)}
                  >
                    Tạo Nhóm
                  </Button>
                  {user?.id && (
                    <CreateGroupModal
                      open={openGroupModal}
                      onClose={() => setOpenGroupModal(false)}
                      users={users}
                      currentUser={user?.id}
                    />
                  )}
                </div>
              </div>
              {/* <!-- Chat List --> */}

              <div className="flex-1 overflow-y-auto min-h-0">
                {user?.id && (
                  <ConversationCusTom
                    currentUserId={user.id.toString()}
                    onSelect={setOtherUserData}
                    setCond={setCond}
                    condId={cond.id}
                  />
                )}
              </div>
            </aside>
            {/* <!-- Main Content - Cột phải --> */}
            {(cond.id || otherUserData.id) && user?.id && (
              <MessageBox
                currentUserId={user.id.toString()}
                currentUserName={user.username}
                otherUser={otherUserData}
                cond={cond}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserChat;
