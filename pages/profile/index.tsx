import type { NextPage } from "next";
import React from "react";

import withAuth from "@/container/AuthContainer";

export const Profile: NextPage = () => {
  return <div>Profile Page</div>;
};

export default withAuth(Profile);
