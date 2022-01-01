import jwt from "jsonwebtoken";
import { auth } from "../config.js";

export function authorisation(req, res, next) {
    const { token } = req.query;

    if (!token) {
        res.json({
            success: false,
            payload: "Unauthorised access."
        });
        return;
    }

    try {
        const access = jwt.verify(token, auth.privateKey);
    } catch(error) { //if token doesn't match, or there are other issues with verification
        res.json({
            success: false,
            payload: "Unauthorised access."
        });
        return;
    }

    //otherwise token is valid
    next();
}