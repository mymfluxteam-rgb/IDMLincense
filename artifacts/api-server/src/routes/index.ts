import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import ordersRouter from "./orders";
import statsRouter from "./stats";
import contactRouter from "./contact";
import verifyTxRouter from "./verify-tx";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(ordersRouter);
router.use(statsRouter);
router.use(contactRouter);
router.use(verifyTxRouter);

export default router;
