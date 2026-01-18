import { NextRequest } from "next/server";
import { GET } from "../search/route";
import { Products } from "@/models/Products.model";
import sequelize from "@/lib/sequelize";
import { Op } from "sequelize";

// Mock dependencies
jest.mock("@/models/Products.model");
jest.mock("@/lib/sequelize");
jest.mock("sequelize");

describe("GET /api/products/search", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (sequelize.authenticate as jest.Mock).mockResolvedValue(undefined);
  });

  describe("Query Parameter Handling", () => {
    test("returns empty array when query is empty", async () => {
      const req = new NextRequest("http://localhost:3000/api/products/search?q=");

      const response = await GET(req);
      const data = await response.json();

      expect(data.error).toBe(0);
      expect(data.products).toEqual([]);
      expect(Products.findAll).not.toHaveBeenCalled();
    });

    test("returns empty array when query is missing", async () => {
      const req = new NextRequest("http://localhost:3000/api/products/search");

      const response = await GET(req);
      const data = await response.json();

      expect(data.error).toBe(0);
      expect(data.products).toEqual([]);
    });

    test("searches with valid query", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Yến Sào Tinh Chế",
          description: "Yến sào cao cấp",
          category: "TINH_CHE",
        },
      ];

      (Products.findAll as jest.Mock).mockResolvedValue(mockProducts);

      const req = new NextRequest(
        "http://localhost:3000/api/products/search?q=yến"
      );

      const response = await GET(req);
      const data = await response.json();

      expect(data.error).toBe(0);
      expect(data.products).toEqual(mockProducts);
      expect(data.query).toBe("yến");
      expect(Products.findAll).toHaveBeenCalled();
    });

    test("respects limit parameter", async () => {
      (Products.findAll as jest.Mock).mockResolvedValue([]);

      const req = new NextRequest(
        "http://localhost:3000/api/products/search?q=yến&limit=5"
      );

      await GET(req);

      expect(Products.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 5,
        })
      );
    });

    test("uses default limit when not provided", async () => {
      (Products.findAll as jest.Mock).mockResolvedValue([]);

      const req = new NextRequest(
        "http://localhost:3000/api/products/search?q=yến"
      );

      await GET(req);

      expect(Products.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 10,
        })
      );
    });
  });

  describe("Search Logic", () => {
    test("searches in name, description, and category", async () => {
      (Products.findAll as jest.Mock).mockResolvedValue([]);

      const req = new NextRequest(
        "http://localhost:3000/api/products/search?q=yến"
      );

      await GET(req);

      expect(Products.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.iLike]: "%yến%",
                },
              },
              {
                description: {
                  [Op.iLike]: "%yến%",
                },
              },
              {
                category: {
                  [Op.iLike]: "%yến%",
                },
              },
            ],
          },
        })
      );
    });

    test("handles special characters in query", async () => {
      (Products.findAll as jest.Mock).mockResolvedValue([]);

      const req = new NextRequest(
        "http://localhost:3000/api/products/search?q=yến%20sào"
      );

      await GET(req);

      expect(Products.findAll).toHaveBeenCalled();
    });

    test("orders results by name ascending", async () => {
      (Products.findAll as jest.Mock).mockResolvedValue([]);

      const req = new NextRequest(
        "http://localhost:3000/api/products/search?q=yến"
      );

      await GET(req);

      expect(Products.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          order: [["name", "ASC"]],
        })
      );
    });
  });

  describe("Error Handling", () => {
    test("handles database connection error", async () => {
      (sequelize.authenticate as jest.Mock).mockRejectedValue(
        new Error("Connection error")
      );

      const req = new NextRequest(
        "http://localhost:3000/api/products/search?q=yến"
      );

      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(1);
    });

    test("handles database query error", async () => {
      (Products.findAll as jest.Mock).mockRejectedValue(
        new Error("Query error")
      );

      const req = new NextRequest(
        "http://localhost:3000/api/products/search?q=yến"
      );

      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(1);
    });
  });

  describe("Response Format", () => {
    test("returns correct response structure", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Test Product",
          description: "Test",
          category: "TEST",
        },
      ];

      (Products.findAll as jest.Mock).mockResolvedValue(mockProducts);

      const req = new NextRequest(
        "http://localhost:3000/api/products/search?q=test"
      );

      const response = await GET(req);
      const data = await response.json();

      expect(data).toHaveProperty("error");
      expect(data).toHaveProperty("message");
      expect(data).toHaveProperty("products");
      expect(data).toHaveProperty("query");
      expect(Array.isArray(data.products)).toBe(true);
    });
  });
});

