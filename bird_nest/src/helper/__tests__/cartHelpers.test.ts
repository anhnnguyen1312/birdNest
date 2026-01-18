import {
  generateCartId,
  getCartIdFromCookie,
  checkUserAuthentication,
  getOrCreateGuestCart,
  getOrCreateUserCart,
} from "../cartHelpers";
import { Cart } from "@/models/Cart.model";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Mock dependencies
jest.mock("next/headers");
jest.mock("jsonwebtoken");
jest.mock("@/models/Cart.model");

describe("cartHelpers", () => {
  describe("generateCartId", () => {
    test("generates a valid UUID format", () => {
      const cartId = generateCartId();
      expect(cartId).toBeDefined();
      expect(typeof cartId).toBe("string");
      expect(cartId.length).toBeGreaterThan(0);
    });

    test("generates unique IDs", () => {
      const id1 = generateCartId();
      const id2 = generateCartId();
      expect(id1).not.toBe(id2);
    });

    test("generates IDs in UUID v4 format", () => {
      const cartId = generateCartId();
      // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(cartId).toMatch(uuidRegex);
    });
  });

  describe("getCartIdFromCookie", () => {
    test("returns cartId when cookie exists", async () => {
      const mockCookies = {
        get: jest.fn().mockReturnValue({ value: "test-cart-id" }),
      };
      (cookies as jest.Mock).mockResolvedValue(mockCookies);

      const cartId = await getCartIdFromCookie(mockCookies as any);
      expect(cartId).toBe("test-cart-id");
    });

    test("returns null when cookie does not exist", async () => {
      const mockCookies = {
        get: jest.fn().mockReturnValue(undefined),
      };

      const cartId = await getCartIdFromCookie(mockCookies as any);
      expect(cartId).toBeNull();
    });

    test("returns null when cookie value is empty", async () => {
      const mockCookies = {
        get: jest.fn().mockReturnValue({ value: "" }),
      };

      const cartId = await getCartIdFromCookie(mockCookies as any);
      expect(cartId).toBeNull();
    });
  });

  describe("checkUserAuthentication", () => {
    test("returns userId when valid token exists", async () => {
      const mockCookies = {
        get: jest.fn().mockReturnValue({
          value: "valid-token",
        }),
      };

      (jwt.verify as jest.Mock).mockReturnValue({ id: 123 });

      const userId = await checkUserAuthentication(mockCookies as any);
      expect(userId).toBe(123);
      expect(jwt.verify).toHaveBeenCalledWith(
        "valid-token",
        process.env.JWT_SECRET || "yentinhhoa"
      );
    });

    test("returns null when no token exists", async () => {
      const mockCookies = {
        get: jest.fn().mockReturnValue(undefined),
      };

      const userId = await checkUserAuthentication(mockCookies as any);
      expect(userId).toBeNull();
    });

    test("returns null when token is invalid", async () => {
      const mockCookies = {
        get: jest.fn().mockReturnValue({
          value: "invalid-token",
        }),
      };

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid token");
      });

      const userId = await checkUserAuthentication(mockCookies as any);
      expect(userId).toBeNull();
    });

    test("returns null when token has no id", async () => {
      const mockCookies = {
        get: jest.fn().mockReturnValue({
          value: "token-without-id",
        }),
      };

      (jwt.verify as jest.Mock).mockReturnValue({ username: "test" });

      const userId = await checkUserAuthentication(mockCookies as any);
      expect(userId).toBeNull();
    });
  });

  describe("getOrCreateGuestCart", () => {
    test("creates new cart when cartId does not exist", async () => {
      const mockCart = {
        id: 1,
        userId: null,
        guestCartId: "test-cart-id",
      };

      (Cart.findOne as jest.Mock).mockResolvedValue(null);
      (Cart.create as jest.Mock).mockResolvedValue(mockCart);

      const cart = await getOrCreateGuestCart("test-cart-id");

      expect(Cart.findOne).toHaveBeenCalledWith({
        where: {
          guestCartId: "test-cart-id",
          userId: null,
        },
      });
      expect(Cart.create).toHaveBeenCalledWith({
        userId: null,
        guestCartId: "test-cart-id",
      });
      expect(cart).toEqual(mockCart);
    });

    test("returns existing cart when cartId exists", async () => {
      const mockCart = {
        id: 1,
        userId: null,
        guestCartId: "existing-cart-id",
      };

      (Cart.findOne as jest.Mock).mockResolvedValue(mockCart);

      const cart = await getOrCreateGuestCart("existing-cart-id");

      expect(Cart.findOne).toHaveBeenCalledWith({
        where: {
          guestCartId: "existing-cart-id",
          userId: null,
        },
      });
      expect(Cart.create).not.toHaveBeenCalled();
      expect(cart).toEqual(mockCart);
    });
  });

  describe("getOrCreateUserCart", () => {
    test("creates new cart when user cart does not exist", async () => {
      const mockCart = {
        id: 1,
        userId: 123,
        guestCartId: null,
      };

      (Cart.findOrCreate as jest.Mock).mockResolvedValue([mockCart, true]);

      const cart = await getOrCreateUserCart(123);

      expect(Cart.findOrCreate).toHaveBeenCalledWith({
        where: {
          userId: 123,
        },
        defaults: {
          userId: 123,
          guestCartId: null,
        },
      });
      expect(cart).toEqual(mockCart);
    });

    test("returns existing cart when user cart exists", async () => {
      const mockCart = {
        id: 1,
        userId: 123,
        guestCartId: null,
      };

      (Cart.findOrCreate as jest.Mock).mockResolvedValue([mockCart, false]);

      const cart = await getOrCreateUserCart(123);

      expect(cart).toEqual(mockCart);
    });

    test("handles different userId values", async () => {
      const userIds = [1, 100, 999];

      for (const userId of userIds) {
        const mockCart = {
          id: userId,
          userId: userId,
          guestCartId: null,
        };

        (Cart.findOrCreate as jest.Mock).mockResolvedValue([mockCart, false]);

        const cart = await getOrCreateUserCart(userId);
        expect(cart.userId).toBe(userId);
      }
    });
  });
});

