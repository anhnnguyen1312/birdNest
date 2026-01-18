"use client";
import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowUpOnSquareIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import MDEditor from "@uiw/react-md-editor";

const CATEGORIES = [
  "Kiến thức yến sào",
  "Cách chế biến",
  "Sức khỏe & Làm đẹp",
  "Khuyến mãi",
  "Tin tức công ty",
];

export default function CreateBlog() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle image upload
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Vui lòng chọn file ảnh hợp lệ");
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Kích thước ảnh không được vượt quá 5MB");
        return;
      }

      setFeaturedImage(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Kích thước ảnh không được vượt quá 5MB");
        return;
      }

      setFeaturedImage(file);
      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setFeaturedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle tag input
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedTag = tagInput.trim();
      if (trimmedTag && !tags.includes(trimmedTag)) {
        setTags([...tags, trimmedTag]);
        setTagInput("");
      }
    }
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent, status: "draft" | "published") => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!title.trim()) {
      setError("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    if (!markdown.trim()) {
      setError("Vui lòng nhập nội dung bài viết");
      return;
    }

    if (!excerpt.trim()) {
      setError("Vui lòng nhập tóm tắt bài viết");
      return;
    }

    if (!selectedCategory) {
      setError("Vui lòng chọn chuyên mục");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("markdown", markdown.trim());
      formData.append("excerpt", excerpt.trim());
      formData.append("category", selectedCategory);
      formData.append("tags", JSON.stringify(tags));
      formData.append("author", "Yến Tinh Hoa");
      formData.append("status", status);

      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }
      console.log("formData", formData);
      const response = await fetch("/api/blog/create-blog", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error === 0) {
        setSuccess(data.message);
        // Redirect to blog list after 2 seconds
        setTimeout(() => {
          router.push("/blog");
        }, 2000);
      } else {
        setError(data.message || "Có lỗi xảy ra khi tạo bài viết");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#181611] dark:text-white overflow-x-hidden min-h-screen flex flex-col">
      {/* Header / Breadcrumbs */}
      <div className="w-full bg-white dark:bg-[#1e1a11] border-b border-[#e6e3db] dark:border-[#3a3425]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 items-center">
              <a
                className="text-[#897f61] dark:text-[#a39b85] text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                Dashboard
              </a>
              <span className="text-[#897f61] dark:text-[#a39b85] text-sm font-medium">
                /
              </span>
              <a
                className="text-[#897f61] dark:text-[#a39b85] text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                Blog
              </a>
              <span className="text-[#897f61] dark:text-[#a39b85] text-sm font-medium">
                /
              </span>
              <span className="text-[#181611] dark:text-white text-sm font-bold">
                Viết bài mới
              </span>
            </div>
            {/* Page Heading & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-[#181611] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                  Viết bài mới
                </h1>
                <p className="text-[#897f61] dark:text-[#a39b85] text-base font-normal">
                  Tạo nội dung bài viết về sản phẩm và công dụng yến sào
                </p>
              </div>
              <button
                onClick={() => router.push("/blog")}
                className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f4f3f0] dark:bg-[#3a3425] hover:bg-[#e6e3db] dark:hover:bg-[#4a4330] text-[#181611] dark:text-white text-sm font-bold transition-colors border border-transparent dark:border-[#4a4330]"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="truncate">Quay lại danh sách</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error/Success Messages */}
      {(error || success) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg mb-4">
              {success}
            </div>
          )}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <form
          onSubmit={(e) => handleSubmit(e, "published")}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        >
          {/* Left Column: Editor (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Title Input */}
            <div className="bg-white dark:bg-[#1e1a11] rounded-xl border border-[#e6e3db] dark:border-[#3a3425] p-6 shadow-sm">
              <label className="flex flex-col w-full">
                <p className="text-[#181611] dark:text-white text-lg font-bold pb-3">
                  Tiêu đề bài viết
                </p>
                <input
                  className="w-full rounded-lg text-[#181611] dark:text-white dark:bg-[#2c2618] focus:outline-0 focus:ring-2 focus:ring-primary border border-[#e6e3db] dark:border-[#3a3425] h-14 placeholder:text-[#897f61] dark:placeholder:text-[#6b634d] px-4 text-lg font-medium"
                  placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
            </div>

            {/* Rich Text Editor */}
            <div className="bg-white dark:bg-[#1e1a11] rounded-xl border border-[#e6e3db] dark:border-[#3a3425] shadow-sm flex flex-col overflow-hidden">
              <div className="p-4">
                <MDEditor
                  preview="live"
                  height={500}
                  value={markdown}
                  onChange={(val) => setMarkdown(val ?? "")}
                  data-color-mode="light"
                />
              </div>
            </div>

            {/* Excerpt Input */}
            <div className="bg-white dark:bg-[#1e1a11] rounded-xl border border-[#e6e3db] dark:border-[#3a3425] p-6 shadow-sm">
              <label className="flex flex-col w-full">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-[#181611] dark:text-white text-lg font-bold">
                    Tóm tắt (Excerpt)
                  </p>
                  <span className="text-xs text-[#897f61] dark:text-[#a39b85]">
                    Tốt cho SEO
                  </span>
                </div>
                <textarea
                  className="w-full rounded-lg text-[#181611] dark:text-white dark:bg-[#2c2618] focus:outline-0 focus:ring-2 focus:ring-primary border border-[#e6e3db] dark:border-[#3a3425] h-28 placeholder:text-[#897f61] dark:placeholder:text-[#6b634d] p-4 text-base resize-none"
                  placeholder="Nhập đoạn tóm tắt ngắn gọn cho bài viết..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>

          {/* Right Column: Sidebar (Span 1) */}
          <div className="flex flex-col gap-6">
            {/* Publish Card */}
            <div className="bg-white dark:bg-[#1e1a11] rounded-xl border border-[#e6e3db] dark:border-[#3a3425] p-5 shadow-sm">
              <h3 className="text-[#181611] dark:text-white text-lg font-bold mb-4 border-b border-[#e6e3db] dark:border-[#3a3425] pb-2">
                Đăng bài
              </h3>
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#897f61] dark:text-[#a39b85]">
                    Trạng thái:
                  </span>
                  <span className="font-bold text-[#181611] dark:text-white bg-gray-100 dark:bg-[#2c2618] px-2 py-1 rounded">
                    {selectedCategory ? "Sẵn sàng" : "Bản nháp"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#897f61] dark:text-[#a39b85]">
                    Hiển thị:
                  </span>
                  <span className="font-bold text-[#181611] dark:text-white">
                    Công khai
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#897f61] dark:text-[#a39b85]">
                    Lịch đăng:
                  </span>
                  <span className="font-bold text-[#181611] dark:text-white">
                    Ngay lập tức
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "draft")}
                  disabled={isSubmitting}
                  className="w-full h-10 rounded-lg border border-[#e6e3db] dark:border-[#4a4330] bg-white dark:bg-[#2c2618] text-[#181611] dark:text-white font-bold text-sm hover:bg-gray-50 dark:hover:bg-[#3a3425] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu nháp"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-10 rounded-lg bg-primary hover:bg-[#d4a723] text-[#181611] font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowUpOnSquareIcon className="w-5 h-5" />
                  {isSubmitting ? "Đang đăng..." : "Xuất bản"}
                </button>
              </div>
            </div>

            {/* Categories Card */}
            <div className="bg-white dark:bg-[#1e1a11] rounded-xl border border-[#e6e3db] dark:border-[#3a3425] p-5 shadow-sm">
              <h3 className="text-[#181611] dark:text-white text-lg font-bold mb-4 border-b border-[#e6e3db] dark:border-[#3a3425] pb-2">
                Chuyên mục
              </h3>
              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
                {CATEGORIES.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary dark:bg-[#2c2618] dark:border-[#4a4330]"
                      type="radio"
                      name="category"
                    />
                    <span className="text-[#181611] dark:text-white text-sm group-hover:text-primary transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Featured Image Card */}
            <div className="bg-white dark:bg-[#1e1a11] rounded-xl border border-[#e6e3db] dark:border-[#3a3425] p-5 shadow-sm">
              <h3 className="text-[#181611] dark:text-white text-lg font-bold mb-4 border-b border-[#e6e3db] dark:border-[#3a3425] pb-2">
                Ảnh đại diện
              </h3>
              {!imagePreview ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#e6e3db] dark:border-[#4a4330] rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-background-light dark:hover:bg-[#2c2618] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#f4f3f0] dark:bg-[#2c2618] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhotoIcon className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-[#897f61] dark:text-[#a39b85] text-center">
                    <span className="text-primary font-bold">Tải ảnh lên</span>{" "}
                    hoặc kéo thả
                  </p>
                  <p className="text-xs text-[#897f61] dark:text-[#a39b85]/70">
                    PNG, JPG, GIF up to 5MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="mt-4">
                  <div className="relative rounded-lg overflow-hidden group/image">
                    <div
                      className="bg-cover bg-center h-40 w-full"
                      style={{
                        backgroundImage: `url(${imagePreview})`,
                      }}
                    ></div>
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-white/90 dark:bg-[#1e1a11]/90 text-red-500 p-1.5 rounded-full shadow-md opacity-0 group-hover/image:opacity-100 transition-opacity"
                      type="button"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tags Card */}
            <div className="bg-white dark:bg-[#1e1a11] rounded-xl border border-[#e6e3db] dark:border-[#3a3425] p-5 shadow-sm">
              <h3 className="text-[#181611] dark:text-white text-lg font-bold mb-4 border-b border-[#e6e3db] dark:border-[#3a3425] pb-2">
                Thẻ (Tags)
              </h3>
              <div className="flex flex-col gap-3">
                <input
                  ref={tagInputRef}
                  className="w-full rounded-lg text-[#181611] dark:text-white dark:bg-[#2c2618] focus:outline-0 focus:ring-2 focus:ring-primary border border-[#e6e3db] dark:border-[#3a3425] h-10 px-3 text-sm"
                  placeholder="Nhập thẻ và nhấn Enter..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                />
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#f4f3f0] dark:bg-[#2c2618] text-[#181611] dark:text-white border border-[#e6e3db] dark:border-[#4a4330]"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1.5 text-[#897f61] hover:text-red-500 focus:outline-none"
                          type="button"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
