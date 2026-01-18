import { NextRequest, NextResponse } from "next/server";
import { Comments } from "@/models/Comments.model";
import { Users } from "@/models/Users.model";
import sequelize from "@/lib/sequelize";
import { corsHeaders } from "@/helper/corsHandle";
import bcrypt from "bcryptjs";

// GET comments - Fetch comments for blog or product
export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();

    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");
    const productId = searchParams.get("productId");

    if (!blogId && !productId) {
      return NextResponse.json(
        {
          error: 1,
          message: "Vui lòng cung cấp blogId hoặc productId",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    const whereClause: any = {};
    if (blogId) {
      whereClause.blogId = parseInt(blogId);
    }
    if (productId) {
      whereClause.productId = parseInt(productId);
    }

    const comments = await Comments.findAll({
      where: whereClause,
      include: [
        {
          model: Users,
          attributes: ["id", "username"],
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Format comments for response
    const formattedComments = comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      guestName: comment.guestName,
      username: comment.user?.username || null,
      userId: comment.userId,
      blogId: comment.blogId,
      productId: comment.productId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }));

    return NextResponse.json(
      {
        error: 0,
        message: "Get comments success",
        comments: formattedComments,
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      {
        error: 1,
        message: "Lỗi khi lấy bình luận",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

// POST comment - Create a new comment
export async function POST(req: NextRequest) {
  try {
    await sequelize.authenticate();

    const body = await req.json();
    const { blogId, productId, userId, guestName, content } = body;

    // Validation
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        {
          error: 1,
          message: "Nội dung bình luận không được để trống",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    if (!blogId && !productId) {
      return NextResponse.json(
        {
          error: 1,
          message: "Vui lòng cung cấp blogId hoặc productId",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    if (!userId && !guestName) {
      return NextResponse.json(
        {
          error: 1,
          message: "Vui lòng đăng nhập hoặc nhập tên",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // Handle guest comments - try to find or create a guest user
    let finalUserId = userId;
    if (!finalUserId && guestName) {
      // Try to find a guest user with username "guest"
      let guestUser = await Users.findOne({
        where: { username: "guest" },
        attributes: ["id"],
      });

      if (!guestUser) {
        // Create a guest user if it doesn't exist
        // Use a default password (in production, this should be handled differently)
        const hashedPassword = await bcrypt.hash("guest_password", 10);
        guestUser = await Users.create({
          username: "guest",
          password: hashedPassword,
          role: "guest",
        });
      }

      finalUserId = guestUser.id;
    }

    if (!finalUserId) {
      return NextResponse.json(
        {
          error: 1,
          message: "Vui lòng đăng nhập hoặc nhập tên để bình luận",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    const comment = await Comments.create({
      blogId: blogId ? parseInt(blogId) : null,
      productId: productId ? parseInt(productId) : null,
      userId: finalUserId,
      guestName: guestName || null,
      content: content.trim(),
    });

    // Fetch the created comment with user info
    const createdComment = await Comments.findByPk(comment.id, {
      include: [
        {
          model: Users,
          attributes: ["id", "username"],
          required: false,
        },
      ],
    });

    return NextResponse.json(
      {
        error: 0,
        message: "Bình luận đã được thêm thành công",
        comment: {
          id: createdComment?.id,
          content: createdComment?.content,
          guestName: createdComment?.guestName,
          username: createdComment?.user?.username || null,
          userId: createdComment?.userId,
          blogId: createdComment?.blogId,
          productId: createdComment?.productId,
          createdAt: createdComment?.createdAt,
          updatedAt: createdComment?.updatedAt,
        },
      },
      {
        status: 201,
        headers: corsHeaders(),
      }
    );
  } catch (error: any) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      {
        error: 1,
        message: error.message || "Lỗi khi thêm bình luận",
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

