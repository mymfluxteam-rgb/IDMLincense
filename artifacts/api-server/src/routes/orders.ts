import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, productsTable, ordersTable } from "@workspace/db";
import {
  ListOrdersResponse,
  CreateOrderBody,
  CreateOrderResponse,
  LookupOrdersQueryParams,
  LookupOrdersResponse,
  GetOrderParams,
  GetOrderResponse,
} from "@workspace/api-zod";
import crypto from "crypto";

const router: IRouter = Router();

function generateLicenseKey(): string {
  const seg = () => crypto.randomBytes(3).toString("hex").toUpperCase();
  return `${seg()}-${seg()}-${seg()}-${seg()}`;
}

function mapOrder(order: {
  id: number;
  customerName: string;
  customerEmail: string;
  productId: number;
  productName: string;
  productPrice: string;
  licenseKey: string;
  status: string;
  createdAt: Date;
}) {
  return {
    ...order,
    productPrice: parseFloat(order.productPrice),
    createdAt: order.createdAt.toISOString(),
  };
}

router.get("/orders", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(ordersTable)
    .orderBy(ordersTable.createdAt);

  res.json(ListOrdersResponse.parse(rows.map(mapOrder)));
});

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, parsed.data.productId));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const licenseKey = generateLicenseKey();

  const [order] = await db
    .insert(ordersTable)
    .values({
      customerName: parsed.data.customerName,
      customerEmail: parsed.data.customerEmail,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      licenseKey,
      status: "completed",
    })
    .returning();

  res.status(201).json(CreateOrderResponse.parse(mapOrder(order)));
});

router.get("/orders/lookup", async (req, res): Promise<void> => {
  const query = LookupOrdersQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "email query parameter is required" });
    return;
  }

  const rows = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.customerEmail, query.data.email))
    .orderBy(ordersTable.createdAt);

  res.json(LookupOrdersResponse.parse(rows.map(mapOrder)));
});

router.get("/orders/:id", async (req, res): Promise<void> => {
  const params = GetOrderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [order] = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.id, params.data.id));

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json(GetOrderResponse.parse(mapOrder(order)));
});

export default router;
