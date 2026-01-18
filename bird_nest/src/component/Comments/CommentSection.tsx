"use client";

import React, { useState, useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";
interface Comment {
  id: number;
  content: string;
  guestName: string | null;
  username: string | null;
  userId: number;
  blogId: number | null;
  productId: number | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface CommentSectionProps {
  blogId?: number;
  productId?: number;
}

function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Vừa xong";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function CommentSection({
  blogId,
  productId,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [guestName, setGuestName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showGuestNameInput, setShowGuestNameInput] = useState(false);
  const { user } = useUser();
  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (blogId) params.append("blogId", blogId.toString());
        if (productId) params.append("productId", productId.toString());

        const response = await fetch(`/api/comments?${params.toString()}`);
        const data = await response.json();
        console.log("data", data);
        if (data.error === 0) {
          setComments(data.comments || []);
        } else {
          setError(data.message || "Không thể tải bình luận");
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError("Không thể tải bình luận");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
    if (!user?.id) {
      setShowGuestNameInput(true);
    }
  }, [blogId, productId, user?.id]);

  // Handle comment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setError("Vui lòng nhập nội dung bình luận");
      return;
    }

    // If not logged in, require guest name
    if (!user?.id && !guestName.trim()) {
      setError("Vui lòng nhập tên của bạn");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId: blogId || null,
          productId: productId || null,
          userId: user?.id || null,
          guestName: user?.username || guestName.trim() || null,
          content: commentText.trim(),
        }),
      });

      const data = await response.json();

      if (data.error === 0) {
        // Add new comment to the list
        setComments([data.comment, ...comments]);
        setCommentText("");
        setGuestName("");
        setShowGuestNameInput(false);
        setError(null);
      } else {
        setError(data.message || "Không thể gửi bình luận");
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Không thể gửi bình luận. Vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 border-t border-[#e5e5e5] dark:border-zinc-800 pt-8">
      <div className="flex items-center gap-3 mb-6">
        <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-bold text-[#181611] dark:text-white">
          Bình luận{" "}
          <span className="text-lg font-normal text-gray-500">
            ({comments.length})
          </span>
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-[#e5e5e5] dark:border-zinc-800 p-6 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!user?.id && (
            <div className="mb-4">
              {!showGuestNameInput ? (
                <button
                  type="button"
                  onClick={() => setShowGuestNameInput(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Đăng nhập hoặc nhập tên để bình luận
                </button>
              ) : (
                <input
                  type="text"
                  placeholder="Tên của bạn *"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#e5e5e5] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[#181611] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              )}
            </div>
          )}

          <div className="mb-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Chia sẻ suy nghĩ của bạn..."
              rows={4}
              className="w-full p-4 bg-[#f8f7f6] dark:bg-zinc-800 border-none rounded-lg focus:ring-2 focus:ring-primary dark:text-white placeholder:text-gray-400 font-sans resize-none"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-primary hover:bg-[#d4a723] text-white font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              {submitting ? "Đang gửi..." : "Gửi bình luận"}
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-500">Đang tải bình luận...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-xl border border-[#e5e5e5] dark:border-zinc-800">
          <ChatBubbleLeftRightIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-[#e5e5e5] dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    {comment.guestName ? (
                      <span className="text-lg font-bold text-primary">
                        {comment.guestName.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <UserCircleIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-[#181611] dark:text-white">
                      {comment.guestName || "Khách"}
                    </h4>
                    {comment.userId && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Thành viên
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-[#181611] dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
