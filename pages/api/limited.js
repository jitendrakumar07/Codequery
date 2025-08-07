// pages/api/limited.js

const rateLimitWindowMs = 60 * 1000; // 1 minute
const maxRequestsPerIP = 10;

// In-memory store: { [ip]: { count: number, firstRequestTimestamp: number } }
const ipStore = new Map();

export default function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const currentTime = Date.now();
  const ipData = ipStore.get(ip) || { count: 0, firstRequestTimestamp: currentTime };

  // If 1-minute window has passed, reset the counter
  if (currentTime - ipData.firstRequestTimestamp > rateLimitWindowMs) {
    ipData.count = 1;
    ipData.firstRequestTimestamp = currentTime;
  } else {
    ipData.count += 1;
  }

  // Save the updated data
  ipStore.set(ip, ipData);

  // Block if limit exceeded
  if (ipData.count > maxRequestsPerIP) {
    res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    });
    return;
  }

  // Continue if under limit
  res.status(200).json({
    success: true,
    message: 'Request successful!',
    remaining: maxRequestsPerIP - ipData.count,
  });
}
