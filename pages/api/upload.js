// pages/api/upload.js
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

// Cloudinary config
cloudinary.config({
  cloud_name: "dxbia1pry",
  api_key: "359682453899814",
  api_secret: "C8W4vLxBERmtGNGayv2WFPssZxM",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse form-data
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Error parsing form data" });
      }

      const file = files.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: "nextjs_uploads", // optional folder in Cloudinary
      });

      res.status(200).json({
        message: "Image uploaded successfully",
        url: result.secure_url, // Cloudinary hosted image URL
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
