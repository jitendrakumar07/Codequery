import { useToast } from "@/components/ToastContext";

export default function ExamplePage() {
  const { addToast } = useToast();

  const showToast = (type) => {
    switch (type) {
      case "success":
        addToast("✅ Success! Product added successfully.", "success");
        break;
      case "error":
        addToast("❌ Error! Something went wrong.", "error");
        break;
      case "info":
        addToast("ℹ️ Info! This is just some useful information.", "info");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-800">🎉 Toast Notification Demo</h1>
        <p className="text-gray-600">
          Click a button below to trigger a toast notification.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => showToast("success")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            ✅ Success
          </button>

          <button
            onClick={() => showToast("error")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            ❌ Error
          </button>

          <button
            onClick={() => showToast("info")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            ℹ️ Info
          </button>
        </div>

        <p className="text-sm text-gray-400">Toasts auto-dismiss after 3 seconds or can be closed manually.</p>
      </div>
    </div>
  );
}
