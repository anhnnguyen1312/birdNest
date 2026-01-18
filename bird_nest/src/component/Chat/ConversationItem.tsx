"use client";

import { UIConversationItem } from "@/types";
type TypeProps = {
  item: UIConversationItem;
  condId: string;
  handleSelect: (cond: UIConversationItem) => void;
};

const ConversationItem = ({ item, condId, handleSelect }: TypeProps) => {
  const formatTimestamp = (ts: number): string => {
    return new Date(ts).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div>
      {/* <div
        onClick={() => handleSelect(item)}
        className={
          " bg-white conversation-item p-1 dark:bg-gray-700 hover:bg-gray-200 m-1 rounded-md "
        }
      >
        <div className={"flex items-center p-2  cursor-pointer "}>
          <div className="w-7 h-7 m-1">
            <img
              className="rounded-full"
              src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
              alt="avatar"
            />
          </div>
          <div className="flex-grow p-2">
            <div className="flex justify-between text-md ">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {item.participantName}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400  w-40 truncate">
              {item.lastMessage}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-300">
              {formatTimestamp(item.lastTimestamp)}
            </div>
          </div>
        </div>
      </div> */}
      <div
        onClick={() => handleSelect(item)}
        className={
          item.id === condId
            ? "flex items-center gap-4 bg-primary/20 dark:bg-primary/30 px-4 min-h-[72px] py-2 justify-between"
            : "flex items-center gap-4 bg-transparent hover:bg-surface dark:hover:bg-primary-darker/10 px-4 min-h-[72px] py-2 justify-between cursor-pointer"
        }
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
              data-alt="Avatar for Nguyễn Văn A"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB10JSODzCmKWIVCQqBnAK_oFFkuU_hRkh6U_A_XuO2db3YhoPhDUfJzvvbCwHeXXOP4FMFbH2BU8GpWiGmKmYtdASAlG_t43W9DRvM7bheqHYfpqGOsRxSBQ95lBNphYzXcsCnrIqrNMgmk7Dwfm-VNhI7bJYwPTfN86_1cOzMuczGakZS8ve4Ah1lNBYyeIqavzHMb1E9XioqRfqFCMfLoT6cBROcdyl50YEqkPpCklGxp9Y1ABafkXOEpx2NFY4KY3ptAlq01MQ")',
              }}
            ></div>
            <div className="absolute bottom-0 right-0 size-3 rounded-full bg-[#078812] border-2 border-primary/20 dark:border-primary/30"></div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-text-main dark:text-white text-base font-medium leading-normal line-clamp-1">
              {item.participantName}
            </p>
            <p className="text-text-main dark:text-white text-sm font-bold leading-normal line-clamp-2">
              {item.lastMessage}
            </p>
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1">
          <p className="text-text-secondary dark:text-gray-400 text-xs font-normal leading-normal">
            {formatTimestamp(item.lastTimestamp)}
          </p>
          <div className="flex size-5 items-center justify-center rounded-full bg-primary text-text-main text-xs font-bold">
            1
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
