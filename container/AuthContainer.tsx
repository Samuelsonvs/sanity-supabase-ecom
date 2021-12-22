/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";

import { useUser } from "@/contexts/AuthContext";
import Container from "./Container";
import useCookie from "@/hooks/useCookie";
import { getUserFromCookie } from "@/utils/supabaseClient";

const withAuth = (WrappedComponent: FunctionComponent) => {
  return (props: JSX.Element) => {
    const router = useRouter();
    const { session } = useUser();
    const { getCookie, removeCookie } = useCookie()
    const [verified, setVerified] = useState(false);
    const { sToken } = getCookie()
    useEffect(() => {
      (async() => {
        if (!sToken) {
          router.replace("/");
        } else {
          const {user, error} = await getUserFromCookie(sToken);
          if (user) {
            setVerified(true)
          } else {
            removeCookie();
            router.replace("/");
          }
        }
      })();
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