import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle file upload manually
  },
};

const uploadDir = path.join(process.cwd(), "public/uploads");

// Make sure the uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const handleFileUpload = (req, res) => {
  const boundary = req.headers["content-type"].split("boundary=")[1];
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    // Extract the file data from the multipart form-data body
    const fileData = data.split(boundary).find((part) =>
      part.includes('Content-Disposition: form-data; name="file"')
    );

    if (!fileData) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBuffer = Buffer.from(fileData.split("\r\n\r\n")[1], "binary");
    const fileName = "uploaded_image_" + Date.now() + ".jpg"; // Dummy filename

    // Save the image file in the uploads folder
    fs.writeFileSync(path.join(uploadDir, fileName), fileBuffer);

    res.status(200).json({ message: "Image uploaded successfully!", fileName });
  });
};

export default handleFileUpload;
