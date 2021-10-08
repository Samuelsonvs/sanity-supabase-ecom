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

  return {
    usernameRef,
    emailRef,
    passwordRef,
  };
};

export default useFormRef;
