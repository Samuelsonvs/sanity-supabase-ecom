import { Auth } from "./auth";
import { Dispatch, SetStateAction } from "react";
import { ChangeHandler } from "react-hook-form";

export namespace App {
  interface ContainerProps extends Auth.Children {
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

  interface FormValues {
    username?: string | null;
    avatar_url?: string | null;
    email?: string | null;
    password?: string;
  }

  interface SliderData {
    mounted: boolean;
    active: number;
    next: () => void;
    prev: () => void;
  }

  interface InputTypes {
    type: string;
    placeholder: string;
    name: string;
    defaultValue?: string;
    className?: string;
    disabled?: boolean;
    onChange?: Dispatch<SetStateAction<string | null>>;
    onBlur: ChangeHandler;
  }

  interface ImageProduct {
    slug: string;
    image: any;
    price: string;
    title: string;
    _id: string;
    width: number;
    height: number;
    containerCss: string;
    hoverCss: string;
  }
}
