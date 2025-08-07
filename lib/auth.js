import { getSession } from "next-auth/react";

export async function requireAuth(context, allowedRoles = []) {
  const session = await getSession(context);

  if (!session || !allowedRoles.includes(session.user.role)) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
