import { NextRequest, NextResponse } from "next/server";
import { Blogs } from "@/models/Blogs.model";
import sequelize from "@/lib/sequelize";
import { corsHeaders } from "@/helper/corsHandle";
import { uploadImageToCloudinary } from "@/helper/uploadToCloudinary";
import { generateSlug } from "@/helper/generateSlug";
import { marked } from "marked";

export async function POST(req: NextRequest) {
  try {
    await sequelize.authenticate();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const markdown = formData.get("markdown") as string;
    const excerpt = formData.get("excerpt") as string;
    const category = formData.get("category") as string;
    const tags = formData.get("tags") as string; // JSON string array
    const author = (formData.get("author") as string) || "Yến Tinh Hoa";
    const status = (formData.get("status") as string) || "draft"; // draft or published
    const featuredImage = formData.get("featuredImage") as File | null;
    console.log("data blog", title, markdown, excerpt, author);
    // Validate required fields
    if (!title || !markdown || !excerpt || !category) {
      return NextResponse.json(
        {
          error: 1,
          message:
            "Vui lòng điền đầy đủ thông tin: tiêu đề, nội dung, tóm tắt và chuyên mục",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // Generate slug from title
    const slug = generateSlug(title);

    // Check if slug already exists
    let finalSlug = slug;
    const existingBlog = await Blogs.findOne({
      where: { slug },
    });

    if (existingBlog) {
      // Append timestamp to make it unique
      const timestamp = Date.now();
      finalSlug = `${slug}-${timestamp}`;
    }

    // Convert markdown to HTML
    const content = marked(markdown);

    // Parse tags
    let tagsArray: string[] = [];
    try {
      tagsArray = tags ? JSON.parse(tags) : [];
    } catch (e) {
      tagsArray = tags ? tags.split(",").map((t) => t.trim()) : [];
    }

    // Upload featured image to Cloudinary if provided
    let imageUrl: string | null = null;
    if (featuredImage && featuredImage.size > 0) {
      try {
        imageUrl = await uploadImageToCloudinary(featuredImage, "yensao");
      } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json(
          {
            error: 1,
            message: "Lỗi khi tải ảnh lên. Vui lòng thử lại.",
          },
          {
            status: 500,
            headers: corsHeaders(),
          }
        );
      }
    }

    // Create blog
    const blog = await Blogs.create({
      title: title.trim(),
      slug: finalSlug,
      markdown: markdown.trim(),
      content: content,
      excerpt: excerpt.trim(),
      category: category.trim(),
      tags: tagsArray.length > 0 ? tagsArray : null,
      imageUrl: imageUrl,
      author: author.trim(),
      publishedAt: status === "published" ? new Date() : null,
    });

    return NextResponse.json(
      {
        error: 0,
        message:
          status === "published"
            ? "Đăng bài thành công!"
            : "Lưu nháp thành công!",
        blog: {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
        },
      },
      {
        status: 201,
        headers: corsHeaders(),
      }
    );
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      {
        error: 1,
        message: error.message || "Lỗi khi tạo bài viết. Vui lòng thử lại.",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}
