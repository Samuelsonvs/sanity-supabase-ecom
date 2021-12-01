import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { App } from "@/interfaces/app";

export const useFormRef = (schema: any) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<App.FormValues>({ resolver: yupResolver(schema) });

  return {
    register,
    handleSubmit,
    errors,
  };
};

export default useFormRef;
