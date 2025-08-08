import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // disable default body parser
  },
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let chunks = [];
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", () => {
    const buffer = Buffer.concat(chunks);
    const boundary = "--" + req.headers["content-type"].split("boundary=")[1];

    // extract file content
    const parts = buffer.toString("binary").split(boundary);
    const filePart = parts.find((p) =>
      p.includes('Content-Disposition: form-data; name="file"')
    );

    if (!filePart) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // split headers and file binary
    const fileBinary = filePart.split("\r\n\r\n")[1];
    const fileContent = Buffer.from(fileBinary, "binary");

    const fileName = `uploaded_${Date.now()}.jpg`;
    fs.writeFileSync(path.join(uploadDir, fileName), fileContent);

    res.status(200).json({
      message: "Image uploaded successfully",
      filePath: `/uploads/${fileName}`,
    });
  });
}
