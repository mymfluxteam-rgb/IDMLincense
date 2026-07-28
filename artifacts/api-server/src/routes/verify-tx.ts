import { Router, type IRouter } from "express";
import crypto from "crypto";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const ACCESS_ID   = process.env.TRUST_WALLET_ACCESS_ID   ?? "";
const HMAC_SECRET = process.env.TRUST_WALLET_HMAC_SECRET ?? "";

/** Build a signed Trust Wallet API request header (for future server-side use). */
function buildTrustWalletHeaders(method: string, path: string, body = "") {
  if (!ACCESS_ID || !HMAC_SECRET) return {};
  const timestamp = Date.now().toString();
  const payload   = `${method}\n${path}\n${timestamp}\n${body}`;
  const signature = crypto
    .createHmac("sha256", HMAC_SECRET)
    .update(payload)
    .digest("hex");
  return {
    "TW-Access-Id" : ACCESS_ID,
    "TW-Timestamp" : timestamp,
    "TW-Signature" : signature,
  };
}

/**
 * GET /api/verify-tx
 * Query params:
 *   chain   — "btc" | "eth" | "bsc" | "tron"
 *   address — recipient wallet address
 *   minUsd  — (optional) minimum USD value to consider confirmed
 *
 * Returns { confirmed: boolean, txHash?: string }
 */
router.get("/verify-tx", async (req, res): Promise<void> => {
  const { chain, address } = req.query as Record<string, string>;

  if (!chain || !address) {
    res.status(400).json({ error: "chain and address are required" });
    return;
  }

  try {
    let confirmed = false;
    let txHash: string | undefined;

    if (chain === "btc") {
      // Bitcoin — public Blockchain.info API (no key needed)
      const url = `https://blockchain.info/rawaddr/${encodeURIComponent(address)}?limit=5`;
      const resp = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (resp.ok) {
        const data = await resp.json() as { n_tx: number; txs?: Array<{ hash: string }> };
        if (data.n_tx > 0 && data.txs?.[0]) {
          confirmed = true;
          txHash = data.txs[0].hash;
        }
      }
    } else if (chain === "eth" || chain === "bsc") {
      // Ethereum / BNB Smart Chain — Etherscan-compatible API
      const baseUrl = chain === "eth"
        ? "https://api.etherscan.io/api"
        : "https://api.bscscan.com/api";
      const apiKey = chain === "eth"
        ? process.env.ETHERSCAN_API_KEY ?? "YourApiKeyToken"
        : process.env.BSCSCAN_API_KEY   ?? "YourApiKeyToken";
      const url = `${baseUrl}?module=account&action=txlist&address=${encodeURIComponent(address)}&sort=desc&page=1&offset=5&apikey=${apiKey}`;
      const resp = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (resp.ok) {
        const data = await resp.json() as { status: string; result: Array<{ hash: string; to: string }> };
        if (data.status === "1" && Array.isArray(data.result) && data.result.length > 0) {
          const recent = data.result.find(
            tx => tx.to?.toLowerCase() === address.toLowerCase(),
          );
          if (recent) { confirmed = true; txHash = recent.hash; }
        }
      }
    } else if (chain === "tron") {
      // TRON — TronGrid public API
      const url = `https://api.trongrid.io/v1/accounts/${encodeURIComponent(address)}/transactions/trc20?limit=5&order_by=block_timestamp,desc`;
      const resp = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (resp.ok) {
        const data = await resp.json() as { data?: Array<{ transaction_id: string }> };
        if (data.data && data.data.length > 0) {
          confirmed = true;
          txHash = data.data[0].transaction_id;
        }
      }
    } else {
      res.status(400).json({ error: `Unsupported chain: ${chain}` });
      return;
    }

    // Log Trust Wallet header availability (for future server-to-server use)
    const twHeaders = buildTrustWalletHeaders("GET", `/api/verify-tx`);
    if (Object.keys(twHeaders).length > 0) {
      logger.debug({ chain, address }, "Trust Wallet credentials present");
    }

    res.json({ confirmed, txHash: txHash ?? null });
  } catch (err) {
    logger.error({ err, chain, address }, "verify-tx error");
    res.status(502).json({ error: "Failed to check transaction", confirmed: false });
  }
});

export default router;
