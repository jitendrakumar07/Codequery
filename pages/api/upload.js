// pages/api/upload.js
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const boundary = req.headers["content-type"]?.split("boundary=")[1];
  if (!boundary) {
    return res.status(400).json({ error: "No boundary found in request" });
  }

  let chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));

  req.on("end", () => {
    const buffer = Buffer.concat(chunks);
    const parts = buffer.toString("binary").split(`--${boundary}`);

    // Find the file part
    const filePart = parts.find((part) =>
      part.includes('Content-Disposition: form-data; name="file"')
    );

    if (!filePart) {
      return res.status(400).json({ error: "No file found" });
    }

    // Extract binary content and remove the trailing boundary markers
    const fileBinarySection = filePart.split("\r\n\r\n")[1];
    const fileBinaryClean = fileBinarySection
      .split("\r\n--")[0]; // Remove trailing boundary

    const fileBuffer = Buffer.from(fileBinaryClean, "binary");
    const fileName = `uploaded_${Date.now()}.jpg`;

    fs.writeFileSync(path.join(uploadDir, fileName), fileBuffer);

    res.status(200).json({
      message: "Image uploaded successfully",
      fileName,
      filePath: `/uploads/${fileName}`,
    });
  });

  req.on("error", (err) => {
    res.status(500).json({ error: "Error processing file", details: err.message });
  });
}
