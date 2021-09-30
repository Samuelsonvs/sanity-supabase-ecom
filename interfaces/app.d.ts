import { Auth } from "./auth";
import { Dispatch, SetStateAction } from "react";

export namespace App {

    interface ContainerProps extends Auth.AuthChildren {
        customTitle?: string;
    }  

    interface AvatarTypes {
        tempAvatarSetter: Dispatch<SetStateAction<string | null>>;
        avatarPathSetter: Dispatch<SetStateAction<string | null>>;
        tempAvatar: string | null;
        size: number;
    }

    interface FormSigninValues {
        email: string;
        password: string;
      }
      
    interface FormSignupValues extends FormSigninValues {
        username: string;
    }
}