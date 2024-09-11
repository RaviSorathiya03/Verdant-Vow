import express from "express";
import { organisation, signin, signup, verifyOTP } from "../controllers/organizationController.js";
import { generateActivationCodes, verifyActivation } from "../controllers/activationController.js";
import { authMiddleware, authMiddlewareO } from "../middlewares/userFunction.js";
import { activeOrganisation } from "../validations/userValidations.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const organisationRoute = express.Router();

organisationRoute.post("/signup", upload.single("image"), signup);
organisationRoute.post("/verify", verifyOTP);
organisationRoute.post("/signin", signin);
organisationRoute.get("/", authMiddlewareO, activeOrganisation, organisation);
organisationRoute.post("/generateCode", authMiddleware, activeOrganisation, generateActivationCodes);
organisationRoute.post("/verify-otp", authMiddleware, verifyActivation);

export { organisationRoute };
