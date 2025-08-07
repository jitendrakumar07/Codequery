import { useToast } from "@/components/ToastContext";

export default function ToastNotification() {
  const { addToast } = useToast();

  const showToast = (type) => {
    switch (type) {
      case "success":
        addToast("✅ Success! Your product was added successfully.", "success");
        break;
      case "error":
        addToast("❌ Error! Something went wrong. Please try again.", "error");
        break;
      case "info":
        addToast("ℹ️ Heads up! This is some helpful info.", "info");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-800">
          🔔 Toast Notification 
        </h1>
        <p className="text-gray-600">
          Click any button below to show a toast message.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => showToast("success")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow transition duration-200"
          >
            ✅ Success
          </button>

          <button
            onClick={() => showToast("error")}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow transition duration-200"
          >
            ❌ Error
          </button>

          <button
            onClick={() => showToast("info")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition duration-200"
          >
            ℹ️ Info
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Toasts disappear after 10 seconds or can be closed manually.
        </p>
      </div>
    </div>
  );
}
