/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";

import { useUser } from "@/contexts/AuthContext";
import Container from "./Container";

const withAuth = (WrappedComponent: FunctionComponent) => {
  return (props: JSX.Element) => {
    const Router = useRouter();
    const { session } = useUser();
    console.log(session)

    if (session) {
      return (
        <Container>
            <WrappedComponent {...props} />
        </Container>
    );
    } else {
      return null;
    }
  };
};

export default withAuth;