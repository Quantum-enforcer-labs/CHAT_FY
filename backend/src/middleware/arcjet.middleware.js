import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const result = await aj.protect(req);

    if (result.isDenied()) {
      // Handle rate limiting
      if (result.reason.isRateLimit) {
        return res
          .status(429)
          .json({ message: "Too many requests, please try again later" });
      }

      // Handle bot detection
      if (result.reason.isBot) {
        return res.status(403).json({ message: "Bot access denied" });
      }

      // Generic denial
      return res.status(403).json({
        message: "Access denied by security rules",
      });
    }

    // Check spoofed bots
    if (result.results?.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious activity detected",
      });
    }

    // ✅ Continue if allowed
    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    next(); // Let the request through if Arcjet fails (fail-open)
  }
};
