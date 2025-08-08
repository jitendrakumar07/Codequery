import { getSession } from "next-auth/react";

export default function Admin({ session }) {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>Welcome Admin: {session?.user?.name}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user?.role !== "admin") {
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
