import Cookies from 'universal-cookie';
import { AuthSession } from "@supabase/supabase-js";

export const useCookie = (session?:AuthSession) => {
    const cookies = new Cookies();

    const setCookie = () => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (session!.expires_in! * 1000));
        cookies.set('session-token', session!.access_token, { path: '/', expires, secure: true });
        cookies.set('refresh-token', session!.access_token, { path: '/', expires, secure: true });
    };

    const removeCookie = () => {
        cookies.remove("session-token");
        cookies.remove("refresh-token");
    };

    const getCookie = () => {
        const sToken = cookies.get("session-token");
        const rToken = cookies.get("refresh-token");
        return {
            sToken,
            rToken,
        }
    };

    return {
        setCookie,
        removeCookie,
        getCookie,
    };
};

export default useCookie;
