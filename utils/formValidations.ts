import * as yup from "yup";

const username = yup.string().min(6).required();
const email = yup
  .string()
  .matches(/^\S+@\S+$/i)
  .required();
const password = yup.string().min(6).max(18).required();
const phone = yup.string().matches(/[0-9]{3}-[0-9]{3}-[0-9]{4}/g).min(6).max(18).required();
const address = yup.string().min(10).max(48).required();

const cardname = yup
  .string()
  .matches(/\w+\s+\w+/g)
  .required();
const cardnumber = yup.string().min(19).max(19).required();
const securitycode = yup.string().min(3).max(3).required();

export const signInSchema = yup
  .object()
  .shape({
    email,
    password,
  })
  .required();

export const signUpSchema = yup
  .object()
  .shape({
    username,
    email,
    password,
  })
  .required();

export const footerSchema = yup
  .object()
  .shape({
    email,
  })
  .required();

export const cardSchema = yup
  .object()
  .shape({
    cardname,
    cardnumber,
    securitycode,
  })
  .required();

export const addressSchema = yup
  .object()
  .shape({
    username,
    phone,
    address,
  })
  .required();