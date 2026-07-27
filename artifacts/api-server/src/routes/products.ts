import { Router, type IRouter } from "express";
import { eq, ilike } from "drizzle-orm";
import { db, productsTable } from "@workspace/db";
import {
  ListProductsQueryParams,
  ListProductsResponse,
  CreateProductBody,
  CreateProductResponse,
  GetProductParams,
  GetProductResponse,
  UpdateProductParams,
  UpdateProductBody,
  UpdateProductResponse,
  DeleteProductParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/products", async (req, res): Promise<void> => {
  const query = ListProductsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  let rows = await db.select().from(productsTable).orderBy(productsTable.createdAt);

  if (query.data.category) {
    rows = rows.filter((p) =>
      p.category.toLowerCase() === query.data.category!.toLowerCase()
    );
  }

  const mapped = rows.map((p) => ({
    ...p,
    price: parseFloat(p.price),
    imageUrl: p.imageUrl ?? null,
    pricingTiers: p.pricingTiers ?? null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  res.json(ListProductsResponse.parse(mapped));
});

router.post("/products", async (req, res): Promise<void> => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [product] = await db
    .insert(productsTable)
    .values({
      name: parsed.data.name,
      description: parsed.data.description,
      version: parsed.data.version,
      price: String(parsed.data.price),
      category: parsed.data.category,
      imageUrl: parsed.data.imageUrl ?? null,
      downloadUrl: parsed.data.downloadUrl,
      pricingTiers: parsed.data.pricingTiers ?? null,
    })
    .returning();

  res.status(201).json(
    CreateProductResponse.parse({
      ...product,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl ?? null,
      pricingTiers: product.pricingTiers ?? null,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    })
  );
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const params = GetProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, params.data.id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(
    GetProductResponse.parse({
      ...product,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl ?? null,
      pricingTiers: product.pricingTiers ?? null,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    })
  );
});

router.patch("/products/:id", async (req, res): Promise<void> => {
  const params = UpdateProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updates: Record<string, unknown> = {};
  if (parsed.data.name !== undefined) updates.name = parsed.data.name;
  if (parsed.data.description !== undefined) updates.description = parsed.data.description;
  if (parsed.data.version !== undefined) updates.version = parsed.data.version;
  if (parsed.data.price !== undefined) updates.price = String(parsed.data.price);
  if (parsed.data.category !== undefined) updates.category = parsed.data.category;
  if (parsed.data.imageUrl !== undefined) updates.imageUrl = parsed.data.imageUrl;
  if (parsed.data.downloadUrl !== undefined) updates.downloadUrl = parsed.data.downloadUrl;
  if (parsed.data.pricingTiers !== undefined) updates.pricingTiers = parsed.data.pricingTiers;

  const [product] = await db
    .update(productsTable)
    .set(updates)
    .where(eq(productsTable.id, params.data.id))
    .returning();

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(
    UpdateProductResponse.parse({
      ...product,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl ?? null,
      pricingTiers: product.pricingTiers ?? null,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    })
  );
});

router.delete("/products/:id", async (req, res): Promise<void> => {
  const params = DeleteProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .delete(productsTable)
    .where(eq(productsTable.id, params.data.id))
    .returning();

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
