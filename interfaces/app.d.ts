import { Auth } from "./auth";

export namespace App {

    interface ContainerProps extends Auth.AuthChildren {
        customTitle?: string;
    }  

    interface AvatarTypes {
        url: string | null;
        size: number;
        onUpload: (filePath: string) => void;
    }

    interface FormSigninValues {
        email: string;
        password: string;
      }
      
    interface FormSignupValues extends FormSigninValues {
        username: string;
    }
}