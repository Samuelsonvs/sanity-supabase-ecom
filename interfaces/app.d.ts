import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form";

import { Auth } from "./auth";

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
    cardname?: string;
    cardnumber?: string;
    phone?: string;
    addressname?: string;
    address?: string;
    securitycode?: string;
    payment?: string;
    month?: string;
    year?: string;
    resolver: any;
  }

  interface SliderData {
    mounted: boolean;
    active: number;
    next: () => void;
    prev: () => void;
  }

  interface InputTypes {
    type: string;
    id?: string;
    placeholder?: string;
    name: any;
    defaultValue?: string;
    className?: string;
    disabled?: boolean;
    registerRef: UseFormRegister<FormValues>;
    errors?: any;
    changer?: any;
    checked?: boolean;
    value?: any;
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

  interface QtyHandler {
    setter:
      | Dispatch<SetStateAction<number>>
      | ((qtyParam: number, _id?: string, isVariant?: string | null) => any);
    inputQty: number;
    qty: number;
    min: number;
    max: number;
    step: number;
    css: string;
    containerCss: string;
    _id?: string;
    isVariant?: string | null;
  }

  interface Svg {
    customClass: string;
    fill?: string;
    stroke?: string;
  }

  interface Payment {
    [key: string]: {
      count: number;
      price: number;
      title: string;
    };
  }

  interface PaymentData {
    paymentObject: Payment | null;
    setPaymentObject: Dispatch<SetStateAction<Payment | null>>;
    selectedAddress: Auth.Address | null;
    setSelectedAddress: Dispatch<SetStateAction<Auth.Address | null>>;
  }

  interface Prop {
    [key:string]: string;
  }
  
  interface Steps {
    step: string[];
  }

  interface FormContainer {
    svg: () => JSX.Element;
    head: string;
    children: JSX.Element;
  }

  interface Modal {
    isOpen : boolean;
    setIsOpen : Dispatch<SetStateAction<boolean>>
}

}
