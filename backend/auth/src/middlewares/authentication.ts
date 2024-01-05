import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken';
require('dotenv').config();
import { Method, failureResponse } from "../models/responseModels";

export type EnhancedRequest = Request & {user?: any};

export const authenticateToken = (req: EnhancedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const method: Method = req.method as Method;

    if (!token) {
        res.status(401).json(failureResponse(method, 'Unauthorized'));
        return;
    }

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN as Secret, (err: VerifyErrors | null, user: JwtPayload | undefined | string) => {
        console.log('+++++ Error +++++', err);
        if (err) res.status(403).json(failureResponse(method, 'Invalid token'));
        req.user = user;
        next();
    })
};
