import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken';
require('dotenv').config();
import { Method, failureResponse } from "../models/responseModels";
import { MESSAGES } from "../models/constants";
import { EnhancedRequest } from "../models/types/extendedTypes";

export const validateAccessToken = (req: EnhancedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const method: Method = req.method as Method;

    if (!token) {
        res.status(401).json(failureResponse(method, MESSAGES.unauthorized));
        return;
    }

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN as Secret, (err: VerifyErrors | null, user: JwtPayload | undefined | string) => {
        if (err) {
            console.log('#### Error ####', err);
            res.status(403).json(failureResponse(method, MESSAGES.invalidToken));
            return;
        }

        req.user = user;
        next();
    });
};

export const validateRefreshToken = (req: EnhancedRequest, res: Response, next: NextFunction) => {
    const refreshToken = req.body.refresh_token;
    const method: Method = req.method as Method;

    if (!refreshToken) {
        res.status(401).json(failureResponse(method, MESSAGES.unauthorized));
        return;
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN as Secret, (err: VerifyErrors | null, user: JwtPayload | undefined | string) => {
        if (err) {
            console.log('#### ERROR ####', err);
            res.status(403).json(failureResponse(method, MESSAGES.invalidToken));
            return;
        }

        req.user = user;
        next();
    });
};
