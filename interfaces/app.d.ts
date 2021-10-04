import { Auth } from "./auth";
import { Dispatch, SetStateAction } from "react";

export namespace App {

    interface ContainerProps extends Auth.AuthChildren {
        customTitle?: string;
    }

    interface Path {
        filePath: string;
        file: File;
    }

    interface AvatarTypes {
        tempAvatarSetter: Dispatch<SetStateAction<string | null>>;
        avatarPathSetter: Dispatch<SetStateAction<Path | null>>;
        tempAvatar: string | null;
        size: number;
    }

    interface Updates {
        username: string | null;
        avatar_url?: string;
    }

    interface FormSigninValues {
        email: string;
        password: string;
      }
      
    interface FormSignupValues extends FormSigninValues {
        username: string;
    }
    interface FormSettingValues {
        username: string | null;
        avatar_url: string | null;
        email: string | null;
        password: string;
    }
}