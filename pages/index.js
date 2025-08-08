import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function Home() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen px-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Theme Toggle and Auth Button */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded shadow bg-gray-300 text-gray-800 hover:bg-gray-400 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {/* Sign In / Sign Out */}
        {session ? (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            🚪 Sign Out ({session.user.name})
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            🔐 Sign In
          </button>
        )}
      </div>

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center space-y-6 max-w-md w-full mx-auto text-center py-10">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="text-lg opacity-80">
          Explore paginated product listings and search in real-time. Sign in, view products, search, try the toast demo, leave comments, or upload an image!
        </p>

        {/* Navigation Links Grid */}
        <div className="grid grid-cols-1 gap-4 w-full">
          <Link href="/products">
            <button className="w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              🛍️ View Products
            </button>
          </Link>

          <Link href="/productsInfinite">
            <button className="w-full px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition">
              ♻️ View Infinite Scroll Products
            </button>
          </Link>

          <Link href="/search">
            <button className="w-full px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              🔍 Search Products
            </button>
          </Link>

            <Link href="/Roman">
              <button className="w-full px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition">
                🔢 Roman Numeral Converter
              </button>
            </Link>

          <Link href="/toast/ToastNotification">
            <button className="w-full px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
              🔔 Toast 
            </button>
          </Link>

          <Link href="/comment/comments">
            <button className="w-full px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
              💬 Comments
            </button>
          </Link>

          <Link href="/upload/upload">
            <button className="w-full px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
              📤 Upload Image
            </button>
          </Link>

          <Link href="/api/limited" target="_blank" rel="noopener noreferrer">
            <button className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow">
              Access /api/limited
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
