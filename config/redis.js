const redis = require("redis");

// Create Redis client using REDIS_URL
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  retry_strategy: (options) => {
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("Redis connection refused");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Redis connection timeout");
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  },
});

// Event handlers
redisClient.on("connect", () => {
  console.log("<======== Redis Connected Successfully =======>");
});

redisClient.on("error", (err) => {
  console.log();
  console.error("Redis connection error:", err);
});

redisClient.on("ready", () => {
  console.log("Redis client ready");
});

redisClient.on("end", () => {
  console.log("Redis connection closed");
});

// Connect and handle async operations
(async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
})();

module.exports = redisClient;
