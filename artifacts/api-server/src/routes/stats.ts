import { Router, type IRouter } from "express";
import { db, productsTable, ordersTable } from "@workspace/db";
import { GetStatsResponse } from "@workspace/api-zod";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats", async (req, res): Promise<void> => {
  const [products, orders] = await Promise.all([
    db.select().from(productsTable),
    db.select().from(ordersTable).orderBy(ordersTable.createdAt),
  ]);

  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.productPrice), 0);

  const recentOrders = orders
    .slice(-5)
    .reverse()
    .map((o) => ({
      ...o,
      productPrice: parseFloat(o.productPrice),
      createdAt: o.createdAt.toISOString(),
    }));

  // Group orders by product category
  const categoryMap = new Map<string, { count: number; revenue: number }>();
  for (const order of orders) {
    const product = products.find((p) => p.id === order.productId);
    const category = product?.category ?? "Unknown";
    const existing = categoryMap.get(category) ?? { count: 0, revenue: 0 };
    categoryMap.set(category, {
      count: existing.count + 1,
      revenue: existing.revenue + parseFloat(order.productPrice),
    });
  }

  const ordersByCategory = Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    count: data.count,
    revenue: data.revenue,
  }));

  res.json(
    GetStatsResponse.parse({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue,
      recentOrders,
      ordersByCategory,
    })
  );
});

export default router;
