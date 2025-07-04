"use client";

import React from "react";
import { useSession } from "next-auth/react";

function Profile() {
  const session = useSession();

  if (session.data?.user) {
    return <div>From client: {JSON.stringify(session.data.user)}</div>;
  }

  return <div>From client: user is NOT signed in</div>;
}

export default Profile;
