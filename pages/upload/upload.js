import { useState } from "react";

export default function Upload() {
  const [image, setImage] = useState(null);           // Store the selected image
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview URL
  const [loading, setLoading] = useState(false);      // Handle loading state

  // Handle the file input change and create an image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];  // Get the first file
    if (file) {
      setImage(file);

      // Create an image preview using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview URL after loading the file
      };
      reader.readAsDataURL(file);  // Read the file as a Data URL
    }
  };

  // Handle the form submission (image upload)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!image) return;  // Ensure an image is selected

    setLoading(true);  // Set loading state to true while uploading

    const formData = new FormData();
    formData.append("file", image); // Append the selected file to the FormData object

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Image uploaded successfully!");
        setImage(null);  // Reset image after successful upload
        setImagePreview(null);  // Reset image preview
      } else {
        alert("Image upload failed!");
      }
    } catch (error) {
      console.error("Error uploading image", error);
      alert("Error uploading image");
    }
    setLoading(false);  // Set loading state back to false
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 space-y-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-4">
          Upload Your Image
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File input for image selection */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-6 text-sm text-gray-700 file:bg-gradient-to-r file:from-blue-600 file:to-teal-600 file:text-white file:font-semibold file:py-3 file:px-6 file:rounded-lg file:hover:bg-gradient-to-l file:hover:from-blue-700 file:hover:to-teal-700 transition-all"
            />
            <p className="text-gray-500 text-sm text-center">
              Choose an image (JPG, PNG, GIF)
            </p>
          </div>

          {/* Image preview */}
          {imagePreview && (
            <div className="flex justify-center mb-6">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-96 object-contain rounded-lg shadow-lg transition-transform transform hover:scale-105"
              />
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-semibold hover:bg-gradient-to-l hover:from-blue-600 hover:to-teal-600 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>
    </div>
  );
}
