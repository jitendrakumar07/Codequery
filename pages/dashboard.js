import { getSession, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !["admin", "user"].includes(session.user.role)) {
      router.push("/unauthorized");
    }
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 text-lg">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md w-full max-w-md space-y-6 text-center transition">
        <h1 className="text-3xl font-bold text-gray-900">👋 Welcome Back</h1>
        <p className="text-lg text-gray-700 font-medium">
          Hello, <span className="underline">{session.user.name || session.user.email}</span>
        </p>
        <p className="text-sm text-gray-500">
          You're logged in as: <span className="font-semibold text-gray-800">{session.user.role}</span>
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-200"
        >
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || !["admin", "user"].includes(session.user.role)) {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
