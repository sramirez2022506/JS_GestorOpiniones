import { Router } from "express";
import { check } from "express-validator";
import {
  existsEmail_Login,
  existsUsername_Login,
} from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { login } from "./auth.controller.js";

const router = Router();

router.post(
  "/login",
  [
    check("emailOrUsername", "username or email is needed").not().isEmpty(),
    check("emailOrUsername", "Please enter a valid email or username").custom(
      async (value) => {
        //retorna 2 valores uno de email y otro de usuario o eso creo
        return (
          (await existsEmail_Login(value)) || (await existsUsername_Login(value))
        );
      }
    ),
    check("password", "The password is obligatory").not().isEmpty(),
    validateFields,
  ],
  login
);

export default router;