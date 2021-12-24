/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { useUser } from "@/contexts/AuthContext";
import useCookie from "@/hooks/useCookie";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";

import Container from "./Container";

const withAuth = (WrappedComponent: FunctionComponent) => {
  return (props: JSX.Element) => {
    const [verified, setVerified] = useState(true);
    const router = useRouter();
    const { session } = useUser();
    const { removeCookie } = useCookie();

    useEffect(() => {
      if (!session) {
        removeCookie();
        router.replace("/");
      } else {
        setVerified(true);
      }
    }, []);

    if (verified) {
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
