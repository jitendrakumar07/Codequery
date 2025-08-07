import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/dashboard"
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">🔐 Sign In</h2>
          <p className="text-gray-500">Access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 font-semibold"
          >
            Sign In
          </button>
        </form>

        {/* Test Credentials Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">🧪 Test Credentials:</h3>
          <ul className="text-sm text-gray-800 space-y-1">
            <li>
              <span className="font-medium">Admin:</span> <code>admin</code> / <code>admin</code>
            </li>
            <li>
              <span className="font-medium">User:</span> <code>user</code> / <code>user</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
