// pages/api/upload.js
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Cloudinary config
cloudinary.config({
  cloud_name: "dxbia1pry",
  api_key: "359682453899814",
  api_secret: "C8W4vLxBERmtGNGayv2WFPssZxM",
});

// Formidable parser function
const parseForm = (req) => {
  const form = formidable({ multiples: false });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { files } = await parseForm(req);
    const file = files.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "nextjs_uploads",
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
