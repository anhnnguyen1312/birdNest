"use client";
import { useEffect, useState } from "react";
import { database } from "@/FireBase/config";
import { ref, onValue, push, set, update, get } from "firebase/database";
import { useUser } from "@/context/UserContext";

import {
  ConversationType,
  Message,
  UIConversationItem,
  User,
  CustomOrderTypeFull,
} from "@/types";
import {
  BoltIcon,
  EllipsisVerticalIcon,
  FaceSmileIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

interface Props {
  currentUserId: string;
  otherUser: User;
  cond: UIConversationItem;
  currentUserName: string;
  isUser?: boolean;
}
const MessageBox = ({
  currentUserId,
  otherUser,
  cond,
  currentUserName,
  isUser,
}: Props) => {
  console.log("props", currentUserId, otherUser, cond, currentUserName);
  const formatTimestamp = (ts: number): string => {
    return new Date(ts).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  // const [converOtherId, setConverOtherId] = useState<string>('');
  const [orders, setOrders] = useState<CustomOrderTypeFull[]>([]);
  //        order=[...data.map((item) => item.toJSON() as CustomOrderTypeFull)]
  const { user } = useUser();

  console.log("messages", messages);
  const sortedIds = [currentUserId, otherUser.id].sort();
  const convoId = `${sortedIds[0]}_${sortedIds[1]}`;
  console.log("?", otherUser.id, cond.participantId);
  useEffect(() => {
    const fetchOrderUser = async () => {
      const res = await fetch(
        `http://localhost:3000/api/orders/user/${
          otherUser.id || cond.participantId
        }`
      );
      const data = await res.json();
      console.log("data order user", data);
      if (data.error === 0 && data.order?.length > 0) {
        console.log("data.order", data.order);

        setOrders(data.order);
      } else {
        setOrders([]);
      }
    };
    fetchOrderUser();
  }, [otherUser.id, cond.participantId]);
  console.log("orders", orders);

  useEffect(() => {
    console.log("useEffect");

    if (cond.id) {
      console.log("cond.id", cond.id);

      const messagesRef = ref(database, `messages/${cond.id}`);

      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const list = Object.values(data) as Message[];
          list.sort((a, b) => a.timestamp - b.timestamp);

          setMessages(list);
        } else {
          setMessages([]);
        }
      });

      return () => unsubscribe();
    } else if (otherUser.id) {
      console.log("other", otherUser);

      const messagesRef = ref(database, `messages/${convoId}`);

      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const list = Object.values(data) as Message[];
          list.sort((a, b) => a.timestamp - b.timestamp);
          setMessages(list);
        } else {
          setMessages([]);
        }
      });

      return () => unsubscribe();
    }
  }, [cond.id, otherUser.id]);
  const sendMessage = async () => {
    if (!text.trim()) return;
    const timestamp = Date.now();
    const newMessage: Message = {
      senderId: currentUserId,
      senderName: currentUserName,
      senderAvatar: "",
      text,
      timestamp,
    };
    if (cond.id) {
      const msgRef = ref(database, `messages/${cond.id}`);
      const newMsgRef = push(msgRef);
      await set(newMsgRef, newMessage);

      const convoRef = ref(database, `conversations/${cond.id}`);
      const convoSnapshot = await get(convoRef);
      const oldConvoData = convoSnapshot.val();

      // Tạo object cập nhật, giữ nguyên dữ liệu cũ, cập nhật lastMessage và lastTimestamp
      const updatedConvo = {
        ...oldConvoData,
        lastMessage: text,
        lastTimestamp: timestamp,
      };

      await set(convoRef, updatedConvo);

      setText("");
    } else if (otherUser.id) {
      if (convoId) {
        const convoRef = ref(database, `conversations/${convoId}`);
        const convoSnap = await get(convoRef);
        console.log(" convoSnap", convoSnap);

        if (!convoSnap.exists()) {
          // Tạo conversation mới
          console.log("check conver create convoSnap", convoSnap);
          const newConvo: ConversationType = {
            type: "private",
            members: sortedIds,
            lastMessage: text,
            lastTimestamp: timestamp,
          };

          await update(ref(database, `conversations/${convoId}`), newConvo);
          // setConverOtherId(convoId);
        }
      }

      const messagesRef = ref(database, `messages/${convoId}`);
      await push(messagesRef, newMessage);

      // Cập nhật lại lastMessage và lastTimestamp trong conversations
      await update(ref(database, `conversations/${convoId}`), {
        lastMessage: text,
        lastTimestamp: timestamp,
      });
      setText("");
      console.log("Message sent successfully!");
    }
  };
  return (
    <main className="flex flex-1 flex-col h-full min-h-0 bg-[#f8f7f6] bg-background-light-chat dark:bg-background-dark-chat">
      {/* <!-- Chat Header --> */}
      <header className="flex h-[73px] items-center justify-between  px-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
              data-alt="Avatar for Nguyễn Văn A"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_ADMIN_LOGO_URL})`,
              }}
            ></div>
            <div className="absolute bottom-0 right-0 size-3 rounded-full bg-[#078812] border-2 border-background-light dark:border-background-dark"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-text-main dark:text-white">
              {otherUser.name || cond.participantName}
            </h2>
            <p className="text-sm text-green-600 dark:text-green-400">
              Đang hoạt động
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-text-secondary dark:text-gray-300 rounded-lg hover:bg-surface dark:hover:bg-primary-darker/20">
            <MagnifyingGlassIcon className=" w-5 h-5 text-[#887D5E]" />
          </button>

          <button className="p-2 text-text-secondary dark:text-gray-300 rounded-lg hover:bg-surface dark:hover:bg-primary-darker/20">
            <PhoneIcon className=" w-5 h-5 text-[#887D5E]" />
          </button>
          <button className="p-2 text-text-secondary dark:text-gray-300 rounded-lg hover:bg-surface dark:hover:bg-primary-darker/20">
            <EllipsisVerticalIcon className=" w-5 h-5 text-[#887D5E]" />
          </button>
        </div>
      </header>
      {/* <!-- Chat Area --> */}
      <div className="flex flex-1 min-h-0">
        {/* <!-- Chat Bubbles --> */}
        <div className="flex flex-1 flex-col p-6 overflow-y-auto min-h-0">
          <div className="flex flex-col gap-4">
            <div className="text-center text-xs text-text-secondary dark:text-gray-400 my-4">
              {messages.length > 0
                ? `Cuộc trò chuyện bắt đầu lúc ${formatTimestamp(
                    messages[0].timestamp
                  )}`
                : "Chưa có tin nhắn nào"}
            </div>

            {messages.map((msg, idx) => {
              const isMine = msg.senderId === currentUserId;

              if (isMine) {
                return (
                  <div
                    key={idx}
                    className="flex items-end gap-2 max-w-lg self-end"
                  >
                    <div className="rounded-lg rounded-br-none bg-primary text-text-main p-3">
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs text-right text-text-main/70 mt-1">
                        {formatTimestamp(msg.timestamp)}
                      </p>
                    </div>
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0"
                      data-alt="Company avatar"
                      style={{
                        backgroundImage: `url(${
                          user?.role === "admin"
                            ? process.env.NEXT_PUBLIC_ADMIN_LOGO_URL
                            : process.env.NEXT_PUBLIC_USER_LOGO_URL
                        })`,
                      }}
                    ></div>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className="  flex items-end gap-2 max-w-lg ">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0"
                      data-alt="Avatar for Nguyễn Văn A"
                      style={{
                        backgroundImage: `url(${
                          user?.role === "admin"
                            ? process.env.NEXT_PUBLIC_USER_LOGO_URL
                            : process.env.NEXT_PUBLIC_ADMIN_LOGO_URL
                        })`,
                      }}
                    ></div>

                    <div className="rounded-lg bg-white rounded-bl-none bg-surface dark:bg-primary-darker/20 p-3">
                      <p className="text-sm text-text-main dark:text-white">
                        {msg.senderName}
                      </p>
                      <p className="text-sm">{msg.text}</p>

                      <p className="text-xs text-right text-text-secondary dark:text-gray-400 mt-1">
                        {formatTimestamp(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
            {/* <!-- Typing Indicator --> */}
            {/* <div className="flex items-end gap-2 max-w-lg">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0"
                data-alt="Avatar for Nguyễn Văn A"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFin9_k6ZBRlJaM8I_nSTLv4FCMOiXvkjcPtzDiL9rf6A1QBPnwDC5FHjNBlxnaCuWQdbTYdFPQTeVbDdR2tUy13G16JViVcxsABx46xUbVhVR4jF7WHN3psIKD5X5fsZQX-ks9PmFvSLsfvR6jPFf3eQoFYB1JgWSuxZqt2zrMRixZS8o4pbmJDZIWCSSJjS98h_638F5ljeTxyZ9W_nT2VIkwtAsE9v6wT_et4k6xIf4RmoSclVhVayuU7MGlI8FDoI6AhzztHA")',
                }}
              ></div>
              <div className="rounded-lg rounded-bl-none bg-surface dark:bg-primary-darker/20 p-3 flex items-center gap-1">
                <span className="size-2 bg-text-secondary dark:bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                <span className="size-2 bg-text-secondary dark:bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                <span className="size-2 bg-text-secondary dark:bg-gray-400 rounded-full animate-pulse"></span>
              </div>
            </div> */}
          </div>
        </div>
        {/* <!-- Customer Info Panel --> */}
        <aside className="  overflow-y-auto min-h-0 w-80  p-6 flex-col gap-6 hidden lg:flex border-l border-[#e6d3b3] dark:border-primary-darker">
          <div className="text-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 mx-auto"
              data-alt="Avatar for Nguyễn Văn A"
              style={{
                backgroundImage: `url(${
                  user?.role === "admin"
                    ? process.env.NEXT_PUBLIC_USER_LOGO_URL
                    : process.env.NEXT_PUBLIC_ADMIN_LOGO_URL
                })`,
              }}
            ></div>
            <h3 className="text-lg font-bold mt-4 text-text-main dark:text-white">
              {otherUser.name || cond.participantName}
            </h3>
            <p className="text-sm text-text-secondary dark:text-gray-400">
              {/* {otherUser.email} */}
            </p>
          </div>
          {user?.role === "admin" && (
            <div className=" pt-4">
              <h4 className="font-bold text-sm mb-2 text-text-main dark:text-white">
                Lịch sử mua hàng
              </h4>
              <p className="text-sm text-text-secondary dark:text-gray-400">
                {orders.length > 0
                  ? `Đã mua ${orders.length} đơn hàng`
                  : "Chưa có đơn hàng"}
              </p>
            </div>
          )}
          {user?.role === "user" && (
            <div className="pt-4 bg-[#fff8e1] dark:bg-[#2d2d2d] rounded-xl shadow p-4 flex flex-col items-center gap-3 border border-[#ffe0b2] dark:border-primary-darker">
              <img
                src={`${process.env.NEXT_PUBLIC_ADMIN_LOGO_URL}`}
                alt="Yến Sào Tinh Hoa"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#d4af37] shadow"
                loading="lazy"
              />
              <h4 className="font-bold text-base mt-2 text-text-main dark:text-white text-center">
                Yến Sào Tinh Hoa
              </h4>
              <p className="text-sm text-text-secondary dark:text-gray-300 text-center">
                Web chat hỗ trợ khách hàng với sứ mệnh mang đến yến sào nguyên
                chất và dịch vụ chăm sóc tận tâm.
              </p>
              <ul className="mt-2 w-full flex flex-col gap-1 text-xs text-text-secondary dark:text-gray-400">
                <li>
                  <span className="font-semibold text-primary dark:text-yellow-200">
                    ✔
                  </span>{" "}
                  Chất lượng 100% yến sào nguyên chất
                </li>
                <li>
                  <span className="font-semibold text-primary dark:text-yellow-200">
                    ✔
                  </span>{" "}
                  Đội ngũ tư vấn thân thiện, chuyên nghiệp
                </li>
                <li>
                  <span className="font-semibold text-primary dark:text-yellow-200">
                    ✔
                  </span>{" "}
                  Phục vụ 24/7 &amp; giao hàng toàn quốc
                </li>
              </ul>
              <div className="mt-3 w-full flex flex-col gap-2">
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-xs text-white bg-[#17a94b] hover:bg-[#128138] rounded-md px-4 py-1 font-semibold transition"
                  title="Liên hệ Zalo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 40 40"
                  >
                    <circle cx="20" cy="20" r="20" fill="#fff" />
                    <text
                      x="10"
                      y="28"
                      fontSize="14"
                      fill="#17a94b"
                      fontWeight="bold"
                    >
                      Zalo
                    </text>
                  </svg>
                  Chat với chúng tôi qua Zalo
                </a>
                <a
                  href="mailto:support@yensaotinhhoa.vn"
                  className="flex items-center justify-center gap-2 text-xs bg-[#d4af37] hover:bg-[#b39329] text-white rounded-md px-4 py-1 font-semibold transition"
                  title="Gửi email"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l9 6 9-6" />
                    <rect
                      x="3"
                      y="6"
                      width="18"
                      height="12"
                      rx="2"
                      stroke="none"
                    />
                  </svg>
                  Email: support@yensaotinhhoa.vn
                </a>
              </div>
            </div>
          )}

          {user?.role === "admin" && orders.length > 0 ? (
            <div className=" pt-4">
              <h4 className="font-bold text-sm mb-3 text-text-main dark:text-white">
                Đơn hàng gần đây
              </h4>
              {orders &&
                orders.length > 0 &&
                orders.map((order: CustomOrderTypeFull, id) => (
                  <div
                    key={id}
                    className="flex flex-col gap-2 mb-3 p-3 border border-[#e6d3b3] dark:border-primary-darker rounded-lg hover:bg-surface dark:hover:bg-primary-darker/20"
                  >
                    <a
                      className="text-sm text-primary dark:text-primary hover:underline"
                      href="#"
                    >
                      Đơn hàng #{order.id} - {order.totalQuantity} sản phẩm -
                      Tổng tiền: {order?.totalPrice?.toLocaleString("vi-VN")}đ
                    </a>
                    <p className="text-sm text-text-secondary dark:text-gray-400">
                      Sản phẩm
                    </p>
                    {order.OrderItems &&
                      order.OrderItems.length > 0 &&
                      order.OrderItems.map((item) => (
                        <div key={item.id}>
                          <p className="text-sm text-text-secondary dark:text-gray-400">
                            {item.product.name} X {item.quantity} -{" "}
                            {item?.total?.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                      ))}
                    <p className="text-sm text-text-secondary dark:text-gray-400">
                      Trạng thái: {order.status}
                    </p>
                    <p className="text-sm text-text-secondary dark:text-gray-400">
                      Ngày đặt:{" "}
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                ))}
            </div>
          ) : null}
        </aside>
      </div>
      {/* <!-- Input Area --> */}
      <footer className=" px-2 pt-2 bg-[#f8f7f6] dark:bg-background-dark/50 shrink-0">
        <div className=" bg-white flex items-center gap-4 bg-surface dark:bg-primary-darker/20 rounded-lg pl-2">
          <button className="p-1 text-text-secondary dark:text-gray-300 rounded-lg hover:bg-white/50 dark:hover:bg-primary-darker/30">
            <FaceSmileIcon className=" w-5 h-5 text-[#887D5E]  text-[#887D5E]" />
          </button>
          <button className="p-1 text-text-secondary dark:text-gray-300 rounded-lg hover:bg-white/50 dark:hover:bg-primary-darker/30">
            <PaperClipIcon className=" w-5 h-5 text-[#887D5E]  " />
          </button>
          <button className="p-1 text-text-secondary dark:text-gray-300 rounded-lg hover:bg-white/50 dark:hover:bg-primary-darker/30">
            <BoltIcon className=" w-5 h-5 text-[#887D5E]  " />
          </button>
          <input
            className="flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder:text-text-secondary dark:placeholder:text-gray-400"
            placeholder="Nhập tin nhắn của bạn..."
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            className="p-2 text-text-main bg-primary rounded-lg"
            onClick={sendMessage}
          >
            <PaperAirplaneIcon className=" w-5 h-5 text-[#887D5E]  " />
          </button>
        </div>
      </footer>
    </main>
  );
};

export default MessageBox;
