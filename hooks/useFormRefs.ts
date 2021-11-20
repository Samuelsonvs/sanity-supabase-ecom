import { useForm } from "react-hook-form";
import { App } from "@/interfaces/app";

export const useFormRef = () => {
  const { register } = useForm<App.FormValues>();

  const usernameRef = register("username", {
    required: true,
    maxLength: 80,
  });

  const emailRef = register("email", {
    required: true,
    pattern: /^\S+@\S+$/i,
  });

  const passwordRef = register("password", {
    required: true,
    minLength: 6,
  });

  const cardNumberRef = register("cardnum", {
    required: true,
    minLength: 16,
    max: 16,
  });

  return {
    usernameRef,
    emailRef,
    passwordRef,
    cardNumberRef,
  };
};

export default useFormRef;
