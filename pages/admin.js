import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [session]);

  return (
    <div className="p-10">
      <h1>Admin Panel</h1>
      <p>Welcome Admin: {session?.user?.name}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
}
