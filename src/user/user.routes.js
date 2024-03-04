import {Router} from "express";
import {check} from "express-validator";
import{
    existsEmail,
    existsPostById,
    existsUsername_Login
} from "../helpers/db-validator.js";
import {validateFields} from "../middlewares/validate-fields.js";