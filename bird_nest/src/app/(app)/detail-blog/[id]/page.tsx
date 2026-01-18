"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import CommentSection from "@/component/Comments/CommentSection";

interface BlogDetail {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  markdown: string;
  excerpt: string;
  category: string;
  tags: string[] | null;
  imageUrl: string | null;
  author: string;
  publishedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  readingTime?: number;
}

function formatDate(dateString: string | Date | null): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day} Tháng ${month}, ${year}`;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default function DetailBlogPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogDetail[]>([]);

  // Fetch blog by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/blog/${id}`);
        const data = await response.json();

        if (data.error === 0 && data.blog) {
          const blogData = data.blog as BlogDetail;
          // Calculate reading time from markdown or content
          const content = blogData.markdown || blogData.content || "";
          blogData.readingTime = calculateReadingTime(content);
          setBlog(blogData);

          // Fetch related blogs (same category)
          if (blogData.category) {
            fetchRelatedBlogs(blogData.category, blogData.id);
          }
        } else {
          setError(data.message || "Không tìm thấy bài viết");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Không thể tải bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  // Fetch related blogs
  const fetchRelatedBlogs = async (category: string, excludeId: number) => {
    try {
      const response = await fetch("/api/blog/all_blog");
      const data = await response.json();

      if (data.error === 0 && Array.isArray(data.blogs)) {
        const related = data.blogs
          .filter(
            (b: BlogDetail) =>
              b.category === category && b.id !== excludeId && b.publishedAt
          )
          .slice(0, 3);
        setRelatedBlogs(related);
      }
    } catch (err) {
      console.error("Error fetching related blogs:", err);
    }
  };

  // Handle share
  const handleShare = (platform: "facebook" | "twitter" | "pinterest") => {
    if (!blog) return;

    const url = window.location.href;
    const title = blog.title;
    const text = blog.excerpt;

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          url
        )}&description=${encodeURIComponent(text)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  if (loading) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-[#181611] dark:text-[#f4f3f0] font-display antialiased min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-[#897f61] dark:text-gray-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-[#181611] dark:text-[#f4f3f0] font-display antialiased min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || "Không tìm thấy bài viết"}
          </p>
          <button
            onClick={() => router.push("/blog")}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#d4a723] transition-colors"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#181611] dark:text-[#f4f3f0] font-display antialiased selection:bg-primary/30">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Main Content */}
        <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumbs */}
          <nav className="flex mb-8 text-sm text-[#897f61] dark:text-gray-400">
            <Link className="hover:text-primary transition-colors" href="/">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <Link className="hover:text-primary transition-colors" href="/blog">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#181611] dark:text-white font-medium">
              {blog.category}
            </span>
          </nav>

          {/* Article Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
              {blog.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[#181611] dark:text-white mb-6">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-[#897f61] dark:text-gray-400 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  person
                </span>
                <span>{blog.author}</span>
              </div>
              {blog.publishedAt && (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    calendar_today
                  </span>
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>
              )}
              {blog.readingTime && (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    schedule
                  </span>
                  <span>{blog.readingTime} phút đọc</span>
                </div>
              )}
            </div>
          </header>

          {/* Hero Image */}
          {blog.imageUrl && (
            <div className="w-full mb-12 overflow-hidden rounded-xl shadow-sm aspect-video md:aspect-[21/9]">
              <div
                className="w-full h-full bg-cover bg-center transition-transform hover:scale-105 duration-700 ease-out"
                style={{
                  backgroundImage: `url(${blog.imageUrl})`,
                }}
              ></div>
            </div>
          )}

          {/* Article Body */}
          <article
            className="prose prose-lg md:prose-xl prose-stone dark:prose-invert mx-auto font-display text-[#181611] dark:text-[#d4d4d4]"
            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
          />

          {/* Tags & Share */}
          <div className="border-t border-b border-[#e5e5e5] dark:border-zinc-800 py-6 my-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
              <span className="text-sm font-bold text-[#181611] dark:text-white mr-2">
                Tags:
              </span>
              {blog.tags && blog.tags.length > 0 ? (
                blog.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blog?search=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-[#f4f3f0] dark:bg-zinc-800 text-sm text-[#5c5c5c] dark:text-gray-300 rounded hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    #{tag}
                  </Link>
                ))
              ) : (
                <span className="text-sm text-gray-500">Chưa có tags</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#181611] dark:text-white mr-2">
                Chia sẻ:
              </span>
              <button
                onClick={() => handleShare("facebook")}
                className="size-8 flex items-center justify-center rounded-full bg-[#f4f3f0] dark:bg-zinc-800 hover:bg-[#3b5998] hover:text-white transition-colors"
                title="Chia sẻ lên Facebook"
              >
                <span className="text-sm font-sans font-bold">f</span>
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="size-8 flex items-center justify-center rounded-full bg-[#f4f3f0] dark:bg-zinc-800 hover:bg-[#1da1f2] hover:text-white transition-colors"
                title="Chia sẻ lên Twitter"
              >
                <span className="text-sm font-sans font-bold">tw</span>
              </button>
              <button
                onClick={() => handleShare("pinterest")}
                className="size-8 flex items-center justify-center rounded-full bg-[#f4f3f0] dark:bg-zinc-800 hover:bg-red-600 hover:text-white transition-colors"
                title="Chia sẻ lên Pinterest"
              >
                <span className="text-sm font-sans font-bold">p</span>
              </button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="flex items-start gap-4 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-[#e5e5e5] dark:border-zinc-800 mb-12">
            <div className="size-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {blog.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#181611] dark:text-white">
                {blog.author}
              </h4>
              <p className="text-xs text-primary font-bold uppercase tracking-wide mb-2">
                Tác giả
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chia sẻ kiến thức và kinh nghiệm về yến sào và dinh dưỡng.
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection blogId={blog.id} />
        </main>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="bg-[#f4f3f0] dark:bg-[#1a160d] py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#181611] dark:text-white">
                  Bài viết liên quan
                </h3>
                <Link
                  href="/blog"
                  className="text-primary font-medium hover:underline flex items-center gap-1"
                >
                  Xem tất cả{" "}
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/detail-blog/${relatedBlog.id}`}
                    className="group cursor-pointer"
                  >
                    <article>
                      <div className="overflow-hidden rounded-lg mb-4 aspect-[4/3]">
                        {relatedBlog.imageUrl ? (
                          <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                              backgroundImage: `url(${relatedBlog.imageUrl})`,
                            }}
                          ></div>
                        ) : (
                          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-primary mb-2 uppercase">
                          {relatedBlog.category}
                        </span>
                        <h4 className="text-lg font-bold text-[#181611] dark:text-white mb-2 group-hover:text-primary transition-colors">
                          {relatedBlog.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                          {relatedBlog.excerpt}
                        </p>
                        {relatedBlog.publishedAt && (
                          <span className="text-xs text-gray-400">
                            {formatDate(relatedBlog.publishedAt)}
                          </span>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
